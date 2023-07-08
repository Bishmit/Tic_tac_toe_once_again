let audioTurn = new Audio("ting.mp3")
let MusicGameover = new Audio("gameover.mp3")
let turn = "X";
let gameover = false;
let count = 0;4

// Function to change the turn between X and O
const change_turn = () => {
  if (turn == 'X')
    return 'O';
  else
    return 'X';
}

// Function to check for a winner
const checkwinner = () => {
  let boxContent = document.querySelectorAll(".boxContent");
  let wins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  wins.forEach(e => {
    if (
      (boxContent[e[0]].innerText === boxContent[e[1]].innerText) &&
      (boxContent[e[1]].innerText === boxContent[e[2]].innerText) &&
      (boxContent[e[0]].innerText !== "")
    ) {
      count++;
      // Display the winner only once
      if (count == 1) {
        document.querySelector(".info").innerText =
          boxContent[e[0]].innerText + " Won";
      }
      gameover = true;
      MusicGameover.play(); 
      document.querySelector(".img").getElementsByTagName("img")[0].style.width = "100%";
    }
  });
}

// Function to check for a draw
const checkdraw = () => {
  let boxContent = document.querySelectorAll(".boxContent");
  let isDraw = true;

  // Check if any box is empty
  boxContent.forEach(box => {
    if (box.innerText === "") {
      isDraw = false;
    }
  });

  // If all boxes are filled and there is no winner, it's a draw
  if (isDraw && !gameover) {
    document.querySelector(".info").innerText = "It's a draw";
    gameover = true;
    MusicGameover.play(); 
  }
};

// Get the info element
const info = document.querySelector(".info");

// Game logic
let boxes = document.querySelectorAll(".btn");
Array.from(boxes).forEach(element => {

  let boxContent = element.querySelector(".boxContent");
  element.addEventListener('click', () => {
    if (boxContent.innerText == '') {
      boxContent.innerText = turn;
      turn = change_turn();
      audioTurn.play();
      checkwinner();
      checkdraw();
      if (!gameover) {
        info.innerText = "Turn for " + turn;
      }
    }
  });
});

// Reset button event listener
let reset = document.getElementById('reset');
reset.addEventListener('click', () => {
  let boxContent = document.querySelectorAll(".boxContent");
  Array.from(boxContent).forEach(element => {
    element.innerText = "";
  });

  // Reset game variables
  turn = "X";
  gameover = false;
  count = 0;

  // Reset info and image width
  document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
  document.querySelector(".img").getElementsByTagName("img")[0].style.width = "0%";
});
