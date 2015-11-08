describe('"change photo" page', function() {
  'use strict';

  var scope, $location, profileService, LxNotificationService, LxDialogService;

  var type = 'face';
  var routeParams = { type: type };

  beforeEach(module('app'));

  beforeEach(inject(function(
    _$location_,
    _profileService_,
    _LxNotificationService_,
    _LxDialogService_
  ) {
    $location = _$location_;
    profileService = _profileService_;
    LxNotificationService = _LxNotificationService_;
    LxDialogService = _LxDialogService_;

    spyOn($location, 'path');
    spyOn(profileService, 'savePhoto');
    spyOn(LxNotificationService, 'error');
    spyOn(LxDialogService, 'open');
    spyOn(LxDialogService, 'close');
  }));

  beforeEach(inject(function($controller, $rootScope) {
    var createController = function() {
      scope = $rootScope.$new();
      var controller = $controller('changePhotoController', {
        $scope: scope,
        $routeParams: routeParams
      });
      return controller;
    };
    createController();
    spyOn(scope, '$broadcast');
  }));

  it('should change the $rootScope title', inject(function($rootScope) {
    expect($rootScope.title).toBe('Add Face Photo');
  }));

  it('should set the photo type to the lowercased type from the URL', function() {
    expect(scope.photoType).toBe(routeParams.type.toLowerCase());
  });

  it('should set the photo URL to null', function() {
    expect(scope.photoUrl).toBe(null);
  });

  describe('when saveAndContinue() is called', function() {

    describe('and a photo URL has not been set', function() {

      beforeEach(function() {
        scope.photoUrl = null;
        scope.saveAndContinue();
      });

      it('should not save the photo', function() {
        expect(profileService.savePhoto).not.toHaveBeenCalled();
      });

      it('should not redirect to the "color" page', function() {
        expect($location.path).not.toHaveBeenCalled();
      });

    });

    describe('and a photo URL has been set', function() {

      var photoUrl = 'foobarUrl';

      beforeEach(function() {
        scope.photoUrl = photoUrl;
        scope.saveAndContinue();
      });

      it('should save the photo', function() {
        expect(profileService.savePhoto).toHaveBeenCalledWith(type, photoUrl);
      });

      it('should redirect to the "color" page', function() {
        expect($location.path).toHaveBeenCalledWith('photos/' + type + '/color');
      });

    });

  });

  describe('when onFileUpload() is called', function() {

    beforeEach(function() {
      scope.photoUrl = null;
    });

    describe('but a file is not actually uploaded', function() {

      beforeEach(function() {
        scope.onFileUpload([]);
      });

      it('should leave the photo URL untouched', function() {
        expect(scope.photoUrl).toBe(null);
      });

      it('should not display an error', function() {
        expect(LxNotificationService.error).not.toHaveBeenCalled();
      });

    });

    describe('but the file is not an image', function() {

      var file = new Blob(['<div></div>'], { type : 'text/html' });

      beforeEach(function() {
        scope.onFileUpload([file]);
      });

      it('should display an error', function() {
        expect(LxNotificationService.error).toHaveBeenCalled();
      });

    });

    describe('and the file is an image', function() {

      var file = new Blob(['JPEG foo data'], { type : 'image/jpeg' });

      beforeEach(function(done) {
        scope.onFileUpload([file]);
        setTimeout(done, 100); // wait for FileReader.onload to fire
      });

      it('should store the photo data', function() {
        expect(scope.photoUrl).toMatch(/^data:image\/jpeg;base64,/);
      });

    });

  });

  describe('webcam functionality', function() {

    it('should init webcamEnabled to false', function() {
      expect(scope.webcamEnabled).toBe(false);
    });

    describe('when openWebcamDialog() is called', function() {

      beforeEach(function() {
        scope.openWebcamDialog();
      });

      it('should open the webcam dialog', function() {
        expect(LxDialogService.open).toHaveBeenCalledWith('webcamDialog');
      });

    });

    describe('when an error occurs', function() {

      beforeEach(function() {
        scope.onWebcamError(new Error('test error'));
      });

      it('should set webcamEnabled to false', function() {
        expect(scope.webcamEnabled).toBe(false);
      });

      it('should display an error message', function() {
        expect(LxNotificationService.error).toHaveBeenCalled();
      });

    });

    describe('when streaming begins', function() {

      beforeEach(function() {
        scope.onWebcamStream();
      });

      it('should set webcamEnabled to true', function() {
        expect(scope.webcamEnabled).toBe(true);
      });

    });

    describe('when the capture callback is called', function() {

      var data = 'foobar data';

      beforeEach(function() {
        scope.onWebcamCapture(data);
      });

      it('should store the data in the photo URL', function() {
        expect(scope.photoUrl).toBe(data);
      });

    });

    describe('when a snapshot is taken', function() {

      beforeEach(function() {
        scope.takeWebcamPhoto();
      });

      it('should broadcast a capture event', function() {
        expect(scope.$broadcast).toHaveBeenCalledWith('capture');
      });

      it('should close the webcam dialog', function() {
        expect(LxDialogService.close).toHaveBeenCalledWith('webcamDialog');
      });

    });

  });

});
