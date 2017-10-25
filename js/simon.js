$(document).ready(function(){
  var play, simon_array, listen, i;


  init();

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
    var element;
    var color = generate_number();
    simon_array.push(color);
    i = 0;
    loopSimonArray();

    /*for (i = 0 ; i <= simon_array.length-1 ; i++) {
      if (simon_array[i] === "green") {
        element = $("#green");
        color = "green";
      } else if (simon_array[i] === "red") {
        element = $("#red");
        color = "red";
      } else if(simon_array[i] === "yellow") {
        element = $("#yellow");
        color = "yellow";
      } else {
        element = $("#blue");
        color = "blue";
      }
      animate_circle(element);
      setTimeout(function(){}, 1000);
    }*/
    console.log(simon_array);
    
    //animate_circle(element);
  };

/* Player logic */

  $(".circle").click(function(){
    //if (play && listen) {
      setTimeout(function(){ computer_move(); }, 1000);  //just for testing computer logic
    //  animate_circle($(this));
      //computer move
    //}
  });

/* Auxiliary functions */

  function loopSimonArray () {           //  create a loop function
    setTimeout(function () {    //  call a 3s setTimeout when the loop is called
      if (simon_array[i] === "green") {
        element = $("#green");
        color = "green";
      } else if (simon_array[i] === "red") {
        element = $("#red");
        color = "red";
      } else if(simon_array[i] === "yellow") {
        element = $("#yellow");
        color = "yellow";
      } else {
        element = $("#blue");
        color = "blue";
      }
      animate_circle(element);
      i++;                     //  increment the counter
      if (i < simon_array.length) {            //  if the counter < 10, call the loop function
         loopSimonArray();             //  ..  again which will trigger another 
      }                        //  ..  setTimeout()
    }, 1000)
  }

  function animate_circle(elem){
    elem.css("opacity", "0.4");
    setTimeout(function(){ elem.css("opacity", "1"); }, 200);
    //console.log(elem.attr("id") + " click");
  };

  function generate_number() {
    var min = 1;
    var max = 5;
    var color = Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    if (color === 1) {
        element = $("#green");
        color = "green";
      } else if (color === 2) {
        element = $("#red");
        color = "red";
      } else if(color === 3) {
        element = $("#yellow");
        color = "yellow";
      } else {
        element = $("#blue");
        color = "blue";
      }
      return color;
  };

  function init() {
    play = false;
    listen = true;
    simon_array = [];
  };

});