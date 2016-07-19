var returnedData = {};
var timer;
var maxTemp = 134; // Hotest temp ever recorded. This is our default.

// Run getData() on page load to start
document.addEventListener("DOMContentLoaded", function() {getData();})

function getData() {
  console.log("running getData()")
  $.ajax({
    type: 'GET',
    url: 'data',
    dataType: 'text',
    success: function(data) {
      // console.log(JSON.parse(data))
      // Turn text into JSON
      returnedData = JSON.parse(data);
      // make temperary list of all temps. Then find the max temp for chart
      var list = Object.keys(returnedData).map(function(key){return returnedData[key]});
      maxTemp = Math.max.apply( null, list); 
      // Do the coloring!
      paint();
    }
  });
}
function tooltipHtml(n, d){ /* function to create html content string in tooltip div. */
  return "<h4>"+n+"</h4><table>"+
    "<tr><td>Tweets</td><td>"+(d.avg)+"</td></tr>"+
    "</table>";
}
function paint() {
  var sampleData ={}; /* Sample random data. */ 
  ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
  "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", 
  "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", 
  "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", 
  "WI", "MO", "AR", "OK", "KS", "LS", "VA"].forEach(function(d){ 
    // var low=0, 
    //     mid=0, 
    //     high=0;
    sampleData[d]={
      // low:d3.min([low,mid,high]), 
      avg: returnedData[d],
      // high:d3.max([low,mid,high]), 
      // 440000 is a great red for the max
      color:d3.interpolate("#FEFFD8", "#520044")(returnedData[d]/maxTemp)
    };
    // console.log(sampleData);
  });

  /* draw states on id #statesvg */
  d3.select("#statesvg").selectAll(".state").remove()
  uStates.draw("#statesvg", sampleData, tooltipHtml);
  d3.select(self.frameElement).style("height", "600px");
  if (!timer) {
    console.log("Setup a loop")
    timer = setInterval(getData, 5000)
  } 
  return "done"
}