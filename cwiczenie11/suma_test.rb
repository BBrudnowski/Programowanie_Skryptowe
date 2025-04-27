# Author: Stanisław Polak <polak@agh.edu.pl>
 
require 'test/unit'
load 'suma.rb'
class TestSuma < Test::Unit::TestCase
    def setup
      @wynik_int_int           = suma(2,           2)
      @wynik_float_float       = suma(2.1,       2.0)
      @wynik_int_float         = suma(2,         2.1)
      @wynik_int_string        = suma(2,         "2")
      @wynik_rational_rational = suma(1/2r,     1/4r)
      @wynik_complex_complex   = suma((2+3i), (1+2i))
  end
  def test_suma
    assert_equal(@wynik_int_int,               4)
    assert_equal(@wynik_float_float,         4.1)
    assert_equal(@wynik_int_float,           4.1)
    assert_equal(@wynik_int_string,            4)
    assert_equal(@wynik_rational_rational,  3/4r)
    assert_equal(@wynik_complex_complex,  (3+5i))
  end
end