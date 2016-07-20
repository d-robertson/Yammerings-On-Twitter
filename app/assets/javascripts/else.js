var timer;

document.addEventListener("DOMContentLoaded", function(event) {startAjax();});
  function startAjax () {
    console.log("started Ajax");
    $.ajax({
      type: 'GET',
      url: '/else',
      dataType: 'text',
      success: function(data) {

        $("svg").remove();
        $('.d3-tip').remove();
        everything();
      }
    });
  }
  function everything() {
    console.log("everything hit");
    // store my count variables
    var num = gon.elses.length - 1
    var counters = JSON.parse(gon.elses[num].counters);
    var birthday = counters.birthday
    var help = counters.help
    var trump = counters.trump
    var kill = counters.kill
    var money = counters.money
    var clinton = counters.clinton
    var pokemon = counters.pokemon
    var total = counters.total
    // I format my data to work with my d3
    birthdayObj = {};
    birthdayObj["id"] = "bday";
    birthdayObj["label"] = "birthday";
    birthdayObj["score"] = birthday;
    birthdayObj["weight"] = 0.5;
    birthdayObj["width"] = 1;
    birthdayObj["color"] = "#9E0041";
    helpObj = {};
    helpObj["id"] = "hlp";
    helpObj["label"] = "help";
    helpObj["score"] = help;
    helpObj["weight"] = 0.5;
    helpObj["width"] = 1;
    helpObj["color"] = "#F47245"
    trumpObj = {};
    trumpObj["id"] = "trp";
    trumpObj["label"] = "trump";
    trumpObj["score"] = trump;
    trumpObj["weight"] = 0.5;
    trumpObj["width"] = 1;
    trumpObj["color"] = "#FAE38C";
    killObj = {};
    killObj["id"] = "kll";
    killObj["label"] = "kill";
    killObj["score"] = kill;
    killObj["weight"] = 0.5;
    killObj["width"] = 1;
    killObj["color"] = "#C7E89E";
    moneyObj = {};
    moneyObj["id"] = "mny";
    moneyObj["label"] = "money";
    moneyObj["score"] = money;
    moneyObj["weight"] = 0.5;
    moneyObj["width"] = 1;
    moneyObj["color"] = "#6CC4A4";
    clintonObj = {};
    clintonObj["id"] = "clnt";
    clintonObj["label"] = "clinton";
    clintonObj["score"] = clinton;
    clintonObj["weight"] = 0.5;
    clintonObj["width"] = 1;
    clintonObj["color"] = "#4776B4";
    pokemonObj = {};
    pokemonObj["id"] = "pkmn";
    pokemonObj["label"] = "pokemon";
    pokemonObj["score"] = pokemon;
    pokemonObj["weight"] = 0.5;
    pokemonObj["width"] = 1;
    pokemonObj["color"] = "#5E4EA1";
    //I push my new objects into an array
    var dataArray = [];
    var numArray = [];
    // numArray.push(birthdayObj["score"]);
    // numArray.push(helpObj["score"]);
    // numArray.push(trumpObj["score"]);
    // numArray.push(killObj["score"]);
    // numArray.push(moneyObj["score"]);
    // numArray.push(clintonObj["score"]);
    // numArray.push(pokemonObj["score"]);
    function getMaxOfArray(numArray) {
      return Math.max.apply(null, numArray);
    }
    dataArray.push(birthdayObj);
    dataArray.push(helpObj);
    dataArray.push(trumpObj);
    dataArray.push(killObj);
    dataArray.push(moneyObj);
    dataArray.push(clintonObj);
    dataArray.push(pokemonObj);

    console.log(dataArray);
    for(i=0;i<dataArray.length;i++){
      if(dataArray[i]["score"] >= 1){
        numArray.push(dataArray[i]["score"]);
      }
    }
    console.log(numArray);

    var width = 500,
        height = 500,
        radius = Math.min(width, height) / 2,
        innerRadius = 0.3 * radius;

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.width; });

    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([0, 0])
      .html(function(d) {
        return d.data.label + ": <span style='color:orangered'>" + d.data.score + "</span><br>Percent: <span style='color:orangered'>" + ((d.data.score/total)*100).toFixed(2) + "% </span>";
      });

    var arc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius(function (d) { 
        console.log(d.data.score)
        return (radius - innerRadius) * (d.data.score / getMaxOfArray(numArray)) + innerRadius; 
      });

    var outlineArc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(radius);

    var svg = d3.select(".svg-wrapper").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("class", "svg-element")
        .attr("viewBox", "0 0 960 960")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    svg.call(tip);

    d3.csv('aster_data.csv', function(error, data) {
      
      data.forEach(function(d) {
        d.id     =  d.id;
        d.order  = +d.order;
        d.color  =  d.color;
        d.weight = +d.weight;
        d.score  = +d.score;
        d.width  = +d.weight;
        d.label  =  d.label;
      });
      // for (var i = 0; i < data.score; i++) { console.log(data[i].id) }
      
      var path = svg.selectAll(".solidArc")
          .data(pie(dataArray))
        .enter().append("path")
          .attr("fill", function(d) { return d.data.color; })
          .attr("class", "solidArc")
          .attr("stroke", "#grey")
          .attr("d", arc)
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide);

      var outerPath = svg.selectAll(".outlineArc")
          .data(pie(dataArray))
        .enter().append("path")
          .attr("fill", "none")
          .attr("stroke", "#dadada")
          .attr("class", "outlineArc")
          .attr("d", outlineArc);  

      var score = total;

      svg.append("svg:text")
        .attr("class", "aster-score")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle") // text-align: right
        .text(Math.round(score));

    });
    
    if (!timer) {
      console.log("Setup a loop")
      timer = setInterval(startAjax, 5000)
    } 
    return "done";
  }

