function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }


const body = document.querySelector("body");
const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");

startBtn.addEventListener("click", changeBackground);
stopBtn.addEventListener("click", stopChangeBackground);

let changeBg;

function changeBackground() {
    changeBg = setInterval(changeColor, 1000);
    startBtn.disabled = true; 
    stopBtn.disabled = false;
}

function stopChangeBackground() {
    const stopChange = clearInterval(changeBg);
    startBtn.disabled = false; 
    stopBtn.disabled = true;
}

function changeColor(event) {
  let randomColor = getRandomHexColor();
  body.style.backgroundColor = randomColor;
}