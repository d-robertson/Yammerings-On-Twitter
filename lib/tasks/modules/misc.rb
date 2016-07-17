require 'tweetstream'
counter = 0
@daemon.sample do |tweet|
  if tweet.lang == "en"
    counter += 1
      puts "--"
      word = tweet.text.scan(/murder|death|pokemon|help|birthday|money|stoner/i)
        puts "#{word}"
      puts counter
  end
end