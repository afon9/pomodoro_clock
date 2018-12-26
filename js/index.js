$(document).ready(function() {
  var sessionTime = 25;
  var breakTime = 5;
  var entry = "";
  var isPaused = true;
  var isSessionTime = true;
  var timeinterval;
  var currentTime;
  
  //preset clock, break and session
  $(".minutes").html(("0" + sessionTime).slice(-2));
  $("#sessionTime").html(sessionTime); 
  $("#breakTime").html(breakTime);
  var totalLeft = sessionTime * 60 * 1000;
  
  function css () {
    $('#clockdiv').css({
        "border": "2px solid red",
        "border-radius": "5px"
    });
  }
  
  function getTimeRemaining(endtime) {
  totalLeft = endtime - (Date.parse(new Date()) - currentTime);
  var seconds = Math.floor((totalLeft / 1000) % 60);
  var minutes = Math.floor((totalLeft / 1000 / 60) % 60);
  var hours = Math.floor((totalLeft / (1000 * 60 * 60)) % 24);
  return {
    'total': totalLeft,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}
//clock algorithm
function initializeClock(id, endtime) {
  
  var clock = document.getElementById(id);
  var hoursSpan = clock.querySelector('.hours');//may be use just classes instead of query selectors to clarify
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
      if (isSessionTime) {
        isSessionTime = false;
        totalLeft = breakTime * 60 * 1000;
        $("#clockTitle").html("Break Time");
        document.getElementById("clockdiv").style.border = "2px solid #F57170";
        document.getElementById("clockTitle").style.color = "#F57170";
      } else {
        isSessionTime = true;
        totalLeft = sessionTime * 60 * 1000;
        $("#clockTitle").html("Session Time");
        document.getElementById("clockdiv").style.border = "2px solid #396";
        document.getElementById("clockTitle").style.color = "#396";
      }
      currentTime = Date.parse(new Date());
      initializeClock('clockdiv', totalLeft); 
    }
  }

  updateClock();
  timeinterval = setInterval(updateClock, 1000);
}
  
  
  
  // Break and session lengths setup  
  $("button").click(function(){
    
    entry = $(this).attr("value");
    console.log(entry);
    if (isPaused) {
      switch (entry) {
        case "sessionTime-1":
          if (sessionTime > 1 && isSessionTime) sessionTime--;
          break
        case "sessionTime+1":
          if (isSessionTime) sessionTime++;
          break
        case "breakTime-1":
          if (breakTime > 1) breakTime--;
          break
        case "breakTime+1":
          breakTime++;
          break;
      }
      $("#sessionTime").html(sessionTime);
      $("#breakTime").html(breakTime);
      
      //adjusting clock and 'totalLeft' value
      var t = sessionTime
      if (!isSessionTime) t = breakTime;
      $(".hours").html(("0" + Math.floor(t/60)).slice(-2));
      $(".minutes").html(("0" + (t % 60)).slice(-2));
      $(".seconds").html("00");
      
      totalLeft = t * 60 * 1000;
    }
  })
  
  //start or pause clock
  $("#clockdiv").click(function() {
    if (isPaused) {
      isPaused = false;
      currentTime = Date.parse(new Date());
      initializeClock('clockdiv', totalLeft);
      if (isSessionTime) { //all css can be moved to separate function
        document.getElementById("clockdiv").style.border = "2px solid #396";
      } else {
        document.getElementById("clockdiv").style.border = "2px solid #F57170";
      }
    } else {
      isPaused = true;
      document.getElementById("clockdiv").style.border = "2px solid #F5F5F5";
      clearInterval(timeinterval);
    } 
  })
});