namespace :stream do
  desc "The main stream"
  task :start => :environment do
    require 'tweetstream'

    TweetStream.configure do |config|
      config.consumer_key        = "JIUkzUtMgGSnfazIlBym58KrT"
      config.consumer_secret     = "tw9tfKXbj9AoKhMa5wOcjuuFW0VnC8zfX5FhezdMarNUA2GJwL"
      config.oauth_token         = "753324420823789568-Zil4pPBvyVfTAgfTPSMmZkvcO8xs3VM"
      config.oauth_token_secret  = "L3aQUhQbLjtaVVsFk1XVeQtdnBooktqXg7Z3nGiBItSEz"
      config.auth_method         = :oauth
    end

    # TweetStream::Client.new.sample do |status|
    #   puts "#{status.inspect}"
    # end


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



    # TweetStream::Daemon.new.sample do |status|
    daemon = TweetStream::Daemon.new.sample do |status|
    # TweetStream::Daemon.new('tweet_streamer').track('pokemon') do |status|
      # daemon.on_inited do
      #   ActiveRecord::Base.connection.reconnect!
      #   ActiveRecord::Base.logger = Logger.new(File.open(log, 'a'))
      # end
      # daemon.track('harvey', 'beyonce', 'kanye', 'kardashian') do |status|
      
      daemon.track('pokemon') do |status|
        puts "#{status.text}"
      #   # ::Tweet.create_from_status(status)
      end

    end
  end
end
