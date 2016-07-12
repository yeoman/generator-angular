
'use strict'

describe 'Component: <%= cameledName %>', ->

  # load the component's module
  beforeEach module '<%= scriptAppName %>'

  scope = {}

  beforeEach inject ($rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<<%= _.dasherize(name) %>></<%= _.dasherize(name) %>>'
    element = $compile(element) scope
    scope.$apply()
    expect(element.text()).toBe 'this is the <%= cameledName %> component'
