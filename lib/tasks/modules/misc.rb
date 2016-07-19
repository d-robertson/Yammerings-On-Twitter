require 'tweetstream'
require 'json'
counter = 0
timer = 10
words = {}
total = 0
@daemon.sample do |tweet|
  if tweet.lang == "en"
    counter += 1
      word = tweet.text.scan(/murder|death|help|money|pokemon|birthday|kill/i)
      word = word[0]
      puts counter
      total += 1      
      if word
        word.downcase!
        timer -= 1
        if words[word]
          words[word] += 1
        else
          words[word] = 1
        end 
        if timer == 0
          words["total"] = total
          words = words.to_json
          puts words
          puts words.class
          timer = 10
          total = 0
          Misc.create(counters: words)
          words = {}
        end
      end
  end
end