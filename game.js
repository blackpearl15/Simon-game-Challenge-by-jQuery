var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;

var userClickedPattern = [];

var level = 0;

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    // console.log(userClickedPattern);
    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

});


function nextSequence() {
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  $("#level-title").text("Level " + level);

  playSound(randomChosenColour);
}

$(document).keypress(function(event){
  if(!started){
    level = 0;
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
      console.log("success");
      if(gamePattern.length==userClickedPattern.length){
        setTimeout(function(){
          nextSequence();
        },1000);
        userClickedPattern = [];
      }
    }
    else{
      console.log("wrong");
      playSound("wrong");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      $("body").addClass("game-over ");
      setTimeout(function () {
        $("body").removeClass("game-over ");
      }, 100);
      startOver();
    }

}


function startOver(){
   level = 0;
   started = false;
   gamePattern = [];
   userClickedPattern = [];
}
