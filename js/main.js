var $start = document.querySelector("#start");
var $game = document.querySelector("#game");
var $time = document.querySelector("#time");
var $timeHeader = document.querySelector("#time-header");
var $resultHeader = document.querySelector("#result-header");
var $result = document.querySelector("#result");
var $inputGameTime = document.querySelector("#game-time");
var color = ["red", "blue", "green", "yellow", "pink","black"];

var score = 0;
var isGameStarted = false;

function show($el) {
  $el.classList.remove("hide");
}
function hide($el) {
  $el.classList.add("hide");
}

$start.addEventListener("click", startGame);
$game.addEventListener("click", handleBoxClick);

function startGame() {
  score = 0;
  isGameStarted = true;
  //   $inputGameTime.disabled = true;
  $inputGameTime.setAttribute("disabled", true);

  setGameTime();

  $game.style.backgroundColor = "#fff";
  hide($start);

  var interval = setInterval(function() {
    var time = parseFloat($time.textContent);

    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);

  renderBox();
}

$inputGameTime.addEventListener("input", setGameTime);

function setGameTime() {
  show($timeHeader);
  hide($resultHeader);
  var time = $inputGameTime.value;
  $time.textContent = time;
}

function endGame() {
  isGameStarted = false;
  $inputGameTime.removeAttribute("disabled");

  $game.style.backgroundColor = "#ccc";
  show($start);
  $game.innerHTML = "";
  hide($timeHeader);
  show($resultHeader);
  $result.textContent = score;
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return;
  }
  if (event.target.getAttribute("data-box")) {
    score++;
    renderBox();
  }
}

function renderBox() {
  $game.innerHTML = "";
  var box = document.createElement("div");
  var boxSize = getRandom(30, 100);
  var gameSize = $game.getBoundingClientRect();
  var maxTop = gameSize.height - boxSize;
  var maxLeft = gameSize.width - boxSize;

  box.style.height = box.style.width = boxSize + "px";
  box.style.position = "absolute";
  box.style.backgroundColor = color[getRandom(0, color.length)];
  box.style.top = getRandom(0, maxTop) + "px";
  box.style.left = getRandom(0, maxLeft) + "px";

  box.style.cursor = "pointer";
  box.setAttribute("data-box", "true");

  $game.insertAdjacentElement("afterbegin", box);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
