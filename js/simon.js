$(document).ready(function(){
  var play, simon_array, listen, i, turnCounter;

/* Initial conditions */

  gameInit();

/* button actions */

  $("#play_button").click(function() {
    $(this).removeClass("active");                      // remove active state
    $("#reset_button").addClass("active");              // add active state
    play = true;                                        // set games started
    setTimeout(function(){ computer_move(); }, 1000);   // wait 1 sec and choose first color
  });

  $("#reset_button").click(function() {
    $(this).removeClass("active");                      // remove active state
    $("#play_button").addClass("active");               // add active state
    gameInit();                                         // reset game
  });

/* Computer logic */

  function computer_move() {
    var color = generate_color();                       // generate random color
    simon_array.push(color);                            // save new random color
    $("#counter").html(simon_array.length);             // update counter
    i = 0;
    loopSimonArray();                                   // loop through color array
    console.log(simon_array);                           // debugging purposes
  };

/* Player logic */

  $(".circle").click(function(){
    var sound;
    if (play && listen) {                         // if game started and player turn do, else nothing
      listen = false;                             // wait to process click
      var id = $(this).attr("id");                // determine wich circle pressed
      if (id === "green") {
        sound = "audio_green";
      } else if (id === "red") {
        sound = "audio_red";
      } else if(id === "yellow") {
        sound = "audio_yellow";
      } else {
        sound = "audio_blue";
      }
      animate_circle($(this), sound);              // animate that circle
      compareClickSimon(id);                          // compare click with color in simon array
      
      //computer_move();                          // do this only after all conditions met

    }
  });

/* Auxiliary functions */

  function compareClickSimon(elem) {
    // compare click with correspondent array value
    if (elem === simon_array[turnCounter]) {
      console.log("yes");                             // right color, continue
      turnCounter++;
      if ( turnCounter === simon_array.length ) {
        console.log("next color");
        turnCounter = 0;
        computer_move();
      }
      listen = true;
    } else {
      console.log("error, restarting " + simon_array);                              // wrong color, abort
      listen = false;
      i = 0;
      turnCounter = 0;
      loopSimonArray();
    }
  };

  function loopSimonArray () {
    var element, sound;
    setTimeout(function () {                          // loop array every 1 sec and animate circle
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
      animate_circle(element, sound);                 // animate specific element and play respective sound
      i++;
      if (i < simon_array.length) {                   // call loop until there are no more colors
         loopSimonArray();
      } else {                                        // no more colors
        listen = true;
      }                                               // allow player to press circles
    }, 1000)
  }

  function animate_circle(elem, sound){
    playSound(sound);                                           // play sound
    elem.css("opacity", "0.4");                                 // animate circle
    setTimeout(function(){ elem.css("opacity", "1"); }, 300);   // wait 0.3 sec and return to normal
  };

  function generate_color() {
    var min = 1;
    var max = 5;
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
    play = false;                         // wait for player to start
    listen = false;                       // do not allow player until game start
    simon_array = [];                     // clear color array
    $("#counter").html(0);                // set counter to zero
    turnCounter = 0;                      // set player counter to zero
  };

  function playSound(elem) {
    var sound = document.getElementById(elem);      // determine sound to play
    sound.play();                                   // play it
  }

});