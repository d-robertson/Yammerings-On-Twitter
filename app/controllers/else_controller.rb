class ElseController < ApplicationController
  def index
    @elses = Misc.all
    # num = gon.elses.length - 1
    # gon.counters = gon.elses[num].counters
    gon.elses = @elses
  end
end
