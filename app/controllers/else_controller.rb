class ElseController < ApplicationController
  def index
    @elses = Misc.all
    gon.thing = "Sean"
    gon.elses = @elses
  end
end
