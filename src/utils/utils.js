const fs = require("fs");

// Import & Parse Game store
const rawData = fs.readFileSync("./src/games.json");
const gameStore = JSON.parse(rawData);

// Will return a matched game object OR
// false so module can handle response to client
function searchForGame(query) {
  const { games } = gameStore;

  const game_exists = games.find((element) => element.search.includes(query));
  if (!game_exists) {
    return false;
  }

  return game_exists;
}

function convertToSeconds(miliseconds) {
  const seconds = Math.floor(miliseconds / 1000);

  return seconds;
}

function convertToTime(miliseconds) {
  // 1- Convert to seconds:
  let seconds = miliseconds / 1000;

  // 2- Extract hours:
  let hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
  seconds = Math.round(seconds) % 3600; // seconds remaining after extracting hours

  // 3- Extract minutes:
  let minutes = parseInt(seconds / 60); // 60 seconds in 1 minute

  // 4- Keep only seconds not extracted to minutes:
  seconds = seconds % 60;

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  console.log(
    `You've played ${hours} hour(s), ${minutes} minute(s) & ${seconds} seconds...`
  );
}

module.exports = {
  searchForGame,
  convertToSeconds,
  convertToTime,
};
