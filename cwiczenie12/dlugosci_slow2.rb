input_text = <<SOME_WORDS
random
words 
that 
I 
typed
SOME_WORDS

def dlugosc_tekstu(text)
  dlugosci = Hash.new(0)

  text.split.each do |slowa|
    dlugosc = slowa.length
    dlugosci[dlugosc] += 1
  end

  puts "Długość słowa Krotność słowa"
  dlugosci.sort.each do |dlugosci, krotnosc|
    puts "%-16d %d" % [dlugosci, krotnosc]
  end
end

dlugosc_tekstu(input_text)