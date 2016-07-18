require 'tweetstream'

@daemon.sample do |tweet|
  s = tweet.text.scan(/i.*\s([a-z]+)ing/i)
  s = s[0][0]
  if (s.length > 2 && s.length < 10)
    if (s =~ /\s/i)
      next
    end
    if s
      s = s.downcase
    end
    puts s
    my_row = Action.find_or_create_by(verb: s)
    my_row.count ? my_row.count+=1 : my_row.count=1
    my_row.save
    # How to retrieve from database
    # @tmp = Action.find_by_verb(s)
    # puts @tmp[:verb]
  end
end