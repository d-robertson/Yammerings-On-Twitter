require 'tweetstream'

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
   when "federated states of micronesia"
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

states = {}
timer = 10
puts "started geo"

@daemon.sample do |s|
  if (s.user.location =~ /((?:\w+\s?)+),\s?usa?/i)
    if (s.user.location.length > 0)
      abbr = s.user.location.scan(/((?:\w+\s?)+),\s?usa?/i) # Get long state
      # puts abbr
      abbr = get_abbr(abbr[0][0]) # Convert long state to abbr using lookup
      # puts abbr
      if abbr
        states[abbr] = states[abbr].to_i + 1
      end
      # puts states
      single_row = Location.find_by_id(9)
      # states = states.to_json.gsub!(/\"/, '\'')
      # puts states.to_json
      single_row.state = states.to_json
      puts "timer1: #{timer}"
      timer -= 1
      puts "timer2: #{timer}"

      if timer != -1
        if timer == 0
          puts 'ding ding'
          single_row.save
          puts 'ding ding'
          timer = 10
        end
      end

      # <% @locations.each do |location| %>
      #   <h1><% JSON.parse(location.state).each do |key, action| %></h1>
      #     <p><%= key %></p>
      #     <p><% action.each do |pkey, prop| %></p>
      #       <p><%= pkey %></p>
      #       <p><%= prop %></p>
      #     <% end %>
      #   <% end %>
      # <% end %>

    end
  end
end
