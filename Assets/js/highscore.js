// gets user names and scores from local storage and parses the values
var userScores = JSON.parse(localStorage.getItem("highscores"))
var list = document.getElementById('highScoreList')

if (userScores === null) {
  var none = document.createElement('h1')
  none.textContent = "No Scores Recorded"
  list.append(none)

} else {
  // for loop to display previous users name and score
  for (var i = 0; i < userScores.length; i++) {
    var listItem = document.createElement('li')
    listItem.className = "userScore"
    listItem.textContent = "Name: " + userScores[i].name + " - Score: " + userScores[i].score
    list.prepend(listItem)
  }
};