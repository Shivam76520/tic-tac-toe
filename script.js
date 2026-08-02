// ================================
// Modern Tic Tac Toe
// ================================

// Elements
const cells = document.querySelectorAll(".cell");
const playerText = document.getElementById("player");
const restartBtn = document.getElementById("restart");
const popup = document.getElementById("popup");
const winnerText = document.getElementById("winnerText");
const playAgainBtn = document.getElementById("playAgain");

// Game Variables
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

// Winning Patterns
const winningPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
];

// ================================
// Cell Click
// ================================

cells.forEach(cell => {

    cell.addEventListener("click", () => {

        const index = cell.dataset.index;

        if(board[index] !== "" || gameOver)
            return;

        board[index] = currentPlayer;

        cell.textContent = currentPlayer;

        if(currentPlayer === "X"){
            cell.classList.add("x");
        }
        else{
            cell.classList.add("o");
        }

        if(checkWinner()){
            return;
        }

        if(checkDraw()){
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";

        playerText.textContent = currentPlayer;

    });

});

// ================================
// Winner Check
// ================================

function checkWinner(){

    for(let pattern of winningPatterns){

        const [a,b,c] = pattern;

        if(
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ){

            gameOver = true;

            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");

            setTimeout(()=>{

                winnerText.textContent =
                `🎉 Player ${board[a]} Wins!`;

                popup.classList.add("show");

                launchConfetti();

            },500);

            return true;
        }

    }

    return false;

}

// ================================
// Draw Check
// ================================

function checkDraw(){

    if(board.every(cell => cell !== "")){

        gameOver = true;

        setTimeout(()=>{

            winnerText.textContent = "🤝 Match Draw";

            popup.classList.add("show");

        },500);

        return true;
    }

    return false;

}

// ================================
// Reset Game
// ================================

function resetGame(){

    board = ["","","","","","","","",""];

    currentPlayer = "X";

    gameOver = false;

    playerText.textContent = currentPlayer;

    popup.classList.remove("show");

    cells.forEach(cell=>{

        cell.textContent="";

        cell.classList.remove("x");
        cell.classList.remove("o");
        cell.classList.remove("win");

    });

}

// Restart Button
restartBtn.addEventListener("click",resetGame);

// Popup Button
playAgainBtn.addEventListener("click",resetGame);

// ================================
// Simple Confetti Effect
// ================================

function launchConfetti(){

    for(let i=0;i<120;i++){

        const confetti=document.createElement("div");

        confetti.style.position="fixed";
        confetti.style.width="10px";
        confetti.style.height="10px";
        confetti.style.left=Math.random()*100+"vw";
        confetti.style.top="-20px";

        confetti.style.background=
        `hsl(${Math.random()*360},100%,50%)`;

        confetti.style.borderRadius="50%";

        confetti.style.pointerEvents="none";

        confetti.style.zIndex="9999";

        document.body.appendChild(confetti);

        const duration=Math.random()*3+2;

        confetti.animate(

            [

                {
                    transform:"translateY(0px) rotate(0deg)",
                    opacity:1
                },

                {
                    transform:`translateY(110vh) rotate(${Math.random()*720}deg)`,
                    opacity:0
                }

            ],

            {

                duration:duration*1000,

                easing:"linear"

            }

        );

        setTimeout(()=>{

            confetti.remove();

        },duration*1000);

    }

}