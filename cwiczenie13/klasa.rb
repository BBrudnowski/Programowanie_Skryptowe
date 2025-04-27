# Author: Stanisław Polak <polak@agh.edu.pl>

class Klasa
  attr_accessor :tab
  def to_s
    return "\tWywolano metode 'to_s()'"
  end

  def inspect
    return "\tWywolano metode 'inspect()'"
  end

  def initialize
    @tab = [4, 5, 6] 
    puts "\tWywolano metode 'initialize()'"
  end

  def metoda
    puts "\tWywolano metode instancyjna 'metoda()'"
  end

  def self.metoda
    puts "\tWywolano metode klasowa 'metoda()'"
  end

  def wypisz_tab
    puts "\tTablica (metoda instancyjna): #{@tab}"
  end

  def self.wypisz_tab
    puts "\tMetody klasowe nie mają dostępu do zmiennych instancyjnych. (Brak tablicy: #{@tab})"
  end

  def utworz_tablice(n, m)
    @tab = Array.new(n) { rand(1..m) }
    puts "\tUtworzono tablice: #{@tab.inspect}"
  end

  def ile_nieparzystych
    nieparzyste_liczba = @tab.select{ |x| (x - 1) % 2 == 0 }.count
    puts "\tLiczba nieparzystych elementów: #{nieparzyste_liczba}"
    nieparzyste_liczba
  end  
end
#########################
puts "Klasa.metoda()"
Klasa.metoda()
puts '-' * 30
puts "obiekt = Klasa.new()"
obiekt = Klasa.new()
puts '-' * 30
puts "obiekt.metoda()"
obiekt.metoda()
puts '-' * 30
puts "puts obiekt"
puts obiekt
puts '-' * 30
puts "p obiekt"
p obiekt
puts '-' * 30
puts "Tablica z metody instancyjnej:"
obiekt.wypisz_tab
puts '-' * 30
puts "Tablica z metody klasowej:"
Klasa.wypisz_tab
puts '-' * 30
puts "Tablica i ilość nieparzystych liczb: "
obiekt.utworz_tablice(5, 100)
obiekt.ile_nieparzystych
