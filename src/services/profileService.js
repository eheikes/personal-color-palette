(function() {
  'use strict';

  var defaultProfile = {
  };

  function ProfileService() {
    this.profiles = [];
    this.currentIndex = null;
  }

  ProfileService.prototype.add = function(vals) {
    var newProfile = angular.extend({}, defaultProfile, vals);
    this.profiles.push(newProfile);
  };

  ProfileService.prototype.get = function() {
    if (this.currentIndex === null) {
      return null;
    } else {
      return this.profiles[this.currentIndex];
    }
  };

  ProfileService.prototype.getAll = function() {
    return this.profiles;
  };

  ProfileService.prototype.requireProfile = function() {
    if (this.currentIndex === null) {
      this.add();
      this.selectNewest();
    }
  };

  ProfileService.prototype.selectNewest = function() {
    if (this.profiles.length > 0) {
      this.currentIndex = this.profiles.length - 1;
    } else {
      this.currentIndex = null;
    }
  };

  angular.module('app').service('profileService', ProfileService);
})();
