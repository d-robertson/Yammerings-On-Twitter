require 'tweetstream'

@array = []
puts "started up..."
@daemon.sample do |s|
  if s.text =~ /.*/i
    ht = s.hashtags[0].to_h[:text]
    if (ht.length > 0 && ht.length < 15)
      ht = ht.downcase
      Hashtag.find_or_create_by(tag: ht)
      # How to retrieve from database
      # tmp = Hashtag.find_by_tag(ht)
      # puts tmp[:tag]
    end
  end

end

# puts "#{s.text}"
# help regex
# ^help\W
# time regex
# \d+[\:\.]\d{2}



