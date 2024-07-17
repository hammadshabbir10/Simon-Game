/*
let gameSeq = [];
let userSeq = [];

let btns = ["yellow","green","purple","red"];
console.log("Hello");

let start = false;
let level = 0;

let highscore = 0;

let h2 = document.querySelector("h2");

let highscoreDisplay = document.querySelector("#highscore");
highscoreDisplay.innerText = `High Score: ${highscore}`;


document.addEventListener("keypress", function() {
    if(start == false)
    {
        console.log("Your game has started now");
        start = true;
        levelup();
    }

   
});

function levelup () {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let index = Math.floor(Math.random()*3);
    let btnindex = btns[index];
    let randcolor = document.querySelector(`.${btnindex}`);

    gameSeq.push(btnindex);
    console.log("Game",gameSeq);
    btnflash(randcolor);

}

function btnflash(b) {

    b.classList.add("flash");
    
    setTimeout(function() {
        b.classList.remove("flash")
    },250);

}

function userflash(b) {

    b.classList.add("userflash");
    
    setTimeout(function() {
        b.classList.remove("userflash")
    },250);

}

let allbtns = document.querySelectorAll(".btn");

for(btn of allbtns) {
    btn.addEventListener("click",btnPress);
}

function btnPress() {
    let btn = this;
    userflash(btn);

    let usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);
    console.log("User:",userSeq);

    checkAns(userSeq.length-1);

}

function checkAns(index) { 
    if(gameSeq[index] == userSeq[index]) 
    {
        if(gameSeq.length == userSeq.length)
       setTimeout(levelup,2000);
    }
    else 
    {
        if (level > highscore) {
            highscore = level;
            highscoreDisplay.innerText = `High Score: ${highscore}`;
        }

        
        h2.innerHTML = `Game Over :( <b>Your score is ${level} </b> <br><br> Press any key to start the game `;
        highscore = level;
        console.log(highscore);

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "cadetblue";
        },150);
        resetGame();

    }

}

function resetGame() {
    gameSeq = [];
    userSeq = [];
    level = 0;
    start = false;
}
*/

let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "green", "purple", "red"];
let start = false;
let level = 0;
let highscore = 0;

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const gameOverScreen = document.getElementById("game-over-screen");

const levelDisplay = document.getElementById("level");
const highscoreDisplay = document.getElementById("highscore");
const scoreDisplay = document.getElementById("score-display");
const gameHighscoreDisplay = document.getElementById("highscore-display");

const startButton = document.getElementById("start-button");
const usernameInput = document.getElementById("username");

startButton.addEventListener("click", function () {
    
    const username = usernameInput.value.trim();
    
    if (username) {
        startScreen.classList.add("hidden");
        gameScreen.classList.remove("hidden");
        gameScreen.classList.add("fade-in");
        document.addEventListener("keypress", startGame);
        usernameInput.value = ""; 
        startGame();
    } else {
        alert("Please enter your name to start the game.");
    }
});

function startGame() {
    if (!start) {
        start = true;
        level = 0;
        levelup();
    }
}

function levelup() {
    userSeq = [];
    level++;
    levelDisplay.innerText = level;

    let index = Math.floor(Math.random()*3);
    let btnindex = btns[index];
    let randcolor = document.querySelector(`.${btnindex}`);

    gameSeq.push(btnindex);
    setTimeout(() => {
        btnflash(randcolor);
    }, 1500);
}

function btnflash(b) {
    b.classList.add("flash");
    setTimeout(function () {
        b.classList.remove("flash");
    }, 250);
}

function userflash(b) {
    b.classList.add("userflash");
    setTimeout(function () {
        b.classList.remove("userflash");
    }, 250);
}

let allbtns = document.querySelectorAll(".btn");
allbtns.forEach(btn => {
    btn.addEventListener("click", btnPress);
});

function btnPress() {
    if (!start) return;
    let btn = this;
    userflash(btn);

    let usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);

    checkAns(userSeq.length - 1);
}

function checkAns(index) {
    if (gameSeq[index] === userSeq[index]) {
        if (gameSeq.length === userSeq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        if (level > highscore) {
            highscore = level;
            highscoreDisplay.innerText = `High Score: ${highscore}`;
        }
        gameScreen.classList.add("hidden");
        gameOverScreen.classList.remove("hidden");
        gameOverScreen.classList.add("fade-in");
        scoreDisplay.innerText = `Your score: ${level}`;
        gameHighscoreDisplay.innerText = `High Score: ${highscore}`;
        document.addEventListener("keypress", resetGame);
    }
}

function resetGame() {
    gameSeq = [];
    userSeq = [];
    level = 0;
    start = false;
    gameOverScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
    startScreen.classList.add("fade-in");
    levelDisplay.innerText = `Level 0`; // Reset level display
    document.removeEventListener("keypress", resetGame);
    document.removeEventListener("keypress", startGame);
}
