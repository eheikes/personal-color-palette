describe('<title> directive', function() {
  'use strict';

  var createElement;

  beforeEach(module('app'));

  beforeEach(inject(function($compile, $rootScope) {
    createElement = function(title) {
      $rootScope.title = title;
      var newScope = $rootScope.$new();
      var el = angular.element('<title></title>');
      $compile(el)(newScope);
      return el;
    };
  }));

  it('should set the title from the $rootScope title.', function() {
    var rootTitle = 'my title';
    var el = createElement(rootTitle);
    expect(el.scope().title).toBe(rootTitle);
  });

});
