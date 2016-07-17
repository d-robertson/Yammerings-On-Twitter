class LocationController < ApplicationController
  def index
    @locations = Location.all
  end

  def data
    data = Location.find_by_id(9)
    render :json => data.state
  end
end
