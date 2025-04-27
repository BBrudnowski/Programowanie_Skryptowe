# Author: Stanisław Polak <polak@agh.edu.pl>
require "rack"
class HelloWorld
  def call(env)
    #Odczytywanie danych otrzymanych od przeglądarki WWW
    request = Rack::Request.new(env)
    puts '-' * 30
    p request.params #Wypisz (w konsoli) dane otrzymane (metodą GET lub POST) od przeglądarki 
    puts '-' * 30
    #Wysyłanie odpowiedzi do przeglądarki
    response = Rack::Response.new
    name = request.params["name"].upcase
    surname = request.params["surname"].upcase
    response.write("HELLO " + name + " " +  surname + "!")
    response.finish
  end
end
 
run HelloWorld.new