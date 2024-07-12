console.log("Welcome to Tic Tac Toe");

let music = new Audio("assets/music.mp3");
let audioTurn = new Audio("assets/ting.mp3");
let gameover = new Audio("assets/gameover.mp3");
let turn = "X";
let isgameover = false;

// Function to reset scores
const resetScores = () => {
    localStorage.setItem('score1', 0);
    localStorage.setItem('score2', 0);
    document.getElementById('score1').innerText = 0;
    document.getElementById('score2').innerText = 0;
}

// Retrieve player names from localStorage
const player1 = localStorage.getItem('player1') || 'Player 1';
const player2 = localStorage.getItem('player2') || 'Player 2';
let score1 = parseInt(localStorage.getItem('score1')) || 0;
let score2 = parseInt(localStorage.getItem('score2')) || 0;
document.querySelector('.info').innerText = "Turn for "+player1;


// Function to set player names in the DOM
const setPlayerNames = (p1, p2) => {
    document.getElementById('name1').innerText = `${p1} =>`;
    document.getElementById('name2').innerText = `${p2} =>`;
}

// Check if player names have changed
if (player1 !== localStorage.getItem('player1') || player2 !== localStorage.getItem('player2')) {
    localStorage.setItem('player1', player1);
    localStorage.setItem('player2', player2);
    resetScores();
}

// Set player names and scores in the DOM
setPlayerNames(player1, player2);
document.getElementById('score1').innerText = score1;
document.getElementById('score2').innerText = score2;

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
}

// Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")) {
            document.querySelector('.info').innerText = (boxtext[e[0]].innerText=='X'?player1:player2) + " Won";
            isgameover = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            gameover.play()
            
            // Get screen width
            let screenWidth = window.innerWidth;
            
            // Check if screen width is less than a certain value (phone dimensions)
            
                // Color the winning boxes sky blue
                e.slice(0, 3).forEach(index => {
                    boxes[index].style.backgroundColor = 'rgba(160, 221, 245, 0.631)';
                });
            

            // Update score
            if (boxtext[e[0]].innerText === "X") {
                score1++;
                localStorage.setItem('score1', score1);
                document.getElementById('score1').innerText = score1;
            } else {
                score2++;
                localStorage.setItem('score2', score2);
                document.getElementById('score2').innerText = score2;
            }
        }
    });
}


// Function to check for a draw
const checkDraw = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let draw = true;
    Array.from(boxtext).forEach(element => {
        if (element.innerText === '') {
            draw = false;
        }
    });
    if (draw && !isgameover) {
        document.querySelector('.info').innerText = "It's a Draw";
        isgameover = true;
    }
}

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !isgameover) {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            checkDraw();
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + (turn === "X" ? player1 : player2);
            }
        }
    });
});

// Add onclick listener to reset button
document.getElementById('reset').addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + player1;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";

    // Reset all box colors to default
    Array.from(boxes).forEach(box => {
        box.style.backgroundColor = '';
    });
});


document.getElementById('back').addEventListener('click',(e)=>{
    window.location.href = 'index.html';
})