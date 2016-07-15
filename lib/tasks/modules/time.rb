require 'tweetstream'

@array = []

@daemon.sample do |s|
  puts "--------------------"
  if s.text =~ /(ing)/i
    puts "#{s.text}" 

  end

end

# help regex
# ^help\W
# time regex
# \d+[\:\.]\d{2}



