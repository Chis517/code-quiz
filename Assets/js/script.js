// Quiz question and answer object variable
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

  // highScore element and clickable link to highscore html
  var highScore = document.getElementById("high-score")
  var highScoreButton = document.createElement("h3")
  highScoreButton.className = "highscore-button"
  highScoreButton.setAttribute("id", "highscore-button")
  highScoreButton.textContent = "View High Scores"
  highScore.append(highScoreButton)
  highScoreButton.addEventListener("click", function () {
    window.location.href = "highscore.html"
  });

  // timer element
  var timer = document.getElementById("timer")
  var timerEl = document.createElement("h4")
  timerEl.setAttribute("id", "timer-el")
  document.getElementById("timer").innerHTML = "60 seconds left";
  timer.append(timerEl)

  // Hides questions and choices until startQuiz function is called via click
  function startButton() {
  var question = document.getElementById("question")
  question.style.display = "none"
  var startButton = document.getElementById("start-button")
  startButton.addEventListener("click", startQuiz)
  
  // Hides display of title, directions and start button and displays the questions and choices
  function startQuiz() {
    startButton.style.display = "none"
    question.style.display = "block"
    var optionList = document.getElementById("option-list")
    var title = document.getElementById("title")
    title.style.display = "none"
    var text = document.getElementById("text")
    text.style.display = "none"

    var questionIndex = 0
    var questionsEl = document.createElement('h1')
    var time = 60

    // function to start the timer when startQuiz function is called
    function startTimer() {
      var quizTimer = setInterval(function () {
        if (time === 0 || questionIndex === quiz.length - 1) {
          clearInterval(quizTimer);
          document.getElementById("timer").textContent = "DONE";
        } else {
          var timerEl = document.createElement("h4")
          timerEl.setAttribute("id", "timer-el")
          document.getElementById("timer").innerHTML = time + " seconds left";
          timer.append(timerEl)
        }
        time -= 1;
        console.log(time);
      }, 1000);
    };

    renderQuestion();

    // function to display each question through a for loop 
    function renderQuestion() {
      questionsEl.className = "question"
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

    var currentScore = 0
    
    // listens for choice click, logs whether the choice was correct and adds 20 to currentScore or if incorrect, user gets a timer penalty, then calls the nextQuestion function
    optionList.addEventListener('click', function (e) {
      if (e.target.innerText === quiz[questionIndex].answer) {
        currentScore += 20;
        console.log('correct')
      } else {
        console.log('incorrect')
        time -= 9
      }
      console.log('score ' + currentScore)
      nextQuestion();
    });

    // function to change questions and choices after user clicks their choice.
    function nextQuestion() {
      // after the 5th question, the page displays an input and submit button element to store the users score locally
      if (questionIndex === quiz.length - 1) {
        console.log('done')
        var main = document.querySelector('#main')
        main.textContent = ""
        var finish = document.createElement("h2")
        finish.className = "done"
        finish.textContent = "All done! Please type your initials below to continue and view your high score!"

        var initialContainer = document.createElement("input")
        initialContainer.className = "initialInput"
        initialContainer.setAttribute("placeholder", "Enter initials here")

        var submitBtn = document.createElement("button")
        submitBtn.className = "submitBtn"
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
            name: initialContainer.value,
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