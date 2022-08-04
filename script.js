const selectBox = document.querySelector(".select-box"),
  selectXBtn = selectBox.querySelector(".playerX"),
  selectOBtn = selectBox.querySelector(".playerO"),
  playBoard = document.querySelector(".play-board"),
  allBox = document.querySelectorAll("section span"),
  players = document.querySelector(".players"),
  resultBox = document.querySelector(".result-box"),
  wonText = resultBox.querySelector(".won-text"),
  replayBtn = resultBox.querySelector("button");

let gameSound = new Audio("./files/gamesound.mp3");

window.onload = () => {
  // khi window load
  for (let i = 0; i < allBox.length; i++) {
    //setAttribute onClick for all span in section
    allBox[i].setAttribute("onClick", "clickedBox(this)");
  }
  selectXBtn.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
  };
  selectOBtn.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.setAttribute("class", "players active player");
  };
  gameSound.play();
  gameSound.loop = true;
  gameSound.volume = 0.3;
};
let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "";
let runBot = true;

//user click
function clickedBox(element) {
  if (runBot) {
    playerSign = "X";
    if (players.classList.contains("player")) {
      // if players contain player then add class active to control the slider
      element.innerHTML = `<i class="${playerOIcon}"></i>`;
      players.classList.add("active");
      playerSign = "O";
      element.setAttribute("id", playerSign);
    } else {
      element.innerHTML = `<i class="${playerXIcon}"></i>`;
      players.classList.add("active");
      element.setAttribute("id", playerSign);
    }
    selectWinner();
    element.style.pointerEvents = "none";
    playBoard.style.pointerEvents = "none";
    let randomDelayTime = (Math.random() * 800 + 200).toFixed();
    setTimeout(() => {
      bot(runBot);
    }, randomDelayTime);
  }
}

//bot click
function bot() {
  if (runBot) {
    //runbot = true then run the codes below
    playerSign = "O";
    let array = [];
    for (let i = 0; i < allBox.length; i++) {
      if (allBox[i].childElementCount == 0) {
        //if in the span tag don't have any child element then add unClicked boxes into array
        array.push(i);
        // console.log(i + " " + "has no children");
      }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    console.log(randomBox);
    if (array.length > 0) {
      if (players.classList.contains("player")) {
        allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
        players.classList.remove("active");
        playerSign = "X";
        allBox[randomBox].setAttribute("id", playerSign);
      } else {
        allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        allBox[randomBox].setAttribute("id", playerSign);
      }
      selectWinner();
    }
    allBox[randomBox].style.pointerEvents = "none";
    playBoard.style.pointerEvents = "auto";
  }

  // allBox[randomBox].innerHTML
  // console.log(array)
}

//process result
function getIdVal(classname) {
  //#X
  //take out id depend on className .box1#X
  return document.querySelector(".box" + classname).id;
}

function checkIdSign(val1, val2, val3, sign) {
  if (getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign) {
    return true;
  }
}

function selectWinner() {
  if (
    checkIdSign(1, 2, 3, playerSign) ||
    checkIdSign(4, 5, 6, playerSign) ||
    checkIdSign(7, 8, 9, playerSign) ||
    checkIdSign(1, 4, 7, playerSign) ||
    checkIdSign(2, 5, 8, playerSign) ||
    checkIdSign(3, 6, 9, playerSign) ||
    checkIdSign(1, 5, 9, playerSign) ||
    checkIdSign(3, 5, 7, playerSign)
  ) {
    console.log(playerSign + " " + "is the winner");
    runBot = false;
    bot(runBot); //runBot = false then stop running bot;
    setTimeout(() => {
      playBoard.classList.remove("show");
      resultBox.classList.add("show");
    }, 500);
    wonText.innerHTML = `Player <p>${playerSign}</p> win the game`;
  } else {
    // check all id.. if all span has id means !== "" and no one won the game
    if (
      getIdVal(1) != "" &&
      getIdVal(2) != "" &&
      getIdVal(3) != "" &&
      getIdVal(4) != "" &&
      getIdVal(5) != "" &&
      getIdVal(6) != "" &&
      getIdVal(7) != "" &&
      getIdVal(8) != "" &&
      getIdVal(9) != ""
    ) {
      runBot = false;
      bot(runBot); //runBot = false then stop running bot;
      setTimeout(() => {
        playBoard.classList.remove("show");
        resultBox.classList.add("show");
      }, 500);
      wonText.innerHTML = `Match has been drawn!`;
    }
  }
}

replayBtn.onclick = () => {
  window.location.reload();
};
