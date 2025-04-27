def move(turn)
  
  case turn

  when 0
    "skierowane w prawo"
    x = 1
    y = 0
  when 1
    "skierowane w dół"
    x = 0
    y = -1
  when 2
    "skierowane w lewo"
    x = -1
    y = 0
  when 3
    "skierowane w górę"
    x = 0
    y = 1
  end
  return x, y
end


direction = ["skierowane w prawo", "skierowane w dół", "skierowane w lewo", "skierowane w górę"]

x = 0
y = 0
i = 0
looks = 0
arguements = ARGV


while arguements.length > i
  
  case arguements[i]

  when "f"
    a, b = move(looks)
    x += a
    y += b
    i += 1
    puts "Idzie przed siebie"
  when "b"
    a, b = move(looks)
    x -= a
    y -= b
    i += 1
    puts "Cofa się"
  when "r"
    looks += 1
    looks %= 4
    i += 1
    puts "Skręca w prawo"
  when "l"
    looks += 3
    looks %= 4
    i += 1
    puts "Skręca w lewo"
  end
  puts "Zwierze jest w punkcie (#{x}, #{y}), #{direction[looks]}"
end

