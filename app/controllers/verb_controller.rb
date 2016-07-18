class VerbController < ApplicationController
  def index
    @verbs = Action.all
    arrayObj = @verbs.to_json
    gon.verbs = {}
    gon.verbs["verb"] = "flare"
    gon.verbs["children"] = []
    gon.verbs["children"][0] = {}
    gon.verbs["children"][0]["verb"] = "cluster"
    gon.verbs["children"][0]["children"] = arrayObj
  end
end
