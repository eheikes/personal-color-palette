describe('file upload button', function() {
  'use strict';

  var createElement, el, callback;

  beforeEach(module('app'));

  beforeEach(inject(function($compile, $rootScope) {
    createElement = function(outerHtml) {
      var newScope = $rootScope.$new();
      newScope.onUpload = callback = jasmine.createSpy('onUpload');
      var el = angular.element(outerHtml);
      $compile(el)(newScope);
      newScope.$apply();
      return el;
    };
  }));

  beforeEach(function() {
    el = createElement('<file-upload-button></file-upload-button>');
  });

  it('should set an ID in the scope', function() {
    expect(el.isolateScope().id).toMatch(/^file-upload-\d+$/);
  });

  it('should use a unique ID for each element', function() {
    var el2 = createElement('<file-upload-button></file-upload-button>');
    expect(el.isolateScope().id).not.toBe(el2.isolateScope().id);
  });

  describe('when an onUpload attribute is NOT set', function() {

    it('should not throw an error when a change event fires', function() {
      expect(function() {
        el.triggerHandler('change');
      }).not.toThrow();
    });

  });

  describe('when an onUpload attribute is set', function() {

    beforeEach(function() {
      el = createElement('<file-upload-button on-upload="onUpload()"></file-upload-button>');
    });

    it('should not call the onUpload callback', function() {
      expect(callback).not.toHaveBeenCalled();
    });

    it('should call the onUpload callback when a change event fires', function() {
      el.triggerHandler('change');
      expect(callback).toHaveBeenCalled();
    });

  });

});
