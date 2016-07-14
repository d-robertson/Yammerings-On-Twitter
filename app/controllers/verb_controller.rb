class VerbController < ApplicationController
  def index
    @verbs = Action.all
  end
end
