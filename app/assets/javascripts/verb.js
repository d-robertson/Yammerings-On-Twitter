document.addEventListener("DOMContentLoaded", function(event) {ajaxBubbles();});
var diameter = 960

function ajaxBubbles() {
  console.log("bubbles ajax");
  $.ajax({
    type: 'GET',
    url: '/verb',
    dataType: 'text',
    success: function(data) {
      makeBubbles();
    }
  });
}

function makeBubbles() {
  console.log("making bubbles")
  $("svg").remove();
  var diameter = 960,
      format = d3.format(",d"),
      color = d3.scale.category20c();

  var bubble = d3.layout.pack()
      .sort(null)
      .size([diameter, diameter])
      .padding(1.5);

  var svg = d3.select("body").append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("class", "bubble");

  var jsonData = JSON.parse(gon.verbs);

  var node = svg.selectAll(".node")
        .data(bubble.nodes(classes(jsonData))
        .filter(function(d) { return !d.children; }))
      .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    node.append("title")
        .text(function(d) { return d.className + ": " + format(d.value); });

    node.append("circle")
        .attr("r", function(d) { return d.r; })
        .style("fill", function(d) { return "rgb(" + 0 + ", " + 255 + ", " + (255 - d.value) + ")"; });

    node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.className.substring(0, d.r / 3); });
}

  //Returns a flattened hierarchy containing all leaf nodes under the root.
  function classes(root) {
    var classes = [];

    function recurse(verb, node) {
      if (node.children) node.children.forEach(function(child) { recurse(node.verb, child); });
      else classes.push({packageName: verb, className: node.verb, value: node.count});
    }

    recurse(null, root);
    return {children: classes};
  }

  d3.select(self.frameElement).style("height", diameter + "px");