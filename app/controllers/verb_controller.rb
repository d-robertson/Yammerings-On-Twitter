class VerbController < ApplicationController
  def index
    @verbs = Action.all
    arrayObj = @verbs
    gon.verbs = {}
    gon.verbs["verb"] = "flare"
    gon.verbs["children"] = []
    gon.verbs["children"][0] = {}
    gon.verbs["children"][0]["verb"] = "cluster"
    gon.verbs["children"][0]["children"] = arrayObj
    gon.verbs = gon.verbs.to_json
  end
end
