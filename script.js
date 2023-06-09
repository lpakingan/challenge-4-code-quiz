// variables for quiz timer/scores
var timerEl = document.getElementById('quizTimer');
var scoreEl = document.getElementById('score');
var finalScoreEl = document.getElementById('finalScore');

// variables for the various screens of the quiz application
var startScreen = document.querySelector(".start_screen");
var quizScreen = document.querySelector(".quiz_screen");
var endScreen = document.querySelector(".end_screen");
var highscoresScreen = document.querySelector(".highscores_screen");

// variables for quiz elements that dynamically change 
var questionPrompt = document.getElementById('question');
var answersPrompt = document.querySelector(".answers");
var correctAnswer = document.getElementById("correctAnswer");
var incorrectAnswer = document.getElementById("incorrectAnswer");
var answerFeedback = document.getElementById("feedback")
var viewHighscores = document.getElementById("viewHighscores");
var highscoresList = document.querySelector(".highscoresList")
var submissionMessage = document.getElementById("submissionMsg");
var clearMessage = document.getElementById("clearMsg")

// variables for the different responsive buttons in the quiz application
var startButton = document.querySelector(".start-button");
var answerButton = answersPrompt.getElementsByClassName("answer-button");
var backButton = document.querySelectorAll(".goBack-button");
var submitButton = document.querySelector(".submit-button");
var clearButton = document.querySelector(".clearScores-button")

// array containing the 5 possible quiz questions
var possibleQuestions = 
["Commonly used data types do NOT include _____.",
"The condition of an if/else statement is enclosed with _____.",
"Arrays in JavaScript can be used to store _____.",
"String values must be enclosed within _____ when being assigned to variables.",
"A very useful tool used during development and debugging for printing content to the debugger is:"]

// array containing nested arrays with the answers to each respective question
// the last element of each array is the index of the correct answer
var quizAnswers = [
['strings', 'booleans', 'alerts', 'numbers', 2],
['quotes', 'curly brackets', 'parenthesis', 'square brackets', 2],
['numbers and strings', 'other arrays', 'booleans', 'all of the above', 3],
['commas', 'curly brackets', 'quotes', 'parenthesis', 2],
['JavaScript', 'terminal/bash', 'for loops', 'console.log', 3]]

quizTime = 60;

// sets the quiz's timer and is called once the quiz is initialized
function quizTimer() {
    // if the quiz's timer goes below 10 seconds, a Hurry message is added
    // once the timer hits 0, the message changes to 'Time's Up!'
    quizTime = 60;
    quizInterval = setInterval(function () {
        if (quizTime >= 10) {
            timerEl.textContent = quizTime + ' seconds';
            quizTime--;
        } else if (quizTime > 1 && quizTime < 10) {
            timerEl.textContent = 'Hurry! ' + quizTime + ' seconds left!';
            quizTime--;
        } else if (quizTime === 1) {
            timerEl.textContent = 'Hurry! ' + quizTime + ' second left!';
            quizTime--;
        } else {
            timerEl.textContent = 'Time\'s up!';
            clearInterval(quizInterval);
            endQuiz();
        }
    }, 1000);
}

// stops the timer whenever called
function stopTimer() {
    clearInterval(quizInterval);
}

// picks questions in random order for quiz
function randomQuestion() {
    // picks random question for quiz and finds index for corresponding answer in answer array
    for (var i = 0; i < thisQuizAnswers.length; i++) {
        pickedQuestion = thisQuizQuestions[Math.floor(Math.random() * thisQuizQuestions.length)];
        currentIndex = thisQuizQuestions.indexOf(pickedQuestion);

        // writes the question and answers to the webpage
        questionPrompt.textContent = pickedQuestion;

        // indexes into the current question's answers and creates an li for each answer
        // for each li answer, creates a button and appends it to the answers section
        questionAnswers = thisQuizAnswers[currentIndex]
        for (var i = 0; i < questionAnswers.length-1; i++) {
            individualAnswer = document.createElement('li');
            answersPrompt.appendChild(individualAnswer);
            answerButtons = document.createElement('button');
            answerButtons.classList.add("answer-button");
            answerButtons.innerText = questionAnswers[i];
            answersPrompt.appendChild(answerButtons);
        }

        // removes the picked question and answer from getting picked again
        thisQuizQuestions.splice(currentIndex, 1);
        thisQuizAnswers.splice(currentIndex, 1);
    }

    // clicking on any answer button will check the answer to see if it is correct
    // adds EventListener to all answer buttons
    for (var i = 0; i < answerButton.length; i ++) {
        answerButton[i].addEventListener("click", checkAnswer);
    }
}

