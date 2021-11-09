var userScores = JSON.parse(localStorage.getItem("highscores"))
var list = document.getElementById('highscoreList')

if (userScores === null) {
  var none = document.createElement('h1')
  none.textContent = "No Scores Recorded"
  list.append(none)
  
} else {
  for (var i = 0; i < userScores.length; i++) {
    var listItem = document.createElement('li')
    listItem.textContent = "Name: " + userScores[i].name + " - Score: " + userScores[i].score
    list.prepend(listItem)
  }
}
