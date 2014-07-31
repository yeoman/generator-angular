'use strict';

describe('Filter: <%= classedName %>', function () {

  // load the filter's module
  beforeEach(function () {
    module('<%= scriptAppName %>Internal');

    //add your mocks here
  });

  // initialize a new instance of the filter before each test
  var <%= classedName %>;
  beforeEach(inject(function ($filter) {
    <%= classedName %> = $filter('<%= classedName %>');
  }));

  it('should return the input prefixed with "<%= classedName %> filter:"', function () {
    var text = 'angularjs';
    expect(<%= classedName %>(text)).toBe('<%= classedName %> filter: ' + text);
  });

});
