'use strict'

describe 'Service: <%= cameledName %>', ->

  # instantiate service
  <%= cameledName %> = {}
  init = ->
    inject (_<%= cameledName %>_) ->
      <%= cameledName %> = _<%= cameledName %>_
      return
    return

  # load the service's module
  beforeEach module '<%= scriptAppName %>'

  it 'should do something', ->
    init()
    expect(!!<%= cameledName %>).toBe true
    return

  it 'should be configurable', ->
    module (<%= cameledName %>Provider) ->
      <%= cameledName %>Provider.setSalutation 'Lorem ipsum'
      return

    init()

    expect(<%= cameledName %>.greet()).toEqual 'Lorem ipsum'
    return
  return
