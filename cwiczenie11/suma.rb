def suma(x, y)
    if x.is_a?(Complex) || y.is_a?(Complex) then
        return suma = x.to_c + y.to_c
    elsif x.is_a?(Float) || y.is_a?(Float) then
        return suma = x.to_f + y.to_f
    elsif x.is_a?(Rational) || y.is_a?(Rational) then
        return suma = x.to_r + y.to_r
    else
        return suma = x.to_i + y.to_i
    end
end


