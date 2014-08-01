'use strict';

describe('Filter: <%= cameledName %>', function () {

  // load the filter's module
  beforeEach(function () {
    module('<%= scriptAppName %>Internal');

    //add your mocks here
  });

  // initialize a new instance of the filter before each test
  var <%= cameledName %>;
  beforeEach(inject(function ($filter) {
    <%= cameledName %> = $filter('<%= cameledName %>');
  }));

  it('should return the input prefixed with "<%= cameledName %> filter:"', function () {
    var text = 'angularjs';
    expect(<%= cameledName %>(text)).toBe('<%= cameledName %> filter: ' + text);
  });

});
