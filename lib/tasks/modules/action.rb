require 'tweetstream'

@daemon.sample do |tweet|
  puts "--"
  s = tweet.text.scan(/i.*\s([a-z]+)ing/i)
  s = s[0][0]
  if (s.length > 2 && s.length < 10)
    if (s =~ /\s/i)
      next
    end
    # puts s.class
    # puts s
    # Action.create(verb: s)
  end
end