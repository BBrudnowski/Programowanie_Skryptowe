require './klasa.rb'
require 'minitest/autorun'

class KlasaTest < Minitest::Test
  def setup
    @klasa = Klasa.new
  end

  def test_utworz_tablice
    @klasa.utworz_tablice(10, 50)
    assert_equal 10, @klasa.tab.size
  end

  def test_ile_nieparzystych
    @klasa.utworz_tablice(5, 10)
    liczba_nieparzystych = @klasa.tab.select{ |x| (x - 1) % 2 == 0 }.count
    assert_equal liczba_nieparzystych, @klasa.ile_nieparzystych
  end

  def test_tablica_domyslna
    assert_equal [4, 5, 6], @klasa.tab
  end
end
