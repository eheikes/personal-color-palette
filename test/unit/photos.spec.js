describe('photos page', function() {
  'use strict';

  var scope, profileService;

  var fakeProfile = {
    photos: {
      face: { photoUrl: null },
      eyes: { photoUrl: null }
    }
  };

  beforeEach(module('app'));

  beforeEach(inject(function(_profileService_) {
    profileService = _profileService_;

    spyOn(profileService, 'requireProfile');
    spyOn(profileService, 'get').and.returnValue(fakeProfile);
  }));

  beforeEach(inject(function($controller, $rootScope) {
    var createController = function() {
      scope = $rootScope.$new();
      var controller = $controller('photosController', {
        $scope: scope
      });
      return controller;
    };
    createController();
  }));

  it('should change the $rootScope title', inject(function($rootScope) {
    expect($rootScope.title).toBe('Your Photos');
  }));

  it('should require a profile', function() {
    expect(profileService.requireProfile).toHaveBeenCalled();
  });

  it('should store the current profile', function() {
    expect(scope.currentProfile).toEqual(fakeProfile);
  });

  describe('hasAllPhotos()', function() {

    beforeEach(function() {
      scope.currentProfile.photos.face.photoUrl = 'data';
    });

    it('should return false if any photo URL is null', function() {
      expect(scope.hasAllPhotos()).toBe(false);
    });

    it('should return true if all photo URLs are not null', function() {
      scope.currentProfile.photos.eyes.photoUrl = 'data';
      expect(scope.hasAllPhotos()).toBe(true);
    });

  });

});
