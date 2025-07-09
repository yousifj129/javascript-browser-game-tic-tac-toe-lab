let board = ['', '', '', '', '', '', '', '', '']
let turn = "X"
let previousTurn = "O"
let winner = ""
let tie = false
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]
function init() {


    /*-------------------------------- Constants --------------------------------*/


    /*---------------------------- Variables (state) ----------------------------*/



    /*------------------------ Cached Element References ------------------------*/
    const squareEls = document.querySelectorAll(".sqr")
    const messageEl = document.querySelector("#message")


    /*-------------------------------- Functions --------------------------------*/
    function haveSameElements(arr1, arr2) {
        for (let i = 0; i < arr2.length; i++) {
            if (!arr1.includes(arr2[i])) {
                return false;
            }
        }
        return true;
    }
    function checkForWinnerAndTie() {
        let a = []
        tie = true;
        for (let i = 0; i < board.length; i++) {
            if (board[i] == previousTurn) {
                a.push(i);
            }
        }
        console.log(a)
        winningCombos.forEach(function (e) {
            if (haveSameElements(a.sort(), e.sort())) {
                console.log("done")
                winner = previousTurn
                tie = false;
            }
        })
        for (let i = 0; i < board.length; i++) {
            if (board[i] == "") {
                tie = false;
            }
        }

    }
    function placePiece(index) {
        board[index] = turn
        previousTurn = turn
        if (turn == "X") {
            turn = "O"
        }
        else {

            turn = "X"
        }
        checkForWinnerAndTie()




    }
    function handleClick(event) {
        if (winner != "" || tie == true) {
            return;
        }
        const squareIndex = event.target.id
        console.log(squareIndex)
        if (board[squareIndex] == "X" || board[squareIndex] == "O") {
            return;
        }
        placePiece(squareIndex)
        render()
    }
    function updateMessage() {
        if (winner == false && tie == false) {
            messageEl.textContent = `it's ${turn} turn`
        }
        else if (tie == true) {
            messageEl.textContent = `it's a tie!`
        }
        if (winner != "") {
            messageEl.textContent = `Player ${winner} wins!`
        }
        else if (tie) {
            messageEl.textContent = `it's a tie!`
        }

    }
    function updateBoard() {
        for (let i = 0; i < board.length; i++) {
            const element = squareEls[i];
            element.textContent = board[i]
        }
    }
    function render() {
        updateBoard()
        updateMessage()
        squareEls.forEach(function (e) {
            e.addEventListener("click", handleClick)
        })
    }

    function resetGame() {
        board = ['', '', '', '', '', '', '', '', '']
        turn = "X"
        previousTurn = "O"
        winner = ""
        tie = false
        updateBoard()
        updateMessage()
    }


    /*----------------------------- Event Listeners -----------------------------*/
    render()
    document.querySelector("#reset").addEventListener("click", resetGame)
}


document.addEventListener("DOMContentLoaded", init)
