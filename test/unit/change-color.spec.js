describe('"change color" page', function() {
  'use strict';

  var scope, $location, profileService;

  var type = 'face';
  var routeParams = { type: type };
  var currentProfile = { photos: {} };
  currentProfile.photos[type] = {
    photoUrl: 'dummyUrl'
  };

  beforeEach(module('app'));

  beforeEach(inject(function(_$location_, _profileService_) {
    $location = _$location_;
    profileService = _profileService_;

    spyOn($location, 'path');
    spyOn(profileService, 'get').and.returnValue(currentProfile);
    spyOn(profileService, 'saveColor');
    spyOn(profileService, 'savePhoto');
  }));

  beforeEach(inject(function($controller, $rootScope) {
    var createController = function() {
      scope = $rootScope.$new();
      var controller = $controller('changeColorController', {
        $scope: scope,
        $routeParams: routeParams
      });
      return controller;
    };
    createController();
  }));

  it('should change the $rootScope title', inject(function($rootScope) {
    expect($rootScope.title).toBe('Add Face Color');
  }));

  it('should set the photo type to the lowercased type from the URL', function() {
    expect(scope.photoType).toBe(routeParams.type.toLowerCase());
  });

  it('should set the photo URL to the profile\'s photo URL', function() {
    expect(scope.photoUrl).toBe(currentProfile.photos[type].photoUrl);
  });

  it('should set the color to null', function() {
    expect(scope.color).toBe(null);
  });

  describe('when cancel() is called', function() {

    beforeEach(function() {
      scope.cancel();
    });

    it('should reset the photo', function() {
      expect(profileService.savePhoto).toHaveBeenCalledWith(type, null);
    });

    it('should redirect to the "photos" page', function() {
      expect($location.path).toHaveBeenCalledWith('photos');
    });

  });

  describe('when saveAndContinue() is called', function() {

    var color = 'theColor';

    beforeEach(function() {
      scope.color = color;
    });

    describe('and a photo URL has not been set', function() {

      beforeEach(function() {
        scope.photoUrl = null;
        scope.saveAndContinue();
      });

      it('should not save the color', function() {
        expect(profileService.saveColor).not.toHaveBeenCalled();
      });

      it('should not redirect to the "photos" page', function() {
        expect($location.path).not.toHaveBeenCalled();
      });

    });

    describe('and a photo URL has been set', function() {

      beforeEach(function() {
        scope.saveAndContinue();
      });

      it('should save the color', function() {
        expect(profileService.saveColor).toHaveBeenCalledWith(type, color);
      });

      it('should redirect to the "photos" page', function() {
        expect($location.path).toHaveBeenCalledWith('photos');
      });

    });

  });

});
