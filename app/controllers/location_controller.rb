class LocationController < ApplicationController
  def index
    @locations = Location.all
    
  end

  def data
    data = Location.last
    render :json => data.state
  end
end
