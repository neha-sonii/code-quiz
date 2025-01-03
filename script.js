let questions = [
    {
        prompt: `Inside which HTML element do we put the javascript?`,
        options: [
            "<javascript>",
            "<js>",
            "<script>",
            "<scripting>"
        ],
        answer: "<script>",
    },
    {
        prompt: `How do you call a function named myFunction? `,
        options: [
            "call myFunction()",
            "myFunction()",
            "call function myFunction",
            "Call.myFunction"
        ],
        answer: "myFunction()",
    },{
        prompt: `How does a for loop start?`,
        options: [
            "for (let i = 0; i <= 5; i++)" ,
            "for(i = 0; i <= 5)",
            "for i = 1 to 5",
            "for (i <= 5; i++)"
        ],
        answer: "for (let i = 0; i <= 5; i++)",
    },{
        prompt: `In javascript, Which of the following is a logical operatorz?`,
        options: [
            "|",
            "&&",
            "%",
            "/"
        ],
        answer: "&&",
    },{
        prompt: `A named element in javascript program that is used to store and retrieve data is a _____.`,
        options: [
            "method",
            "assignment operator",
            "letiable",
            "string"
        ],
        answer: "letiable",
     },
   {
        prompt: `How many Datatypes are in javascript?`,
        options: [
            "5",
            "8",
            "10",
            "3"
        ],
        answer: "8",
    },{
        prompt: `which array method is used to add a new element to an array?`,
        options: [
            "push()",
            "Shift()",
            "join()",
            "slice()"
        ],
        answer: "push()",
    },{
        prompt: `function() {} is typeof ______.`,
        options: [
            "string",
            "number",
            "function",
            "object"
        ],
        answer: "function",
    },{
        prompt: `_______ is used to Add new property to an object, changing propoerty value.`,
        options: [
            "object.keys()",
            "object.defineProperty()",
            "object.propertyNames()",
            "object()"
        ],
        answer: "object.defineProperty()",
    },{
        prompt: `Functions running parallel with other funcions are called _______.`,
        options: [
            "Asynchronous",
            "synchronous",
        ],
        answer: "Asynchronous",
    },{
        prompt: `What is the full form of DOM?`,
        options: [
            "document oriented model",
            "document object model"
        ],
        answer: "document object model",
    },{
        prompt: `How many kind of popup box in javascript?`,
        options: [
            "3",
            "5",
            "4",
            "2"
        ],
        answer: "3",
    },{
        prompt: `which method is used to convert a js object into a string?`,
        options: [
            "JSON.parse()",
            "JSON.stringify()"
        ],
        answer: "JSON.stringify()",
    }
]

// get DOM element
let questionsEl = document.querySelector("#questions");
let timerEl = document.querySelector("#timer");
let choicesEl = document.querySelector("#options");
let sumbitBtn = document.querySelector("#submit-score");
let startBtn = document.querySelector("#start");
let nameEl = document.querySelector("#name");
let feedbackEl = document.querySelector("#feedback");
let restartBtn = document.querySelector("#restart");

let currentQuestionIndex = 0;
let time = questions.length * 9;
let timerId;

// start quiz nad hide frontpage

function quizStart() {
    timerId = setInterval(clockTime, 1000);
    timerEl.textContent = time;
    let landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestions();
}

function getQuestions() {
    let currentQuestion = questions[currentQuestionIndex];
    let promptEl = document.getElementById("questions-words");
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(
        function (choice, i) {
            let choiceBtn = document.createElement("button");
            choiceBtn.setAttribute("value", choice);
            choiceBtn.textContent = i + 1 + " ." + choice;
            choiceBtn.onclick = questionClick;   //questionClick is a function
            choicesEl.appendChild(choiceBtn);
        }
    );
}

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 10;
        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
        feedbackEl.textContent = `Wrong! The correct answer was ${questions[currentQuestionIndex].answer}`;
        feedbackEl.style.color = "red";
    }
    else {
        feedbackEl.textContent = "correct!";
        feedbackEl.style.color = "green";

    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(() => {
        feedbackEl.setAttribute("class", "feedback hide")
    }, 2000);

    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestions();
    }
}

// end quiz by hiding questions, stop timer and show final score

function quizEnd() {
    clearInterval(timerId);
    let endScreenEl = document.getElementById("quiz-end");
    endScreenEl.removeAttribute("class");
    let finalScoreEl = document.getElementById("score-final");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}

// end quiz if timer reaches 0

function clockTime() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        quizEnd();
    }
}

// save score in localstoragee along with user name
    function saveHighScore() {
        let name = nameEl.value.trim();
        if (name !== "") {
            let highScore = JSON.parse(window.localStorage.getItem("highscore")) || [];
            let newScore = {
                score: time,
                name: name,
            };
            highScore.push(newScore);
            window.localStorage.setItem("highscore", JSON.stringify(highScore));
            alert("Your score has been Submitted");
        }
    }

    // save user score after pressing enter

    function checkForEnter(event) {
        if (event.key === "Enter") {
            saveHighScore();
            alert("Your score has been Submitted");
        }
    }



nameEl.onkeyup = checkForEnter;
sumbitBtn.onclick = saveHighScore;
startBtn.onclick = quizStart;