// checks the user's answer to determine if correct
// takes the inner text (answer) of the clicked answer and finds the index of it in the answer array
// if the index of the clicked answer equals the index listed at the end of the answer array, returns correct
// if the index is not equal, the wrong answer was chosen and the quiz timer depletes by 10 seconds
function checkAnswer(event) {
    // removes correct/incorrect/feedback answer display
    correctAnswer.style.display = 'none';
    incorrectAnswer.style.display = 'none';
    answerFeedback.style.display = 'none';

    var clickedAnswer = event.target.innerText;
    var clickedAnswerIndex = questionAnswers.indexOf(clickedAnswer);
    // index into where the right answer is to give feedback in case user answered incorrectly
    var rightAnswerIndex = questionAnswers[4];
    var rightAnswer = questionAnswers[rightAnswerIndex];

    // logs answer as correct and adds to score
    if (clickedAnswerIndex === questionAnswers[4]) {
        console.log('correct!');
        correctAnswer.style.display = 'block';
        score += 20;
        console.log(score);
        scoreEl.innerText = score;
        if (thisQuizQuestions.length > 0) {
            answersPrompt.innerHTML ='';
            randomQuestion();
        } else {
            endQuiz();
        }
    // logs answer as incorrect and subtracts from timer
    } else {
        console.log('incorrect!');
        incorrectAnswer.style.display = 'block';
        answerFeedback.style.display = 'block';
        answerFeedback.innerText = `The correct answer was ${rightAnswer}!`;
        quizTime -= 10;
        console.log(score);
        scoreEl.innerText = score;

        if (thisQuizQuestions.length > 0) {
            answersPrompt.innerHTML ='';
            randomQuestion();
        } else {
            endQuiz();
        }
    }
}

// starts the quiz by calling on the randomQuestion and quizTimer functions
function beginQuiz() {
    // create separate arrays that will not affect the root arrays (so it is unique for each quiz)
    thisQuizQuestions = possibleQuestions.slice() 
    thisQuizAnswers = quizAnswers.slice()

    // readies quiz by removing the other displays beside the quiz screen (w/ question and answers)
    startScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    correctAnswer.style.display = 'none';
    incorrectAnswer.style.display = 'none';
    answerFeedback.style.display = 'none';

    // runs quizTimer to start the timer and sets score at 0
    quizTimer();
    score = 0;
    scoreEl.innerText = score;

    // ensures that quiz has begun and will generate a random question by running randomQuestion
    if (thisQuizQuestions.length > 0) {
        randomQuestion();
    } 
}

// ends quiz by removing the quiz screen and shows the end screen with the final score
function endQuiz() {
    quizScreen.style.display = 'none';
    endScreen.style.display = 'block';
    viewHighscores.style.display = 'block';

    // if user played previously in the same session, displays submit button again
    submitButton.style.display = 'inline';
    timerEl.innerText = 'Quiz Over!';
    stopTimer();
    finalScoreEl.innerText = score;
}

