'use strict'

describe 'Controller: <%= classedName %>Ctrl', ->

  # load the controller's module
  beforeEach module '<%= scriptAppName %>'

  <%= classedName %>Ctrl = {}

  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    <%= classedName %>Ctrl = $controller '<%= classedName %>Ctrl', {
      # place here mocked dependencies
    }

  it 'should attach a list of awesomeThings to the scope', ->
    expect(<%= classedName %>Ctrl.awesomeThings.length).toBe 3
