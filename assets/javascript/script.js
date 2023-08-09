
var displayTime = document.getElementById("timer"); //Selects the element where the remaining time will be displayed.

var timeLeft;

var quizScore = 0; //Sets the quiz score to zero initially. Points will be added as the user answers questions right.

var choices = ["a", "b","c","d"]; // Possible choices for the answers of each of the five questions in the quiz.

var mainSection = document.getElementById('main'); //Grabs the main section of the document by using its Id.

var titleOrQuestion = document.getElementById("title/question"); //In this heading either a title or a question will be displayed.

titleOrQuestion.style['color'] = "darkgray"; // Throughout the code we access the style property of some DOM objects to change CSS properties dynamically. Its the dynamical counterpart of inline CSS.

titleOrQuestion.textContent = "Web Development Timed Quiz"; //This is the name of the App. Its the first title to be displayed.

var instructions = document.getElementById("instructions"); //Selects a paragraph element where useful information will be provided .
/*This paragraph explains the basic functioning of the Web App*/
instructions.textContent = "Click on the button below to start a web-development-related quiz. You will be prompted to sequentially answer five multiple-choice questions within the alloted time displayed on the right-most corner. If the chosen answer is correct, a point will be added to your score. If you answer incorrectly, no extra points will be added PLUS you will LOSE ten seconds from the remaining time. The quiz ends either when you answer all ten questions or when the timer reaches 0.";

var buttonList = document.getElementById("buttons"); //The buttons that will allow the user to enter answers will be appended to this list.

var savedScoresBtn = document.getElementById("high-scores");

savedScoresBtn.addEventListener("click", viewHighScores);

function viewHighScores(){

    titleOrQuestion.textContent = "High Scores";//Setting the title of this section
    titleOrQuestion.style["color"]="lightblue";
  
    var storedStats = JSON.parse(localStorage.getItem("Stats")); //Parsing the item "Stats" stored in the localStorage object in order to retrieve some data that will be displayed onscreen. The result is an array whose elements are arrays holding the stats (initials, score, and completion time) of various users.

    console.log(storedStats);

    if(!storedStats){

        instructions.textContent = "Regrettably, there are no scores stored so far. Click below to try the quiz for yourself."

        return;

    }

    
    startButton.style["display"] = "none";


    instructions.textContent = "These are the highest quiz scores so far:";//Description of the data to be found on the list

    var highScoresList = document.createElement("ol"); //Creating an ordered list to display scores and appending it
    mainSection.appendChild(highScoresList);

    for(let i=0; i < storedStats.length; i++){ //Generating the necessary elements in order to print the data(the items of the ordered list) onscreen.

    let score = document.createElement("li");
     
    score.style["font-size"]=["3rem"];//Dynamically changing some CSS properties of the <li> element
    score.style["color"]=["lightblue"];

    score.textContent = storedStats[i].initials + "  scored  " + storedStats[i].score + "  points in  " + storedStats[i].timing + "  seconds";//Updating the inner HTML of the <li> element
    
    highScoresList.appendChild(score);

    }

    var goBackBtn = document.createElement("button"); //Refreshes the page to start a new quiz: create, append, and stylize
    highScoresList.appendChild(goBackBtn);
    goBackBtn.setAttribute("id", "goBack")
    goBackBtn.textContent = "Back to Quiz";

    var clearScoresBtn = document.createElement("button");//Clears the list in High Scores: create, append, and stylize
    highScoresList.appendChild(clearScoresBtn);
    clearScoresBtn.setAttribute("id", "clear");
    clearScoresBtn.textContent = "Clear the List";

    //Adding event listeners to the buttons so that they can perform the desired functionality.

    goBackBtn.addEventListener("click", ()=>{ 
        location.reload();
    });

    clearScoresBtn.addEventListener("click", ()=>{
        var scores =  highScoresList.children; //Using the children property of the list object in order to get an array whose elements are all of the elements of the list + the attached buttons.

        for(let i=0; i<scores.length - 2; i++){//This loop clears the content of each of the scores from the screen but leaves the 2 buttons intact.

            scores[i].textContent = "";
        }

        localStorage.clear(); //This will delete the stats info that is already in persistent storage in order to start the rankings anew

    });
}

var startButton = document.createElement("button"); //Creating the start button and adding it its text content
startButton.textContent = "Start Quiz";

buttonList.append(startButton); //Attaching the start button node to the <ul> node in the DOM.

//var startButton = document.getElementById("start"); //Pressing this button will be the event that fires the application

