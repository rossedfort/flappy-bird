const $ = require('jquery');
const Firebase = require("firebase");
const fireDb = new Firebase("https://flappy-jorge.firebaseio.com/");
let sortedScores = []

const populateScoreboard = () => {
  fireDb.child('scoreboard').on('value', function(scores) {
    $('#scoreboard').empty();
    sortedScores = sortScores(scores.val());
    sortedScores.forEach( (record, index) => {
      appendScore(record, index+1);
    })
  })
}

const addScore = (score) => {
  if (score > sortedScores[4].score) {
    $('.form').append(`<label>Congratulations! Please enter you name.</label><input id="name" type="text"></input><input id="submit" class="btn btn-danger btn-lg" type="submit"></input>`)
    $('#submit').on('click', () => {
      updateScoreboard(score);
    });
  }
}

const updateScoreboard = (score) => {
  sortedScores.push({name: $('#name').val(), score: score});
  sortScores(sortedScores);
  fireDb.set({ scoreboard: sortedScores.slice(0, 5) });
  $('.form').children().remove();
}

const appendScore = (record, index) => {
  $('#scoreboard').append(
    `<tr>
      <td>${index}.</td>
      <td>${record.name}</td>
      <td>${record.score}</td>
    </td>`
  )
}

const sortScores = (scores) => {
  let sorted = scores.sort( (a, b) => {
    return b.score - a.score;
  });
  return sorted;
}

module.exports = { addScore: addScore, populateScoreboard: populateScoreboard };
