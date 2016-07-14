require 'tweetstream'

@array = []

@daemon.sample do |s|
  puts "#{s.user.location}"

  if @array.length < 1000
    @array.push(s.user.location)
  else
    puts "done"
  end
end

