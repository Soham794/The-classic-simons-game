
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var clickedPattern = [];

var started = false;
var level = 0;

$(document).on("keydown", function() {
  if (!started) {
    started = true;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});

$(document).on("click", function (){
  if(!started){
    started = true;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});

// on click 
for(var i=0;i<4;i++){
  $("#"+buttonColours[i]).on("click", function(){
      
    var userChosenColour = $(this).attr("id");
    clickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(clickedPattern.length-1);

  });
}


// $(".btn").on("click", function() {

//   var userChosenColour = $(this).attr("id");
//   clickedPattern.push(userChosenColour);

//   playSound(userChosenColour);
//   animatePress(userChosenColour);

//   checkAnswer(clickedPattern.length-1);
// });

function gameOver(){

  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  startOver();

}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === clickedPattern[currentLevel]) {
      if (clickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
        gameOver();
    }
}



function buttonAnimation(color){
  $("#" + color).fadeOut(100).fadeIn(100);
}

function nextSequence() {
  clickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  buttonAnimation(randomChosenColour);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
