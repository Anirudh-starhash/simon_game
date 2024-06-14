var buttonColors=['red','blue','green','yellow'];
var gamePattern=[]
var level=0
var userClickedPattern=[]
function nextSequence(){
    userClickedPattern=[]
    level+=1
    $("h1").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*3);
    var randomChoosenColour=buttonColors[randomNumber]
    gamePattern.push(randomChoosenColour)
    $("#"+randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColour)
}
var started=false

$(".btn").on("click",handler);

function handler(){
    userChoosenColour=$(this).attr("id");
    userClickedPattern.push(userChoosenColour);
    console.log(userClickedPattern);
    playSound(userChoosenColour)
    animatePress(userChoosenColour)
    checkAnswer(userClickedPattern.length-1);
}

function playSound(name){
    switch(name){
        case "blue":
            var blue=new Audio("sounds/blue.mp3");
            blue.play();
            break;
        case "red":
            var red=new Audio("sounds/red.mp3");
            red.play();
            break;
        case "green":
            var green=new Audio("sounds/green.mp3");
            green.play();
            break;
        case "yellow":
            var yellow=new Audio("sounds/yellow.mp3");
            yellow.play();
            break;
        default:
            console.log(randomChoosenColour);
    }
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

$(document).keypress(function(){
    if(!started){
        nextSequence()
        started=true;
    }
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success")
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else {
        var wrong=new Audio("sounds/wrong.mp3");
        wrong.play()
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press any key to Restart.")
        startOver()
    }
}

function startOver(){
    level=0
    started=false
    gamePattern=[]
}