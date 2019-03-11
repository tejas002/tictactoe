/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

var grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let val = 1;
var matchOver = false;
var compMode = false;

function initializeGrid() {
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';

    for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum % 2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if (gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="' + colIdx + '" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}


function onBoxClick() {
    if (matchOver) {
        alertBox('gameOver');
        return;
    }

    // emptyIndex();
    if (compMode && turn == 'O') {
        let rValue = compRandomAlgo();
        let colVal = rValue % 3;
        let rowVal = Math.floor(rValue / 3);
        let nVal = toggleValue();
        grid[rowVal][colVal] = nVal;
        renderMainGrid();
        addClickHandlers();
        winnerCheck();
        toggleTurn();
    }
    else {
        var rowIdx = this.getAttribute("rowIdx");
        var colIdx = this.getAttribute("colIdx");
        let emptyBox = checkGrid(grid, rowIdx, colIdx);
        if (emptyBox) return;
        let newValue = toggleValue();
        grid[colIdx][rowIdx] = newValue;
        // checkGrid(grid,rowIdx,colIdx);
        renderMainGrid();
        addClickHandlers();
        winnerCheck();
        if (compMode && !matchOver) {
            toggleTurn();
            onBoxClick();
        }
  }

}

function compRandomAlgo(){
    let list = emptyIndex();
    let randValue = list[Math.floor(Math.random() * list.length)];
    return randValue;
}

function emptyIndex() {
    let newGrid = grid.toString().split(',');
    var indexes = [], i;
    for (i = 0; i < newGrid.length; i++)
        if (newGrid[i] == '0')
            indexes.push(i);
    return indexes;

}

//Getting Player Name
function getWinnerPlayer(a, b) {
    if (a == 1 || b == 1) {
        return 'Player 1';
    }
    else if ((a == 2 || b == 2) && !compMode) {
        return 'Player 2';
    }
    else if (compMode) {
        return 'Computer';
    }
}

//Checking for Winner
function winnerCheck() {
    checkOne = checkGridHorVer();
    checkTwo = checkGridDiagnols();
    winnerPLayer = getWinnerPlayer(checkOne, checkTwo);
    if (checkOne) {
        matchOver = true;
        setTimeout(function () { alertBox('winner', winnerPLayer); }, 100);
        return true;
    }
    else if (checkTwo) {
        matchOver = true;
        setTimeout(function () { alertBox('winner', winnerPLayer); }, 100);
        return true;
    }
    if (emptyIndex().length == 0) {
        matchOver = true;
        setTimeout(function () { alertBox('draw'); }, 100);
        return false;
    }
    return false;
}


function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}



//Toggling Value
function toggleValue() {
    if (emptyIndex().length == 9) {
        return val;
    }
    if (val == 1) {
        val = 2;
    }
    else if (val == 2) {
        val = 1;
    }
    return val;
}

//Toggling Turn
function toggleTurn() {
    if (turn == 'X') {
        turn = 'O';
    }
    else if (turn == 'O') {
        turn = 'X';
    }
    return turn;
}


//Check if the grid has value to prevent override
function checkGrid(g, r, c) {
    if (g[c][r]) {
        alertBox('emptyBox')
        return true;
    }
    return false;
}

//Alert or Confirm Box
function alertBox(val, winner) {
    switch (val) {
        case 'gameOver':
            alert('Game is Over');
            break;
        case 'emptyBox':
            alert("Hey, Click on empty box");
            break;
        case 'sureBox':
            return confirm("Are you Sure!!");
            break;
        case 'winner':
            return confirm("Match Over. The winner is " + winner);
            break;
        case 'playerTurn':
            alert('You will play  with computer . You turn first !!');
            break;
        case 'draw':
            alert('Match Draw !!');
            break;
        default:
            break;
    }

}

//checking horizontal or vertical full match in gird
function checkGridHorVer() {
    // const resetButton  = document.getElementById("reset"); 
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        if (grid[colIdx][0] && grid[colIdx][0] == grid[colIdx][1] && grid[colIdx][1] == grid[colIdx][2]) {
            return grid[colIdx][0];
        }
        if (grid[0][colIdx] && grid[0][colIdx] == grid[1][colIdx] && grid[1][colIdx] == grid[2][colIdx]) {
            return grid[0][colIdx];
        }
    }

}

//checking grid diagnols
function checkGridDiagnols() {
    // const resetButton  = document.getElementById("reset"); 
    if (grid[0][0] && grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2]) {
        return grid[0][0];
    }
    if (grid[0][2] && grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0]) {
        return grid[0][2];
    }

}

//Resetting the Game
function resetGame() {
    let choice = alertBox('sureBox');
    if (!choice) return;
    grid = [];
    compMode=false;
    val = 1;
    turn = 'X';
    matchOver = false;
    init();
}

function computerGame() {
    resetGame();
    compMode = true;
    alertBox('playerTurn');
}

function init() {
    initializeGrid();
    renderMainGrid();
    addClickHandlers();
}

init();