$(document).ready(function(){
  var play, simon_array, listen, i;

  gameInit();

/* Initial conditions */

  $("#play_button").click(function() {
    $(this).removeClass("active");
    $("#reset_button").addClass("active");
    play = true;
    setTimeout(function(){ computer_move(); }, 1000);
    //var circle = computer_move();
    //animate_circle(circle);
  });

  $("#reset_button").click(function() {
    $(this).removeClass("active");
    $("#play_button").addClass("active");
    init();
  });

/* Computer logic */

  function computer_move() {
    var color = generate_color();
    simon_array.push(color);
    $("#counter").html(simon_array.length);
    i = 0;
    loopSimonArray();
    console.log(simon_array);
  };

/* Player logic */

  $(".circle").click(function(){
    var sound;
    if (play && listen) {
      listen = false;
      var id = $(this).attr("id");
      if (id === "green") {
        sound = "audio_green";
      } else if (id === "red") {
        sound = "audio_red";
      } else if(id === "yellow") {
        sound = "audio_yellow";
      } else {
        sound = "audio_blue";
      }
      animate_circle($(this), sound);
      computer_move();

      //computer move
    }
  });

/* Auxiliary functions */

  function loopSimonArray () {            //  create a loop function
    var element, sound;
    setTimeout(function () {              //  call a 1s setTimeout when the loop is called
      if (simon_array[i] === "green") {
        element = $("#green");
        sound = "audio_green";
      } else if (simon_array[i] === "red") {
        element = $("#red");
        sound = "audio_red";
      } else if(simon_array[i] === "yellow") {
        element = $("#yellow");
        sound = "audio_yellow";
      } else {
        element = $("#blue");
        sound = "audio_blue";
      }
      animate_circle(element, sound);
      i++;                                 //  increment the counter
      if (i < simon_array.length) {        //  if the counter < array, call the loop function
         loopSimonArray();                 //  ..  again which will trigger another 
      } else {
        listen = true;
      }                                    //  ..  setTimeout()
    }, 1000)
  }

  function animate_circle(elem, sound){
    playSound(sound);
    elem.css("opacity", "0.4");
    setTimeout(function(){ elem.css("opacity", "1"); }, 300);
  };

  function generate_color() {
    var min = 1;
    var max = 5;
    var color;
    var color = Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    if (color === 1) {
        color = "green";
      } else if (color === 2) {
        color = "red";
      } else if(color === 3) {
        color = "yellow";
      } else {
        color = "blue";
      }
      return color;
  };

  function gameInit() {
    play = false;
    listen = false;
    simon_array = [];
    $("#counter").html(0);
  };

  function playSound(elem) {
    var sound = document.getElementById(elem);
    sound.play();
  }

});