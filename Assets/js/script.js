var quiz = [
  {
    question: "Commonly used data types DO NOT Include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    question: "The condition in an if / else statement is enclosed with:",
    choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    answer: "parenthesis"
  },
  {
    question: "Arrays in JavaScript can be used to store ______.",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above"
  },
  {
    question: "String values must be enclosed within _______ when being assigned to variables:",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes"
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    answer: "console.log"
  }
];

startButton();

function startButton() {
  var question = document.getElementById("question")
  question.style.display = "none"
  var startButton = document.createElement("h2")
  startButton.setAttribute("id", "start-button")
  startButton.textContent = "Start Quiz"
  document.body.append(startButton)
  startButton.addEventListener("click", startQuiz)

  function startQuiz() {
    startButton.style.display = "none"
    question.style.display = "block"
    var highScore = document.getElementById("high-score")
    var timer = document.getElementById("timer")
    var optionList = document.getElementById("option-list")
    var header = document.getElementById("header")
    header.style.display = "none"
    var text = document.getElementById("text")
    text.style.display = "none"

    var highScoreButton = document.createElement("h3")
    highScoreButton.className = "highscore-button"
    highScoreButton.setAttribute("id", "highscore-button")
    highScoreButton.textContent = "View High Scores"
    highScore.append(highScoreButton)
    highScoreButton.addEventListener("click", function () {
      window.location.href = "highscore.html"
    });

    var time = 60

    function startTimer() {
      var quizTimer = setInterval(function () {
        if (time <= 0 || questionIndex === quiz.length - 1) {
          clearInterval(quizTimer);
          document.getElementById("timer").textContent = "DONE";
        } else {
          var timerEl = document.createElement("h4")
          timerEl.setAttribute("id", "timer-el")
          document.getElementById("timer").innerHTML = time + " seconds left";
          timer.append(timerEl)
        }
        time -= 1;
      }, 1000);
    };

    var currentScore = 0
    var questionIndex = 0
    var questionsEl = document.createElement('h1')

    renderQuestion();

    function renderQuestion() {
      questionsEl.textContent = quiz[questionIndex].question
      question.prepend(questionsEl)
      for (var i = 0; i < quiz[questionIndex].choices.length; i++) {
        var optionsEl = document.createElement('li')
        optionsEl.className = "options"
        optionsEl.textContent = quiz[questionIndex].choices[i]
        optionsEl.setAttribute('id', "choices", quiz[questionIndex].choices[i])
        optionList.append(optionsEl)
      }
    };

    optionList.addEventListener('click', function (e) {
      if (e.target.id === quiz[questionIndex].answer) {
        console.log("correct")
        currentScore += 20
      } else {
        console.log('incorrect')
        time -= 10
      }
      console.log(currentScore)
      nextQuestion();
    });

    function nextQuestion() {
      if (questionIndex === quiz.length - 1) {
        console.log('done')
        var main = document.querySelector('#main')
        main.textContent = ""
        var finish = document.createElement("h2")
        finish.textContent =  "All done! Please type your initials below to continue and view your high score!"

        var initialContainer = document.createElement("input")
        initialContainer.setAttribute("placeholder", "Enter initials here")

        var submitBtn = document.createElement("button")
        submitBtn.textContent = "Submit"

        main.prepend(initialContainer)
        main.prepend(finish)
        main.append(submitBtn)

        submitBtn.addEventListener("click", function() {
          var storage = JSON.parse(localStorage.getItem("highscores"))
          if (storage === null) {
            storage = []
          }
          var userInfo = {
            name: nameContainer.value,
            score: currentScore
          }
          storage.push(userInfo)
          localStorage.setItem("highscores", JSON.stringify(storage))
          window.location.href = "highscore.html"
        })

      } else {
        questionsEl.textContent = ""
        optionList.textContent = ""
        questionIndex++
        console.log(questionIndex)
        renderQuestion();
      }
    };
    startTimer();

  };
};

// rendering each question and choices. it is checking if an answer is correct

// to do -
// stop rendeing questions if index is greater than 4. add to highscore var to keep track of score. add score to local storage and get data onto highscores page

