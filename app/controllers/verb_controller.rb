class VerbController < ApplicationController
  def index
    @verbs = Action.all
    @tmp = @tmp
  end
end
