def dlugosc_tekstu(text)
  dlugosci = Hash.new(0)

  text.split.each do |slowa|
    dlugosc = slowa.length
    dlugosci[dlugosc] += 1
  end

  puts "Długość słowa Krotność słowa"
  dlugosci.sort.each do |dlugosci, krotnosc|
    puts "%-13d %d" % [dlugosci, krotnosc]
  end
end

puts "Wpisz nazwę pliku: "
input_text = gets.chomp
content = File.read("#{input_text}")
dlugosc_tekstu(content)

