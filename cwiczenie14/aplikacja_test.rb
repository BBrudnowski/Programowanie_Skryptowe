require './aplikacja'
require 'test/unit'
require 'rack/test'

class MyAppTest < Test::Unit::TestCase
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  def test_form
    get '/'
    assert last_response.ok?
    assert_includes last_response.body, '<form action="/capitalize" method="post">'
  end

  def test_capitalize
    post '/capitalize', 
    name: 'Jan', 
    surname: 'Kowalski'
    assert last_response.ok?
    assert_includes last_response.body, 'JAN KOWALSKI'
  end
end