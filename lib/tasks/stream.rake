namespace :stream do
  desc "The main stream"
  task :start => :environment do
    require 'tweetstream'
    # Initialize our Tweetstream with our authorization
    TweetStream.configure do |config|
      config.consumer_key        = ENV["CONSUMER_KEY"]
      config.consumer_secret     = ENV["CONSUMER_SECRET"]
      config.oauth_token         = ENV["OAUTH_TOKEN"]
      config.oauth_token_secret  = ENV["OAUTH_TOKEN_SECRET"]
      config.auth_method         = :oauth
    end

    # Define TweetStream::Daemon
    class TweetStream::Daemon
      def start(path, query_parameters = {}, &block) #:nodoc:
        # Because of a change in Ruvy 1.8.7 patchlevel 249, you cannot call anymore
        # super inside a block. So I assign to a variable the base class method before
        # the Daemons block begins.
        startmethod = super.start
        Daemons.run_proc(@app_name || 'tweetstream', :multiple => true, :no_pidfiles => true) do
          startmethod(path, query_parameters, &block)
        end
      end
    end

    # Open the stream and load each module in modules/
    @daemon = TweetStream::Daemon.new('tweet_streamer')
    # require_relative './modules/geolocation.rb'
    # require_relative './modules/misc.rb'
    require_relative './modules/action.rb'
    # require_relative './modules/hashtag.rb'
  end
end
# =========== NOTES ============

# daemon.on_inited do
  #   ActiveRecord::Base.connection.reconnect!
  #   ActiveRecord::Base.logger = Logger.new(File.open(log, 'a'))
  # end
  
  # you can .track('pokemon', 'reno', 'vegas')  
  # daemon.sample do |s|
  #   puts "#{s.text}"
  # end

# TweetStream::Client.new.sample do |status|
    #   puts "#{status.inspect}"
    # end