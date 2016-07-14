require 'tweetstream'

@daemon.sample do |s|
  puts "#{s.text}"
end