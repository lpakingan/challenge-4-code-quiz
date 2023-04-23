var timerEl = document.getElementById('quizTimer');
var startScreen = document.querySelector(".start_screen");
var quizScreen = document.querySelector(".quiz_screen");
var questionPrompt = document.getElementById('question');
var answersPrompt = document.querySelector(".answers");

var possibleQuestions = 
["Commonly used data types do NOT include _____.",
"The condition of an if/else statement is enclosed with _____.",
"Arrays in JavaScript can be used to store _____.",
"String values must be enclosed within _____ when being assigned to variables.",
"A very useful tool used during development and debugging for printing content to the debugger is:"]

var quizAnswers = [
['strings', 'booleans', 'alerts', 'numbers'],
['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
['commas', 'curly brakcets', 'quotes', 'parenthesis'],
['JavaScript', 'terminal/bash', 'for loops', 'console.log']]

function quizTimer() {
    var quizTime = 80;
    startScreen.style.display = 'none';

    var quizInterval = setInterval(function () {
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
        }
    }, 1000);
}

// picks questions in random order for quiz
function randomQuestion() {
    // create separate arrays that will not affect the root arrays (so it is unique for each quiz)
    var thisQuizQuestions = possibleQuestions.slice() 
    var thisQuizAnswers = quizAnswers.slice()

    // picks random question for quiz and finds index for corresponding answer in answer array
    pickedQuestion = thisQuizQuestions[Math.floor(Math.random() * thisQuizQuestions.length)];
    currentIndex = thisQuizQuestions.indexOf(pickedQuestion);

    // writes the question and answers to the webpage
    questionPrompt.textContent = pickedQuestion;
    answersPrompt.textContent = thisQuizAnswers[currentIndex];

    // removes the picked question and answer from getting picked again
    thisQuizQuestions.splice(currentIndex, 1);
    thisQuizAnswers.splice(currentIndex, 1);
}

startScreen.style.display = 'none';
quizScreen.style.display = 'none';

// randomQuestion()

