//var scores = [];
//console.log(typeof scores);
//console.log(scores[0]);

var displayTime = document.getElementById("timer");
console.log(displayTime);

var quizScore = 0;

var choices = ["a", "b","c","d"];

var titleOrQuestion = document.getElementById("title/question");

titleOrQuestion.style['color'] = "darkgray";

titleOrQuestion.textContent = "Web Development Timed Quiz";

var instructions = document.getElementById("instructions");

instructions.textContent = "Click on the button below to start a web-development-related quiz. You will be prompted to sequentially answer five multiple-choice questions within the alloted time displayed on the right-most corner. If the chosen answer is correct, a point will be added to your score. If you answer incorrectly, no extra points will be added PLUS you will LOSE ten seconds from the remaining time. The quiz ends either when you answer all ten questions or when the timer reaches 0.";

var buttonList = document.getElementById("buttons");

var startButton = document.getElementById("start-quiz");

startButton.textContent = "Start Quiz";

startButton.addEventListener("click", function(){ //The firing event will be a single-click. The argument of the event handler is the firing event. It is like achain reaction.

    
var timeLeft=50;

var remainingTime = displayTime.children[0];

remainingTime.textContent = timeLeft;
    
var quizAllottedTime = setInterval(function(){
    if(timeLeft>0){
        timeLeft--;
        remainingTime.textContent = timeLeft;
    } else { 
            timeLeft = 0;
            remainingTime.textContent = timeLeft;
    }
     }
        , 1000);

    startButton.style["display"] = "none";

    instructions.style["text-align"] = "justify";

    titleOrQuestion.style['color'] = "white";

    var  Questions = ["A very useful tool used during development and debugging for printing content to the debugger is:",
                    "The condition in an if/else statement is enclosed with__________.",
                    "String values must be enclosed within__________ when being assigned to variables.",
                    "Commonly used data types DO NOT Include:",
                    "Arrays in JavaScript can be used to store__________."];

    var Slide = new Array(5);

     Slide[0] = [Questions[0],"a. JavaScript","b. terminal/bash","c. for loops","d. console.log" ,"d"];
     Slide[1] = [Questions[1],"a.quotes","b. curly brackets","c. parenthesis","d. square brackets","c"];
     Slide[2] = [Questions[2],"a. commas","b. curly brackets","c. quotes","d. parenthesis","c"];
     Slide[3] = [Questions[3],"a. strings","b. booleans","c. alerts","d. numbers","c"];
     Slide[4] = [Questions[4],"a. numbers and strings","b. other arrays","c. booleans","d. all of the above","d"];

    var listItem = new Array(4);
    var Button = new Array(4);

    for (i = 0; i<4; i++){
        listItem[i]= document.createElement("li");
         Button[i] = document.createElement("button");
        Button[i].style["text-align"] = "left";
        buttonList.appendChild(listItem[i]);
        listItem[i].appendChild(Button[i]);
    };


    function nextQuestion(i){ 
        titleOrQuestion.textContent = "Question #" + (i+1);

        instructions.textContent = Slide[i][0];

        Button[0].textContent = Slide[i][1];
        Button[1].textContent = Slide[i][2];
        Button[2].textContent = Slide[i][3];
        Button[3].textContent = Slide[i][4];

    return;
   };

   var userChoice;

    var validateAnswer = function (x, y){

        if(x>=0 && x<5 && quizScore<=x && timeLeft>0){
        console.log(y);
        nextQuestion(x);
        var evalAns = document.getElementById("eval-ans");
        evalAns.style["text-align"] = "left";
        if(userChoice === undefined){
            evalAns.style["color"]="black";
            evalAns.textContent = "Please select the best of the options presented.";

        }else if (userChoice === Slide[x-1][5]){
            evalAns.style["color"]="green";
            evalAns.textContent = "Congratulations!. Your answer was correct.";
            quizScore++;
            console.log(quizScore);
            timeLeft= timeLeft;
            remainingTime.textContent =timeLeft;
        }else{
            evalAns.style["color"]="red";
            evalAns.textContent = "Wrong answer. The correct answer to the previous question was: " + Slide[x-1][5];
            console.log(quizScore);
            if(timeLeft >= 10){
            timeLeft = timeLeft-10;
            } else{
                timeLeft=0;
            }
            remainingTime.textContent = timeLeft;
        };

        ChoiceEvent(x+1);

    } else{
        clearInterval(quizAllottedTime);
    
    }
}

function ChoiceEvent (x) {
        
    if(x>0 && x<5){
        Button[0].addEventListener("click", function (){
            userChoice=choices[0];
            console.log(userChoice);
            validateAnswer(x, userChoice);
        });

         Button[1].addEventListener("click", function (){
            userChoice=choices[1];
            console.log(userChoice);
            validateAnswer(x, userChoice);
        });

        Button[2].addEventListener("click", function (){
            userChoice=choices[2];
            console.log(userChoice);
            validateAnswer(x, userChoice);
        });
    
        Button[3].addEventListener("click",  function (){
            userChoice=choices[3];
            console.log(userChoice);
            validateAnswer(x, userChoice);
        }); 
    }
}
        validateAnswer(0, userChoice);

if(timeLeft == 0){
    
    for(i=0; i<4; i++){
     Button[i].style["display"]= "none;"
    }
    titleOrQuestion.textContent = "All done!";
    titleOrQuestion.textContent.style["color"]="red";
    instructions.textContent = "Hope you enjoyed the quiz. Your final score is: "+ quizScore;
//Enter initials": input field SUBMIT Button.
};

});
/*

instructions.textContent = "High Scores";

//Prints ten highest scores in order. Format = ranking/ initials /score
//Buttons: button1.textContent = Go Back, button2.textContent = Clear High Scores. They appear side by side. */
