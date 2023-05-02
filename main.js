import {
    initialField,
    initialTable,
    nextGeneration,
    renderField,
} from "./helper.js";
import {gameState} from "./config.js";

export let table = [];
let intervalId = null;
let generation = 0;
let isPlaying = false;

const field = document.querySelector(".field");
const initialData = document.querySelectorAll(".initialData");
initialData[0][0].value = gameState.numCols;
initialData[0][1].value = gameState.numRows;
initialData[0][2].value = gameState.interval;
const gen = document.getElementById("generation");

const reset = () => {
    table = []
    generation = 0
    gen.innerHTML = "Gen: " + generation;
}
const randomButtonHandle = () => {
    reset()
    initialTable(true);
    initialField();
};
const startGame = () => {
    isPlaying = true;
    initialData[0][0].disabled = true;
    initialData[0][1].disabled = true;
    initialData[0][2].disabled = true;
    initialData[0][3].disabled = true;
    field.removeEventListener("click", tableFillHandle);

    intervalId = setInterval(() => {
        const newTable = nextGeneration(table);
        renderField(newTable);
        table = newTable;
        generation++;
        gen.innerHTML = "Gen: " + generation;
    }, gameState.interval);
};
const stopGame = () => {
    isPlaying = false;
    clearInterval(intervalId);
    intervalId = null;
    initialData[0][0].disabled = false;
    initialData[0][1].disabled = false;
    initialData[0][2].disabled = false;
    initialData[0][3].disabled = false;
    field.addEventListener("click", tableFillHandle);
};

const tableFillHandle = (event) => {
    const cell = event.target;
    const cellTag = cell.tagName.toLowerCase();
    if (cellTag != "td") {
        return;
    }
    const i = cell.parentNode.rowIndex;
    const j = cell.cellIndex;
    table[i][j] = table[i][j] ? 0 : 1;
    const aliveState = document.getElementById("aliveState");
    const deadState = document.getElementById("deadState");
    if (table[i][j]) {
        deadState.rows[i].cells[j].style.opacity = "0";
        aliveState.rows[i].cells[j].style.opacity = "1";
    } else {
        aliveState.rows[i].cells[j].style.opacity = "0";
        deadState.rows[i].cells[j].style.opacity = "1";
    }
};
const intervalChangeHandle = (event) => {
    gameState.interval = event.target.value;
};
const gameGoHandle = () => {
    if (isPlaying) {
        stopGame();
        initialData[0][4].innerHTML = "Play";
    } else {
        startGame();
        initialData[0][4].innerHTML = "Pause";
    }
};

const fieldColsHandle = (event) => {
    reset()
    gameState.numCols = event.target.value;
    initialTable(false);
    initialField();
};
const fieldRowsHandle = (event) => {
    reset()
    gameState.numRows = event.target.value;
    initialTable(false);
    initialField();
};

field.addEventListener("click", tableFillHandle);
initialData[0][0].addEventListener("change", fieldColsHandle);
initialData[0][1].addEventListener("change", fieldRowsHandle);
initialData[0][2].addEventListener("change", intervalChangeHandle);
initialData[0][3].addEventListener("click", randomButtonHandle);
initialData[0][4].addEventListener("click", gameGoHandle);

initialTable(false);
initialField();
