document.addEventListener("DOMContentLoaded", function(event) {
    var gon = gon || null;
    if(gon) {
      var num = gon.elses.length - 1
      var counters = JSON.parse(gon.elses[num].counters);
      console.log(counters.total);
      var death_percent = (counters.death/counters.total)*100
      var murder_percent = (counters.murder/counters.total)*100
      var kill_percent = (counters.kill/counters.total)*100
      var pokemon_percent = (counters.pokemon/counters.total)*100
      var help_percent = (counters.help/counters.total)*100
      var birthday_percent = (counters.birthday/counters.total)*100
      console.log(death_percent);
      var config1 = liquidFillGaugeDefaultSettings();
      config1.circleThickness = 0.15;
      config1.circleColor = "#00447a";
      config1.textColor = "#555500";
      config1.waveTextColor = "#FFFFAA";
      config1.waveColor = "#0969b5";
      config1.textVertPosition = 0.8;
      config1.waveAnimateTime = 1000;
      config1.waveHeight = 0.05;
      config1.waveAnimate = true;
      config1.waveRise = false;
      config1.waveHeightScaling = false;
      config1.waveOffset = 0.25;
      config1.textSize = 0.75;
      config1.waveCount = 3;
      config1.minValue = 30;
      config1.maxValue = 150;
      var gauge1 = loadLiquidFillGauge("fillgauge1", death_percent, config1);
      var config2 = liquidFillGaugeDefaultSettings();
      config2.circleThickness = 0.15;
      config2.circleColor = "#ff9c3c";
      config2.textColor = "#555500";
      config2.waveTextColor = "#FFFFAA";
      config2.waveColor = "#ad6926";
      config2.textVertPosition = 0.8;
      config2.waveAnimateTime = 1000;
      config2.waveHeight = 0.05;
      config2.waveAnimate = true;
      config2.waveRise = false;
      config2.waveHeightScaling = false;
      config2.waveOffset = 0.25;
      config2.textSize = 0.75;
      config2.waveCount = 3;
      config2.minValue = 30;
      config2.maxValue = 150;
      var gauge2= loadLiquidFillGauge("fillgauge2", murder_percent, config2);
      var config3 = liquidFillGaugeDefaultSettings();
      config3.circleThickness = 0.15;
      config3.circleColor = "#283845";
      config3.textColor = "#555500";
      config3.waveTextColor = "#FFFFAA";
      config3.waveColor = "#384f61";
      config3.textVertPosition = 0.8;
      config3.waveAnimateTime = 1000;
      config3.waveHeight = 0.05;
      config3.waveAnimate = true;
      config3.waveRise = false;
      config3.waveHeightScaling = false;
      config3.waveOffset = 0.25;
      config3.textSize = 0.75;
      config3.waveCount = 3;
      config3.minValue = 30;
      config3.maxValue = 150;
      var gauge3 = loadLiquidFillGauge("fillgauge3", kill_percent, config3);
      var config4 = liquidFillGaugeDefaultSettings();
      config4.circleThickness = 0.15;
      config4.circleColor = "#48bfac";
      config4.textColor = "#555500";
      config4.waveTextColor = "#FFFFAA";
      config4.waveColor = "#308275";
      config4.textVertPosition = 0.8;
      config4.waveAnimateTime = 1000;
      config4.waveHeight = 0.05;
      config4.waveAnimate = true;
      config4.waveRise = false;
      config4.waveHeightScaling = false;
      config4.waveOffset = 0.25;
      config4.textSize = 0.75;
      config4.waveCount = 3;
      config4.minValue = 30;
      config4.maxValue = 150;
      var gauge4 = loadLiquidFillGauge("fillgauge4", pokemon_percent, config4);
      var config5 = liquidFillGaugeDefaultSettings();
      config5.circleThickness = 0.15;
      config5.circleColor = "#808015";
      config5.textColor = "#555500";
      config5.waveTextColor = "#FFFFAA";
      config5.waveColor = "#AAAA39";
      config5.textVertPosition = 0.8;
      config5.waveAnimateTime = 1000;
      config5.waveHeight = 0.05;
      config5.waveAnimate = true;
      config5.waveRise = false;
      config5.waveHeightScaling = false;
      config5.waveOffset = 0.25;
      config5.textSize = 0.75;
      config5.waveCount = 3;
      config5.minValue = 30;
      config5.maxValue = 150;
      var gauge5 = loadLiquidFillGauge("fillgauge5", help_percent, config5);
      var config6 = liquidFillGaugeDefaultSettings();
      config6.circleThickness = 0.15;
      config6.circleColor = "#59545a";
      config6.textColor = "#555500";
      config6.waveTextColor = "#FFFFAA";
      config6.waveColor = "#8a748f";
      config6.textVertPosition = 0.8;
      config6.waveAnimateTime = 1000;
      config6.waveHeight = 0.05;
      config6.waveAnimate = true;
      config6.waveRise = false;
      config6.waveHeightScaling = false;
      config6.waveOffset = 0.25;
      config6.textSize = 0.75;
      config6.waveCount = 3;
      config6.minValue = 30;
      config6.maxValue = 150;
      var gauge6 = loadLiquidFillGauge("fillgauge6", birthday_percent, config6);

      function NewValue(){
          if(Math.random() > .5){
              return Math.round(Math.random()*100);
          } else {
              return (Math.random()*100).toFixed(1);
          }
      }
    }

});
