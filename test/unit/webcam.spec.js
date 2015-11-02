/* global Webcam */
describe('webcam directive', function() {
  'use strict';

  var el, scope, webcamCallbacks;
  var fakeDataUrl = 'foo data';

  beforeEach(function() {
    webcamCallbacks = {};
    spyOn(Webcam, 'attach');
    spyOn(Webcam, 'off');
    spyOn(Webcam, 'on').and.callFake(function(event, callback) {
      webcamCallbacks[event] = callback;
    });
    spyOn(Webcam, 'reset');
    spyOn(Webcam, 'set');
    spyOn(Webcam, 'snap').and.callFake(function(callback) { callback(fakeDataUrl); });
  });

  beforeEach(module('app'));

  beforeEach(inject(function($compile, $rootScope) {
    var scope = $rootScope.$new();
    scope.onCapture = angular.noop;
    scope.onError = angular.noop;
    scope.onStream = angular.noop;
    el = angular.element([
      '<webcam',
      ' onCapture="onCapture(dataUrl)"',
      ' onError="onError(err)"',
      ' onStream="onStream()"',
      '></webcam>'
    ].join(''));
    $compile(el)(scope);

    spyOn(el.isolateScope(), 'onCapture');
    spyOn(el.isolateScope(), 'onError');
    spyOn(el.isolateScope(), 'onStream');
  }));

  it('should attach the webcam to the element', function() {
    expect(Webcam.attach).toHaveBeenCalledWith(el[0]);
  });

  describe('when it receives a "capture" event', function() {

    beforeEach(inject(function($rootScope) {
      $rootScope.$broadcast('capture');
    }));

    it('should call Webcam.snap()', function() {
      expect(Webcam.snap).toHaveBeenCalled();
    });

    it('should call the onCapture function with the data', function() {
      expect(el.isolateScope().onCapture).toHaveBeenCalledWith({ dataUrl: fakeDataUrl});
    });

  });

  describe('when it receives a "error" event', function() {

    var err = new Error('foo error');

    beforeEach(function() {
      webcamCallbacks.error(err);
    });

    it('should call the onError callback', function() {
      expect(el.isolateScope().onError).toHaveBeenCalledWith({ err: err });
    });

  });

  describe('when it receives a "live" event', function() {

    beforeEach(function() {
      webcamCallbacks.live();
    });

    it('should call the onStream callback', function() {
      expect(el.isolateScope().onStream).toHaveBeenCalled();
    });

  });

  describe('when the directive is destroyed', function() {

    beforeEach(function() {
      el.isolateScope().$broadcast('$destroy');
    });

    it('should delete the webcam listeners', function() {
      expect(Webcam.off).toHaveBeenCalledWith('error');
      expect(Webcam.off).toHaveBeenCalledWith('live');
    });

    it('should delete the webcam element', function() {
      expect(Webcam.reset).toHaveBeenCalled();
    });

  });

});