startButton.addEventListener("click", function(event){ //The firing event will be a single-click on the start button. Inmmediately, the event-handler will be initialized.


var isAnswerWrong = false; // This Boolean-valued variable will be updated each time the validateAnswer function is called.

var remainingTime = displayTime.children[0]; //Selects the <span> element where the reverse countdown takes place.
    remainingTime.style["color"] = "red";

    startButton.style["display"] = "none";//Hides the start button, disabling it so that the event handler will not be triggered again during the duration of the quiz.

    instructions.style["text-align"] = "justify";

    titleOrQuestion.style['color'] = "white";

    var  Questions = ["A very useful tool used during development and debugging for printing content to the debugger is:", // This array stores the questions that will be shown to the user.
        "The condition in an if/else statement is enclosed with__________.",
        "String values must be enclosed within__________ when being assigned to variables.",
        "Commonly used data types DO NOT Include:",
        "Arrays in JavaScript can be used to store__________."];

    var Slide = new Array(5); //This array will store the questions, the different possible answers to the question that the user can choose and, finally, the correct answer.

        Slide[0] = [Questions[0],"a. JavaScript","b. terminal/bash","c. for loops","d. console.log" ,"d"];
        Slide[1] = [Questions[1],"a.quotes","b. curly brackets","c. parenthesis","d. square brackets","c"];
        Slide[2] = [Questions[2],"a. commas","b. curly brackets","c. quotes","d. parenthesis","c"];
        Slide[3] = [Questions[3],"a. strings","b. booleans","c. alerts","d. numbers","c"];
        Slide[4] = [Questions[4],"a. numbers and strings","b. other arrays","c. booleans","d. all of the above","d"];

    var listItem = new Array(4); //Array that contains the list items to be appended to buttonList.
    var Button = new Array(4); //Array that contains each of the buttons available to click while answering each question.

    for (let i = 0; i<4; i++){ //This loop creates and appends each of the list items and corresponding buttons.
        listItem[i]= document.createElement("li");
        Button[i] = document.createElement("button");
        Button[i].style["text-align"] = "left";
        buttonList.appendChild(listItem[i]);
        listItem[i].appendChild(Button[i]);
    };


    function init(){ //This function will be initialized when the event happens on the start button target, starting the quiz.
    
        nextQuestion(0); //Passing the argument "0" to the hoisted nextQuestion function.
        timeLeft = 50;  //The user will be granted 50 seconds to answer the quiz.
        remainingTime.textContent = timeLeft; //From here on, this line of code will update the time counter..
       
    }

    init(); //Invoking the init function.

    var quizAllottedTime = setInterval(function (){ //Setting the time interval, including rules to update the counter based on certain Boolean expressions.
            if(!isAnswerWrong && timeLeft>0){
                timeLeft--;
                remainingTime.textContent = timeLeft;
            }else if(!isAnswerWrong && timeLeft===0){
                remainingTime.textContent = timeLeft;
                endQuiz();
            }else if (isAnswerWrong && timeLeft>10){
                timeLeft = timeLeft-10;
                remainingTime.textContent = timeLeft;
            }else if (isAnswerWrong && timeLeft<=10)
            {   
                timeLeft=0;
                remainingTime.textContent = timeLeft;
                endQuiz();
            };
        },1000); // This ensures the counter will be updated each second (===1000 milliseconds)

        var evalAns = document.getElementById("eval-ans");//This paragraph element will be useful once we start evaluating the answers given, telling whether they are right or wrong.
        evalAns.style["text-align"] = "left";

    function nextQuestion(x){ 

        if(x>=0 && x<5){
            titleOrQuestion.textContent = "Question #" + (x+1);//This takes into account the fact that counting in JS is zero-based.

            instructions.textContent = Slide[x][0];
            
            for(let i=0; i<4; i++){//This loop updates the text content of the buttons, so they offer possible answers to each question.
            Button[i].textContent = Slide[x][i+1];
            }
        

            if(x===0){ //Special case: there is no answer to evaluate yet.
                var evalAns = document.getElementById("eval-ans");
                evalAns.style["text-align"] = "left";
                evalAns.style['color'] = 'black';
                evalAns.textContent = "Please, press the button with the best answer.";
            }
        }
        ChoiceEvent(x); //Invoking the hoisted function ChoiceEvent, which adds event listeners to each of the previously generated buttons.
    }

   var userChoice;

   function ChoiceEvent(x) {

        Button[0].addEventListener("click", function (){//For each button, the variable userChoice gets a different value chosen from the global choices array
            userChoice = choices[0];
            console.log(userChoice);
            validateAnswer(x, userChoice)
        });

        Button[1].addEventListener("click", function (){
            userChoice=choices[1];
            console.log(userChoice);
            validateAnswer(x, userChoice)
        });

        Button[2].addEventListener("click", function (){
            userChoice=choices[2];
            console.log(userChoice);
            validateAnswer(x, userChoice)
        });
        
        Button[3].addEventListener("click", function (){
            userChoice=choices[3];
            console.log(userChoice);
            validateAnswer(x, userChoice)
        });
    }

    function validateAnswer(x, y){ //The logic of this function, helps to determine whether the cosen answer is correct or not. It updates the isAnswerWrong variable.

        if(x<4 && timeLeft>0){ //For these values of x, we pass to the next answer if there is time.

            if (y===Slide[x][5]){
                evalAns.style["color"] ="green";
                evalAns.textContent = "Congratulations!. Your answer was correct.";

                quizScore++;
                console.log(quizScore);
                isAnswerWrong = false;
                nextQuestion(x+1);            

            }else if(y!== Slide[x][5] && timeLeft>10){
                evalAns.style["color"] ="red";
                evalAns.textContent = "Wrong answer. The correct answer to the previous question was: " + Slide[x][5];

                isAnswerWrong = true;
                nextQuestion(x+1);

            }else{
                isAnswerWrong= true;
            };
        } ;
    
        if (x===4 && timeLeft>0){ //This deals with the special case when the user is dealing with the last question.

            if (y === Slide[x][5]){
                evalAns.style["color"] = "green";
                evalAns.textContent = "Congratulations!. Your answer was correct.";

                quizScore++;
                console.log(quizScore);

                isAnswerWrong = false;

                endQuiz();
            
            }else if (y !==Slide[x][5] && timeLeft>10){

                evalAns.style["color"]="red";
                evalAns.textContent = "Wrong answer. The correct answer to the previous question was: " + Slide[x][5];
        
                isAnswerWrong = true;

                endQuiz();

            }else {
                isAnswerWrong = true;

                evalAns.style["color"]="red";
                evalAns.textContent = "Wrong answer. The correct answer to the previous question was: " + Slide[x][5];

            }
        }
    }  
    
    var timeSpentAnsweringQuiz; //Stores what its name says.

    function endQuiz(){ //This function is called upon either when all questions have been answered or the user ran out of time.

        clearInterval(quizAllottedTime);//Stops the counter, clearing the interval (stops the execution of the associated function.)

        timeSpentAnsweringQuiz = 50-timeLeft; 
        
        for(let i=0; i<4; i++){
            Button[i].style["display"]= "none";//This loop hides the buttons previously used to pick an answer.
        }

        instructions.textContent = "Hope you enjoyed the quiz. Your final score is " + quizScore +" and the time elapsed was " + timeSpentAnsweringQuiz +"."; 

        if(timeLeft>0){

        titleOrQuestion.textContent = "All done!";
        titleOrQuestion.style["color"]="yellow";

        }else{ //Special case timeLeft===0.

        titleOrQuestion.textContent = "Time is Up!";
        titleOrQuestion.style["color"]="red";
            
        evalAns.style["display"] = "none";//Hidding the paragraph element with the answer evaluation, so that its not rendered.
        };

        storeStats();
    }

    var endForm = document.createElement("form"); //Creates the form element (node) that the user will use to enter the necessary data to store the achieved score.
    var Stats =[];

    function storeStats(){

        mainSection.appendChild(endForm);//Appending the form where the user will enter his/her initials
        
        var enterInitials = document.createElement("input"); //Generating an input field with the chosen attributes and appending it to the form
        enterInitials.setAttribute("type","text");
        enterInitials.setAttribute("required","true");
        enterInitials.setAttribute("id", "initials");
        enterInitials.setAttribute("placeholder", "Enter your initials here.");
        endForm.appendChild(enterInitials);
        
        var submitButton = document.createElement("button");//Generating a submit button that will be attached to the input field.
        submitButton.setAttribute("for", "initials");
        submitButton.setAttribute("type", "submit");
        submitButton.textContent = "Submit to see the rankings!";
        endForm.appendChild(submitButton);
        
    

        endForm.addEventListener('submit', function (event){ //Adding an event listener to the form. 

        event.preventDefault(); // Preventing the data entered in the text field from being deleted when the submit button is pressed.

        //Collecting the data from the last user and storing it into an object.
        var lastUserStats = { 
            initials : enterInitials.value.trim(), 
            score: quizScore, 
            timing: timeSpentAnsweringQuiz
        }; 

        var storedStats = JSON.parse(localStorage.getItem("Stats")); //Retrieveing the "Stats" JSON string from localStorage and assigning it to the "storedStats" variable.

        // Supposing there is a non-null "storedStats" object saved in localStorage (in the form of a JSON string), we assign it to the "Stats" array 

        if (storedStats) {

          Stats = storedStats;

        }

        Stats.push(lastUserStats); //Add the stats corresponding to the last user to the "Stats" array

        localStorage.setItem("Stats", JSON.stringify(Stats)); //Storing the data inside the newly modified "Stats" array on client-side storage using JSON
        console.log(localStorage);

        
        evalAns.style["display"] = "none"; //Stopping no longer relevant elements from being rendered again, cluttering the page

        endForm.style["display"] = "none";

        viewHighScores();  //Invoking the viewHighScores function, letting the user view a list with at least one score(his/her own)

        });
    }

});



