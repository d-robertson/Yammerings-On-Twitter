require 'tweetstream'

@array = []
puts "started up hashtag"

analyzer = Sentimental.new # Create an instance for usage
analyzer.load_senti_file('lib/tasks/modules/rsentiment.txt') # load our custom made dictionary
analyzer.threshold = 0.1 # Set a global threshold
# puts analyzer.score 'I fucking love pokemon! This game is amazing'

@daemon.sample do |s|
  # if s.text =~ /.*/i
  # puts s.hashtags
  if s.hashtags

    # Check if hashtag is a string (vs nil)
    if s.hashtags[0].to_h[:text].is_a?(String)
      # Cycle through hashtags of each post
      s.hashtags.each do |tag|
        # Downcase & only match english letters & numbers
        t = tag.to_h[:text].downcase
        t = t.scan(/^\w+$/)[0]
        if t.length > 0 && t.length < 15
          puts "#{analyzer.score(s.text)} #{s.text}"
          # puts t
        end
      end
    
    end
  else
    puts "nope"
  end

end