
var startButton = document.getElementById("start-btn")
var nextButton = document.getElementById("next-btn")
var startScreen = document.getElementById("start-screen")
var endScreen = document.getElementById("end-screen")
var questionContainerEl = document.getElementById("question-container");
var questionEl = document.getElementById("question")
var answerButtonsEl = document.getElementById("answer-buttons")
var feedbackElement = document.getElementById("feedback")
var submitBtn = document.getElementById("submit")
var initialsEl = document.getElementById("initials")
var score = document.getElementById("score")
var timerEl = document.getElementById("time")

//timer elements
var time = 75
var timerId;


//shuffle questions 
var shuffledQuestions, currentQuestionIndex


//start button to start quiz
startButton.addEventListener("click", startQuiz)
//next button to get next question
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    //call setNextQuestion function
    setNextQuestion()
});


//start quiz
function startQuiz(){
    startScreen.classList.add("hide")
    //shuffle questions
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hide")
    //show first questions after start quiz is clicked
    setNextQuestion()
    //start timer when squiz is started
    timerId = setInterval(clockTick, 1000);
    //show time
    timerEl.textContent = time;
}

function clockTick(){
    time--;
    timerEl.textContent = time;

    if (time <= 0){
        quizEnd();
    }
}

//show next question when users clicks next
function setNextQuestion(){
    //call resetState function
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

//show questions
function showQuestion(question){
    questionEl.innerText = question.question
    //loop through question answers
    question.answers.forEach(answer => {
        //button for each answer
        var button = document.createElement("button")
        // button text =to answer text
        button.innerText = answer.text
        //set button class
        button.classList.add("btn")
        //check if answer is correct
        if (answer.correct){
            //add data attribute to button
            button.dataset.correct = answer.correct
        }
        //event listener for clicked buttons
        button.addEventListener("click", selectAnswer)
        answerButtonsEl.appendChild(button)

    })
}

//clear previous questions and answers 
function resetState(){
    //clear class in body
    clearStatusClass(document.body)
    //hide next btn
    nextButton.classList.add("hide")
    //loop through all the children for answer elements
    while (answerButtonsEl.firstChild){
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

//select answer, event in as a parameter
function selectAnswer(e){
    //get btn selected
    var selectedButton = e.target
    //see if it was correct
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    //loop through other buttons to set class
    //array to use for each loop
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestions.length > currentQuestionIndex + 1){
        //show next button if not on last question 
        nextButton.classList.remove("hide")
    } else {
        //if last question, show end screen
        quizEnd();
    }
        
}

function quizEnd(){
    //stop timer
    clearInterval(timerId);
    //show end screen
    endScreen.classList.remove("hide");
    startScreen.classList.add("hide");
    questionContainerEl.classList.add("hide");

    //show final score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
}


//status of selected answer, correct || wrong 
function setStatusClass(element, correct){
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct");
    } 
    else {
        element.classList.add("wrong");
        time -= 1;
         if (time <0){
             time = 0;
         }
    }
}

//remove correct and wrong 
function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}


// array of quiz questions
var questions = [
    {
        //question #1
        question: "Commonly used data types DO NOT include:",
        //answer array
        answers:[
            //objects 
            {text: "Strings", correct: false},
            {text: "Alerts", correct: true},
            {text: "Booleans", correct: false},
            {text: "Numbers", correct: false}
        ]
    },
    {
         //question #2
        question: "The condition in an if/else statement is inclosed within ____.",
        answers:[
             {text: "Parenthesis", correct: true},
             {text: "Quotes", correct: false},
             {text: "Curly Brackets", correct: false},
             {text: "Square brackets", correct: false}
        ]
    },
    {
        //question #3
        question: "Arrays in JavaScript can be used to store____.",
        answers:[
            {text: "Numbers and strings", correct: false},
            {text: "Other arrays", correct: false},
            {text: "Booleans", correct: false},
            {text: "All the above", correct: true},
        ]
    },
    {
         //question #4
         question: "String values must be enclosed within____when being assigned to variables.",
         answers:[
            {text: "Commas", correct: false},
            {text: "Curly brackets", correct: false},
            {text: "Quotes", correct: true},
            {text:"Parenthesis", incorrect: false}
         ]
    },
    {
        //question #5
        question: "A very useful tool used during development and debugging for printing conent to the debugger is:",
        answers:[
            {text: "JavaScrit", incorrect: false},
            {text: "Terminal/Bash", incorrect: false},
            {text: "For loops", incorrect: false},
            {text: "Console log", correct: true}
        ]
    }
];


//save high scores
function saveHighscore(){
    //value for input box
    var initials = initialsEl.nodeValue;

    if (initials !== ""){ 
        //get score form localstorage
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
        //create score
        var newScore = {
            score: time,
            initials: initials 
        };

        //save scores to local storage
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        window.location.href = "highscores.html";
    }
}

//user clicks button to submit initials
submitBtn.onclick = saveHighscore;

