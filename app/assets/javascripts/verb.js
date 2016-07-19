document.addEventListener("DOMContentLoaded", function(event) {ajaxBubbles();});
var diameter = 960
var maxValue;

function ajaxBubbles() {
console.log("bubbles ajax");
$.ajax({
  type: 'GET',
  url: '/verb',
  dataType: 'text',
  success: function(data) {
    gonVerbs = JSON.parse(gon.verbs).children[0].children
    var list = Object.keys(gonVerbs).map(function(key){return gonVerbs[key].count});
    maxValue = Math.max.apply( null, list);
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
      .style("fill", function(d) { 
        return d3.interpolate("#c4f9f6", "#3884c1")(d.value / maxValue)
        // return "rgb(" + 0 + ", " + 255 + ", " + (255 - d.value) + ")"; 
      });

  node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.className.substring(0, d.r / 3); });



  // Declare tooltip here using D3. For later.
  var tooltip = d3.select("body")
      .append("div")
      .attr('class', 'tooltip')
      .text("test");

  // Basically the entire tooltip everything here.
  svg.selectAll('g')
      .on('mouseover', function(){
        return tooltip.style("visibility", "visible"), tooltip.text(this.__data__.className);
      })
      .on('mouseout', function(){return tooltip.style("visibility", "hidden");})
      .on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})

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



