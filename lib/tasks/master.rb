require 'tweetstream'
require 'json'
@start_time1 = Time.new.to_i
@start_time2 = Time.new.to_i
@start_time3 = Time.new.to_i
@all_tweets = []
@total = 0
@words = {}
@states = {}
@array = []
@hash = {}

@call_count = 0;

# State conversion chart
def get_abbr(long_state)
  case long_state.downcase
   when "alabama"
      state = "AL"
   when "alaska"
      state = "AK"
   when "american samoa"
      state = "AS"
   when "arizona"
      state = "AZ"
   when "arkansas"
      state = "AR"
   when "california"
      state = "CA"
   when "colorado"
      state = "CO"
   when "connecticut"
      state = "CT"
   when "delaware"
      state = "DE"
   when "district of columbia"
      state = "DC"
   when "federated @states of micronesia"
      state = "FM"
   when "florida"
      state = "FL"
   when "georgia"
      state = "GA"
   when "guam"
      state = "GU"
   when "hawaii"
      state = "HI"
   when "idaho"
      state = "ID"
   when "illinois"
      state = "IL"
   when "indiana"
      state = "IN"
   when "iowa"
      state = "IA"
   when "kansas"
      state = "KS"
   when "kentucky"
      state = "KY"
   when "louisiana"
      state = "LA"
   when "maine"
      state = "ME"
   when "marshall islands"
      state = "MH"
   when "maryland"
      state = "MD"
   when "massachusetts"
      state = "MA"
   when "michigan"
      state = "MI"
   when "minnesota"
      state = "MN"
   when "mississippi"
      state = "MS"
   when "missouri"
      state = "MO"
   when "montana"
      state = "MT"
   when "nebraska"
      state = "NE"
   when "nevada"
      state = "NV"
   when "new hampshire"
      state = "NH"
   when "new jersey"
      state = "NJ"
   when "new mexico"
      state = "NM"
   when "new york"
      state = "NY"
   when "north carolina"
      state = "NC"
   when "north dakota"
      state = "ND"
   when "northern mariana islands"
      state = "MP"
   when "ohio"
      state = "OH"
   when "oklahoma"
      state = "OK"
   when "oregon"
      state = "OR"
   when "palau"
      state = "PW"
   when "pennsylvania"
      state = "PA"
   when "puerto rico"
      state = "PR"
   when "rhode island"
      state = "RI"
   when "south carolina"
      state = "SC"
   when "south dakota"
      state = "SD"
   when "tennessee"
      state = "TN"
   when "texas"
      state = "TX"
   when "utah"
      state = "UT"
   when "vermont"
      state = "VT"
   when "virgin islands"
      state = "VI"
   when "virginia"
      state = "VA"
   when "washington"
      state = "WA"
   when "west virginia"
      state = "WV"
   when "wisconsin"
      state = "WI"
   when "wyoming"
      state = "WY"
  end
  return state
end

  
def main
  # puts "inside main"
  @call_count += 1
  puts @call_count
  # Analyzer init
  analyzer = Sentimental.new # Create an instance for usage
  analyzer.load_senti_file('lib/tasks/rsentiment.txt') # load our custom made dictionary
  analyzer.threshold = 0.1 # Set a global threshold

  # Start analyzing Tweets
  @all_tweets.each_with_index do |tweet, idx|
    # puts idx

    # =============        ============= #
    # ============= Action ============= #
    # =============        ============= #
    s = tweet.text.scan(/i.*\s([a-z]+ing)/i)
    if s[0]
      s = s[0][0]
      if (s.length < 15 && s.length > 5)
        if (s =~ /\s/i)
          next
        end
        if s
          s = s.downcase
        end
        my_row = Action.find_or_create_by(verb: s)
        my_row.count ? my_row.count+=1 : my_row.count=1
        my_row.save
      end
    end

    # =============             ============= #
    # ============= Geolocation ============= #
    # =============             ============= #
    if (tweet.user.location =~ /((?:\w+\s?)+),\s?usa?/i)
      if (tweet.user.location.length > 0)
        abbr = tweet.user.location.scan(/((?:\w+\s?)+),\s?usa?/i) # Get long state
        abbr = get_abbr(abbr[0][0]) # Convert long state to abbr using lookup
        if abbr
          @states[abbr] = @states[abbr].to_i + 1
        end
        single_row = Location.new
        # puts @states
        single_row.state = @states.to_json

        if (Time.now.to_i >= @start_time1 + 600)
          @start_time1 = Time.new.to_i
          if @states.length > 0
            # puts single_row
            single_row.save
          end
          @states = {}
        end

      end
    end

    

    # =============         ============= #
    # ============= Hashtag ============= #
    # =============         ============= #
    if tweet.hashtags
      # Check if hashtag is a string (vs nil)
      if tweet.hashtags[0].to_h[:text].is_a?(String)
        # Cycle through hashtags of each post
        tweet.hashtags.each do |tag|
          # Downcase & only match english letters & numbers
          t = tag.to_h[:text].downcase
          t = t.scan(/^\w+$/)[0]
          if t
            if t.length > 0 && t.length < 15
              # Get sentiment of tweet and store it, for later use
              analy_score = analyzer.score(tweet.text)
              # make list of hashtags & sentiment. Commit to db every so often
              if analy_score
                # puts '6'
                if @hash[t]
                  # puts '7'
                  # Increment count
                  @hash[t][0] = @hash[t][0] + 1
                  #recalculate sentiment based on new entry provided here
                  # ((current sentiment stored * number of voters -1)) + (new sentiment data / new number of voters)
                  @hash[t][1] = ((@hash[t][1] * (@hash[t][0]-1)) + (analy_score)) / (@hash[t][0])
                else
                  @hash[t] = [1, analy_score]
                end
                
                
              end
            end
          end
        end
      end
    end

    if Time.now.to_i >= @start_time2 + 600
      @hash.each do |tag|
        # puts tag[1]
        if tag[1][0] > 10
          db_hashtag = Hashtag.find_or_create_by(tag: tag[0])
          db_hashtag.count ? db_hashtag.count+=tag[1][0] : db_hashtag.count=tag[1][0]
          db_hashtag.sentiment ? db_hashtag.sentiment = ((db_hashtag.sentiment * (db_hashtag.count-1)) + (tag[1][1])) / (db_hashtag.count) : 
            db_hashtag.sentiment = tag[1][1]
          db_hashtag.save
        end
      end
      

      @hash = {}
      @start_time2 = Time.now.to_i
    end

    # =============      ============= #
    # ============= Misc ============= #
    # =============      ============= #
    if tweet.lang == "en"
        word = tweet.text.scan(/trump|clinton|help|money|pokemon|birthday|kill/i)
        word = word[0]
        @total += 1      
        if word
          word.downcase!
          if @words[word]
            @words[word] += 1
          else
            @words[word] = 1
          end 
          if (Time.now.to_i >= @start_time3 + 600)
            @start_time3 = Time.new.to_i
            @words["@total"] = @total
            @words = @words.to_json
            Misc.create(counters: @words)
            @total = 0
            @words = {}
          end
        end
    end



  # ============= end of loop ========== #  
  end
  # reset, dump all tweets and start over
  @all_tweets = []
  return
end



# =============            ===============#
# ============= Tweet Loop ===============#
# =============            ===============#
@daemon.sample do |tweet|
  @all_tweets.push(tweet)
  # puts "INSIDE TWEET #{@all_tweets.length}"
  if @all_tweets.length > 100
    main
  end
end

