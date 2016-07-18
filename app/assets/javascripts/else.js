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
    var death = counters.death
    var kill = counters.kill
    var money = counters.money
    var murder = counters.murder
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
    deathObj = {};
    deathObj["id"] = "dth";
    deathObj["label"] = "death";
    deathObj["score"] = death;
    deathObj["weight"] = 0.5;
    deathObj["width"] = 1;
    deathObj["color"] = "#FAE38C";
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
    murderObj = {};
    murderObj["id"] = "mdr";
    murderObj["label"] = "murder";
    murderObj["score"] = murder;
    murderObj["weight"] = 0.5;
    murderObj["width"] = 1;
    murderObj["color"] = "#4776B4";
    pokemonObj = {};
    pokemonObj["id"] = "pkmn";
    pokemonObj["label"] = "pokemon";
    pokemonObj["score"] = pokemon;
    pokemonObj["weight"] = 0.5;
    pokemonObj["width"] = 1;
    pokemonObj["color"] = "#5E4EA1";
    //I push my new objects into an array
    var dataArray = [];
    dataArray.push(birthdayObj);
    dataArray.push(helpObj);
    dataArray.push(deathObj);
    dataArray.push(killObj);
    dataArray.push(moneyObj);
    dataArray.push(murderObj);
    dataArray.push(pokemonObj);

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
        return d.data.label + ": <span style='color:orangered'>" + d.data.score + "</span>";
      });

    var arc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius(function (d) { 
        return (radius - innerRadius) * (d.data.score / 30.0) + innerRadius; 
      });

    var outlineArc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(radius);

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
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
          .attr("stroke", "gray")
          .attr("d", arc)
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide);

      var outerPath = svg.selectAll(".outlineArc")
          .data(pie(dataArray))
        .enter().append("path")
          .attr("fill", "none")
          .attr("stroke", "gray")
          .attr("class", "outlineArc")
          .attr("d", outlineArc);  

      // calculate the weighted mean score
      var score = 
        dataArray.reduce(function(a, b) {
          //console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
          return a + (b.score * b.weight); 
        }, 0) / 
        dataArray.reduce(function(a, b) { 
          return a + b.weight; 
        }, 0);

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

