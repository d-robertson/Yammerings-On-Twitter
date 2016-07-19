class HashtagController < ApplicationController
  def index
    @hashtags = Hashtag.all
  end

  def data
    data = Hashtag.where("count > 3").limit(25)
    render :json => data
  end
end
