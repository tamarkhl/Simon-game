let buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern= [];
var startToggle= false; //did the game start
var level=0;


function nextSequence () {
    startToggle= true;
    $("#level-title").text("Level " + level);
    level++;

    let randomNumber =  Math.floor(Math.random() * 4);
    let randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour). fadeOut(150).fadeIn(100); //flash button
    playSound(randomChosenColour);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3"); 
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
        setTimeout(function() {
            $("#" + currentColour).removeClass("pressed");
        }, 100);
}

function checkAnswer (currentLevel) { 
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) 
    {
        if (currentLevel== gamePattern.length-1) //if the user got the last color in the sequence correct --> call next sequence
        {
            userClickedPattern=[];
            nextSequence();
        }
    }
    else //Game Over!
    {
        userClickedPattern=[];
        playSound("wrong");
        $(document.body).addClass("game-over");
        setTimeout(function() {
            $(document.body).removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();

        
    }
}

function startOver() {
    level=0;
    gamePattern=[];
    startToggle=false;

}

$(".btn").on("click", function () {
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1); //check if the current answer is correct
})

$(document).on("keypress", function (){

    if (startToggle==false) {
        nextSequence();
    }
})
