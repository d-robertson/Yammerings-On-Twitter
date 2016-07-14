require 'tweetstream'

@array = []

@daemon.sample do |s|

  # s = s.text.scan(/(pokemon)/i)
  if s.text =~ /(pokemon)/i
    puts "#{s.text}" 
  end
  # if s.length > 0
  #   puts "#{s}" 
  # end
end

# help regex
# ^help\W
# time regex
# \d+[\:\.]\d{2}

# line1 =~ /Cats(.*)/





# if s.length > 0
  #   puts "#{s}" 
  # end
