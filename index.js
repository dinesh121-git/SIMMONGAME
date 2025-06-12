const buttonColors = ["one", "two", "three", "four"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

const startButton = document.getElementById("start-btn");
const levelDisplay = document.querySelector("p");
const body = document.body;

startButton.addEventListener("click", () => {
  if (!started) {
    level = 0;
    gamePattern = [];
    started = true;
    levelDisplay.textContent = "Game Started!";
    playSound("start");
    setTimeout(nextSequence, 1000);
  }
});

document.querySelectorAll(".container div").forEach(button => {
  button.addEventListener("click", function () {
    if (!started) return;

    const userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  levelDisplay.textContent = "Level " + level;

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  const selectedButton = document.getElementById(randomChosenColor);
  selectedButton.classList.add("blink");
  setTimeout(() => selectedButton.classList.remove("blink"), 200);

  playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    body.classList.add("game-over");
    levelDisplay.textContent = "Game Over! Click Start to try again.";
    started = false;

    setTimeout(() => {
      body.classList.remove("game-over");
    }, 300);
  }
}

function playSound(name) {
  let path = "";

  switch (name) {
    case "one":
      path = "sounds/video-game-bonus-323603.mp3";
      break;
    case "two":
      path = "sounds/game-bonus-2-294436.mp3";
      break;
    case "three":
      path = "sounds/pixel-level-up-sound-351836.mp3";
      break;
    case "four":
      path = "sounds/fantasy-game-sword-cut-sound-effect-get-more-on-my-patreon-339824.mp3";
      break;
    case "start":
      path = "sounds/game-start-6104.mp3";
      break;
    case "wrong":
      path = "sounds/game-over-deep-male-voice-clip-352695.mp3";
      break;
  }

  if (path) {
    const audio = new Audio(path);
    audio.play();
  }
}

function animatePress(color) {
  const button = document.getElementById(color);
  button.classList.add("pressed");
  setTimeout(() => button.classList.remove("pressed"), 100);
}
