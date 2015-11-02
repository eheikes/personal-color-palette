describe('profiles page', function() {
  'use strict';

  var scope, $location, profileService;

  var fakeProfiles = ['fake profile 1', 'fake profile 2'];

  beforeEach(module('app'));

  beforeEach(inject(function(_$location_, _profileService_) {
    $location = _$location_;
    profileService = _profileService_;

    spyOn($location, 'path');
    spyOn(profileService, 'add');
    spyOn(profileService, 'getAll').and.returnValue(fakeProfiles);
    spyOn(profileService, 'selectNewest');
  }));

  beforeEach(inject(function($controller, $rootScope) {
    var createController = function() {
      scope = $rootScope.$new();
      var controller = $controller('profilesController', {
        $scope: scope
      });
      return controller;
    };
    createController();
  }));

  it('should change the $rootScope title', inject(function($rootScope) {
    expect($rootScope.title).toBe('Profiles');
  }));

  it('should get and store the profiles from profileService', function() {
    expect(scope.profiles).toEqual(fakeProfiles);
  });

  describe('createAndContinue()', function() {

    beforeEach(function() {
      scope.createAndContinue();
    });

    it('should add a new profile', function() {
      expect(profileService.add).toHaveBeenCalled();
    });

    it('should use the new profile', function() {
      expect(profileService.selectNewest).toHaveBeenCalled();
    });

    it('should redirect to the photos page', function() {
      expect($location.path).toHaveBeenCalledWith('photos');
    });

  });

});
