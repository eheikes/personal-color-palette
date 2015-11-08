describe('profileService', function() {
  'use strict';

  var profileService;

  beforeEach(module('app'));

  beforeEach(inject(function(_profileService_) {
    profileService = _profileService_;
  }));

  it('add() should use the default profile as the basis', function() {
    profileService.add({ id: 1 });
    expect(profileService.get().id).toBe(1);
    expect(profileService.get().photos).toEqual(jasmine.any(Object));
  });

  describe('when there are no profiles', function() {

    it('add() should set the current profile to the new profile', function() {
      profileService.add({ id: 1 });
      expect(profileService.get().id).toBe(1);
    });

    it('getAll() should return an empty array', function() {
      expect(profileService.getAll()).toEqual([]);
    });

    it('get() should return null', function() {
      expect(profileService.get()).toBe(null);
    });

    it('requireProfile() should create a new profile and select it', function() {
      profileService.requireProfile();
      expect(profileService.get()).toEqual(jasmine.any(Object));
    });

    it('selectNewest() should not have any effect', function() {
      profileService.selectNewest();
      expect(profileService.get()).toBe(null);
    });

  });

  describe('when there are profiles', function() {

    beforeEach(function() {
      profileService.add({ id: 1 });
      profileService.add({ id: 2 });
      profileService.add({ id: 3 });
      profileService.selectNewest();
    });

    it('add() should not change the currently selected profile', function() {
      profileService.add({ id: 4 });
      expect(profileService.get().id).toBe(3);
    });

    it('getAll() should return all the profiles', function() {
      expect(profileService.getAll().length).toBe(3);
    });

    it('get() should return a profile', function() {
      expect(profileService.get()).not.toBe(null);
    });

    it('requireProfile() should do nothing', function() {
      profileService.add({ id: 4 });
      profileService.requireProfile();
      expect(profileService.get().id).toBe(3);
    });

    it('savePhoto() should save the photo info', function() {
      var type = 'face';
      var data = 'foo data';
      profileService.savePhoto(type, data);
      expect(profileService.get().photos[type].photoUrl).toBe(data);
    });

    it('selectNewest() should select the newest profile', function() {
      profileService.selectNewest();
      expect(profileService.get().id).toBe(3);
    });

  });

});
