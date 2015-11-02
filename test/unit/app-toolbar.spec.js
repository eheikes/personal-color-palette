describe('app toolbar', function() {
  'use strict';

  var createElement;

  beforeEach(module('app'));

  beforeEach(inject(function($compile, $rootScope) {
    createElement = function(scope) {
      var newScope = $rootScope.$new();
      angular.extend(newScope, scope);
      var el = angular.element('<app-toolbar></app-toolbar>');
      $compile(el)(newScope);
      return el;
    };
  }));

  it('should set the title based on $rootScope', function() {
    var title = 'new title';
    var el = createElement({ title: title });
    expect(el.scope().title).toBe(title);
  });

});
