class ElseController < ApplicationController
  def index
    @elses = Misc.all
  end
end
