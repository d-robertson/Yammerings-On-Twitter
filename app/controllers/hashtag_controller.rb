class HashtagController < ApplicationController
  def index
    @hashtags = Hashtag.all
  end
end
