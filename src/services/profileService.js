angular.module('app').factory('profileService', function() {
  'use strict';

  var profiles = [];
  var currentIndex = null;

  var defaultProfile = {
  };

  var addProfile = function(vals) {
    var newProfile = angular.extend({}, defaultProfile, vals);
    profiles.push(newProfile);
  };

  var getProfile = function() {
    if (currentIndex === null) {
      return null;
    } else {
      return profiles[currentIndex];
    }
  };

  var getProfiles = function() {
    return profiles;
  };

  var selectNewest = function() {
    if (profiles.length > 0) {
      currentIndex = profiles.length - 1;
    } else {
      currentIndex = null;
    }
  };

  var addAndSelectIfEmpty = function() {
    if (currentIndex === null) {
      addProfile();
      selectNewest();
    }
  };

  return {
    add: addProfile,
    get: getProfile,
    getAll: getProfiles,
    requireProfile: addAndSelectIfEmpty,
    selectNewest: selectNewest
  };
});
