require 'tweetstream'

@daemon.sample do |s|
  if s.text =~ /([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}/
    puts s.text
    Phone.create(number: s.text)
  end

end

