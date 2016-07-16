require 'tweetstream'

@daemon.sample do |s|
  if (s.user.location =~ /. (USA) .*/)
    puts "---------------------"    
    puts s.user.location
    if (s.text =~ /(. \d{2}) .*/)
      puts s.text
    end
  end
end

#/,\s?[A-Z][a-z]{2,}/