// shows the highscores page
// if clicked in the middle of a quiz, essentially treats the quiz as over and resets state for next start
function showHighscores() {
    startScreen.style.display = 'none';
    quizScreen.style.display = 'none';
    endScreen.style.display = 'none';
    correctAnswer.style.display = 'none';
    incorrectAnswer.style.display = 'none';

    highscoresScreen.style.display = 'block';

    answersPrompt.innerHTML = '';
    timerEl.style.display = 'none';
    score = 0;

    // if View Highscores is clicked on mid-quiz, stops the timer
    // checks to see if quiz has elapsed; if so, the timer is stopped
    // if View Highscores is clicked prior to running the quiz (i.e upon load in), then stopTimer isn't necessary
    if (quizTime !== 60) {
        stopTimer();
    }
}

// renders the highscore list from the locally stored highscores
function renderHighscoresList() {
    // clears out the list initially in case it was already shown (to prevent duplication)
    highscoresList.innerHTML = '';
    sortScores();

    for (var i = 0; i < sortedHighscores.length; i++) {
        var highscore = sortedHighscores[i];

        var highscoreSubmission = document.createElement('li');
        highscoreSubmission.textContent = `${highscore.scoreName}: ${highscore.highscore}`;

        highscoresList.appendChild(highscoreSubmission);
    }
}

// sort the scores in descending order if there are scores stored locally
function sortScores() {
    if (highscores == null) {
        return;
    } else {
        sortedHighscores = highscores.sort(function(a,b) {
        return b.highscore - a.highscore;
    })
    return sortedHighscores;
}}

// when 'Go Back' button is pressed on highscores page, return user to the start page
function backtoStartScreen() {
    highscoresScreen.style.display = 'none';
    endScreen.style.display = 'none';

    answersPrompt.innerHTML = '';
    submissionMessage.innerText = '';
    clearMessage.innerText = '';

    timerEl.style.display = 'block';
    timerEl.innerText = 'Press Start Quiz to begin!';

    startScreen.style.display = 'block';
}

// initializes the initial start screen
// checks if there are any stored scores; if so, they will show on the highscores list
function init() {
    quizScreen.style.display = 'none';
    endScreen.style.display = 'none';
    highscoresScreen.style.display = 'none';

    var storedScores = JSON.parse(localStorage.getItem("highscores"));
    if (storedScores !== null) {
        highscores = storedScores;
    } else {
        highscores = [];
    }

    renderHighscoresList();
}

// pressing the Start Quiz button results in the quiz start
startButton.addEventListener("click", beginQuiz);

// clicking 'View Highscores' at any point will redirect the user to the highscores page
viewHighscores.addEventListener("click", showHighscores);
// clicking 'Go Back' button on highscores page redirects user to the start screen
// for loop allows for the event listener to be applied to all back buttons
for (var i = 0; i < backButton.length; i ++) {
    backButton[i].addEventListener("click", backtoStartScreen)
}

// pressing the Submit Highscore button at the end of the quiz will submit the highscore to local storage
submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    var name = document.getElementById("submission").value.trim();

    // if the name that is input is empty it will prompt the user to submit again
    if (name === "" || !name) {
        submissionMessage.innerText = 'You must enter your name to submit your highscore!'
    } else {
        submissionMessage.innerText = 'Score submission successful! Go back to play again!'
        submitButton.style.display = 'none';
        var submission = {
            scoreName: name,
            highscore: score
        };

    // checks to see if there is already a highscores array in the local storage
    // if there isn't, create a new array; if there is, continue the stored array
    var storedScores = JSON.parse(localStorage.getItem("highscores"));

    if(storedScores == null) {
        highscores = [];
    } else {
        highscores = storedScores;
    }
    
    // pushes the submission into the highscore array
    highscores.push(submission);
    console.log(submission);
    console.log(highscores)
    name.value = '';

    localStorage.setItem("highscores", JSON.stringify(highscores));
    renderHighscoresList()
    }
});

// clears highscores that are stored locally
clearButton.addEventListener("click", function(event) {
    event.preventDefault();

    localStorage.removeItem("highscores");
    highscoresList.innerHTML = '';
    clearMessage.innerHTML = 'Highscores cleared!';
});

// initializes the page
init();