
var buttonColour =["green", "red", "yellow", "blue"];
var gamePattern= [];
var userClickedPattern=[];
var gameIsOn= false;
var level = 0;



$(".btn").click(function(){
  var userChoosenColour= this.id;
  userClickedPattern.push(userChoosenColour);

  playSound(userChoosenColour);
  animatePress(userChoosenColour);
  checkAnswer(userClickedPattern.length-1)

})

$(document).keypress(function(){
  if(!gameIsOn){
    $('#level-title').text("Level "+level)

    gameIsOn= true;
    nextSequences();

  }
})

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){

    if (userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequences();

      },1000);

    }

  }else{
    playSound('wrong');
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },300);
    $("#level-title").text('Game Over, Press Any Key to Restart');
    startOver();
  }

}

function startOver(){
  gameIsOn= false;
  gamePattern= [];
  level=0;
}











function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");

 setTimeout(function(){
   $("."+currentColour).removeClass("pressed")
 },100);
}






function nextSequences(){
  userClickedPattern= [];
  level++;
  $("#level-title").text("Level "+ level);


  var randomNumber= Math.floor(Math.random()*4);
  var randomChoosenColour= buttonColour[randomNumber];
  gamePattern.push(randomChoosenColour);
  $("#"+randomChoosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColour);



}

function playSound(name){
  var a= new Audio('sound/'+name+'.mp3')
  a.play();
}
