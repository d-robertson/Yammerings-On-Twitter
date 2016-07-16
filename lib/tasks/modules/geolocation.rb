require 'tweetstream'

@daemon.sample do |s|
  if (s.user.location =~ /USA/)
    # puts "---------------------"    
    # puts s.user.location
    if (s.text =~ /(\d{2})/)
      # puts ""
    end
  end
end

#/,\s?[A-Z][a-z]{2,}/