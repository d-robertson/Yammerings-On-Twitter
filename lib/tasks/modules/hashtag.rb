require 'tweetstream'

@array = []
puts "started up hashtag"

# <% @hashtags.each do |hash| %>
#   <h1><%= hash.tag %></h1>
# <% end %>


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
          # Get sentiment of tweet and store it, for later use
          analy_score = analyzer.score(s.text)
          # make list of hashtags & sentiment. Commit to db every so often


          # if analy_score
          #   db_hashtag = Hashtag.find_or_create_by(tag: t)
          #   # Double check my 'adding to average' math
          #   # avg = sum/n
          #   # We have the avg and the n. So we find sum, add to it, and divide by new n to get new avg
          #   db_hashtag.count ? db_hashtag.count+=1 : db_hashtag.count=1
          #   db_hashtag.sentiment ? 
          #     db_hashtag.sentiment = ((db_hashtag.sentiment * (db_hashtag.count-1)) + (analy_score)) / (db_hashtag.count) : 
          #     db_hashtag.sentiment = analy_score
          #   # Increment and save
          #   db_hashtag.save
          # end
          
        end
      end
    
    end
  else
    puts "nope"
  end

end