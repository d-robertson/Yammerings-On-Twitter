class HashtagController < ApplicationController
  def index
    @hashtags = Hashtag.all
  end

  def data
    data = Hashtag.where("count > 0").limit(50)
    render :json => data
  end
end
