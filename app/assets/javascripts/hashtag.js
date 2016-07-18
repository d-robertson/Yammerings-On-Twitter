document.addEventListener("DOMContentLoaded", function() {getData2();})

var maxSent;
var minSent;

function getData2() {
    $.ajax({
      type: 'GET',
      url: 'data',
      dataType: 'text',
      success: function(data) {
        returnedData = JSON.parse(data);
        // Get max sentiment before proceeding
        var list = Object.keys(returnedData).map(function(key){return returnedData[key].sentiment});
        var list2 = Object.keys(returnedData).map(function(key){return returnedData[key].cound});
        maxSent = Math.max.apply( null, list);
        minSent = Math.min.apply( null, list);
        maxCount = Math.min.apply( null, list2);
        // Render :D
        makeChart(returnedData)
      }

    })
  }

function makeChart(tweets) {
  var width = 1024,
      height = 500,
      padding = 2, // separation between nodes
      maxRadius = 16;

  // var n = 100, // total number of nodes
  var m = 3; // number of distinct clusters

  // -------------------------------

  var color = d3.scale.category10()
      .domain(d3.range(m));

  var x = d3.scale.ordinal()
      .domain(d3.range(m))
      .rangePoints([0, width], 1);

  // -  -  -  -  -  -  -  -  -  -  -

  var nodes = tweets.map(function(val, idx) {
    sentiment = val.sentiment > 0.0 ? 2 : 0;
    sentiment = val.sentiment == 0.0 ? 1 : sentiment;
    sentiment = val.sentiment < 0.0 ? 0 : sentiment;

    var i = sentiment,
        v = 0.1 + Math.abs(val.sentiment)
    return {
      radius: (Math.sqrt(val.count)*1.2) * maxRadius,
      color: d3.interpolate("#faffa0", "#20865a")( (val.sentiment+ Math.abs(minSent))/(Math.abs(minSent)+maxSent) ),
      cx: x(i),
      cy: height / 2,
      text: val.tag
    };
  });


  // console.log(nodes);

  // -----------------------------

  var force = d3.layout.force()
      .nodes(nodes)
      .size([width, height])
      .gravity(0)
      .charge(0)
      .on("tick", tick)
      .start();

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);

  var circle = svg.selectAll("circle")
      .data(nodes)
      .enter()
      .append('g')
      .append("circle")
      .attr("r", function(d) { return d.radius; })
      .style("fill", function(d) { return d.color; })
      .call(force.drag);

  // Declare tooltip here using D3. For later.
  var tooltip = d3.select("body")
      .append("div")
      .attr('class', 'tooltip')
      .text("");

  // Basically the entire tooltip everything here.
  svg.selectAll('g')
      .on('mouseover', function(){
        return tooltip.style("visibility", "visible"), tooltip.text(this.__data__.text);
      })
      .on('mouseout', function(){return tooltip.style("visibility", "hidden");})
      .on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})

  // Set text equal to the data inside the elements.
  // WORK ON FOR IMPROVEMENT
  var text = svg.selectAll('g')
     .append('text')
     .text(function() {
        return this.__data__.text
     })
     .attr('font-size', function() {
        if (this.__data__.text.length < 5) {
          return "0.8em"
        } else {
          return $(this)
            .parent()
            .children()[0]
            .getAttribute('r') * 2 / (this.__data__.text.length * 11) + 'em'
        }
  })

  function tick(e) {
    circle
        .each(gravity(.2 * e.alpha))
        .each(collide(.5))
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    text
        .attr('x', function(d) { return d.x - (d.radius / 1.5)})
        .attr('y', function(d) { return d.y + (d.radius / 5)});
        
  }

  // Move nodes toward cluster focus.
  function gravity(alpha) {
    return function(d) {
      d.y += (d.cy - d.y) * alpha;
      d.x += (d.cx - d.x) * alpha;
    };
  }

  // Resolve collisions between nodes.
  function collide(alpha) {
    var quadtree = d3.geom.quadtree(nodes);
    return function(d) {
      var r = d.radius + maxRadius + padding,
          nx1 = d.x - r,
          nx2 = d.x + r,
          ny1 = d.y - r,
          ny2 = d.y + r;
      quadtree.visit(function(quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== d)) {
          var x = d.x - quad.point.x,
              y = d.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = d.radius + quad.point.radius + (d.color !== quad.point.color) * padding;
          if (l < r) {
            l = (l - r) / l * alpha;
            d.x -= x *= l;
            d.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    };
  }
}