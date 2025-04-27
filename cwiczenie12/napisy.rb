def word_or_number(text)
  number = []
  words = []
  text.scan(/.{1}/).each do |i|
    case i 
    when "0".."9"
      number.append(i)
    else
      words.append(i)
    end
  end

    if number.length != 0
      puts "Liczba: #{number.join(separator = "")}"
    end
    
    if words.length != 0
      puts "Wyraz: #{words.join(separator = "")}"
    end
end

while true
  input_text = gets()
  word_or_number(input_text)
end

