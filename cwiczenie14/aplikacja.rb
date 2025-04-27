#!/usr/bin/env ruby
# -*- coding: utf-8 -*-
# Author: Stanisław Polak <polak@agh.edu.pl>
require 'sinatra'
set :environment, :production
get '/' do
   erb :form
end

post '/capitalize' do
  first_name = params[:name]
  last_name = params[:surname]
  capitalized_name = "#{first_name.upcase} #{last_name.upcase}"
  erb :result, :locals => { :capitalized_name => capitalized_name }
end

__END__

@@ layout
<html>
  <head>
    <title>Aplikacja Sinatra</title>
  </head>
  <body>
    <h1>Aplikacja Sinatra</h1>
    <%= yield %>
  </body>
</html>

@@ form
<form action="/capitalize" method="post">
    <label for="name">Wpisz imię</label>
    <input id="name" name="name" type="text" required></input>
    <p>
        <label for="surname">Wpisz nazwisko</label>
        <input id="surname" name="surname" type="text" required></input>
    </p>
    <button type="submit">Send</button>
</form>

@@ result
<p>HELLO <%= capitalized_name %></p>
