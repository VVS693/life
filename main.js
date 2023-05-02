import {initialField, initialTable, nextGeneration, renderField} from "./helper.js";
import {gameState} from "./config.js"

export let table = []
let intervalId = null;
let generation = 0
let isPlaying = false

const randomButtonHandle = () => {
    initialTable(true)
    initialField()
}
const startGame = () => {
    isPlaying = true
    initialData[0][3].disabled = true
    initialData[0][4].disabled = true
    initialData[0][5].disabled = false
    field.removeEventListener("click", tableFillHandle)

    intervalId = setInterval(() => {
        const newTable = nextGeneration(table);
        renderField(newTable);
        table = newTable;
        generation++
        console.log(generation)
    }, gameState.interval);
}
const stopGame = () => {
    clearInterval(intervalId);
    intervalId = null;
    initialData[0][3].disabled = false
    initialData[0][4].disabled = false
    initialData[0][5].disabled = true
    field.addEventListener("click", tableFillHandle)
}

const tableFillHandle = (event) => {
    const cell = event.target
    const cellTag = cell.tagName.toLowerCase()
    if (cellTag != "td") {
        return
    }
    const i = cell.parentNode.rowIndex
    const j = cell.cellIndex
    table[i][j] = table[i][j] ? 0 : 1
    const aliveState = document.getElementById("aliveState");
    const deadState = document.getElementById("deadState");
    if (table[i][j]) {
        deadState.rows[i].cells[j].style.opacity = "0"
        aliveState.rows[i].cells[j].style.opacity = "1"
    } else {
        aliveState.rows[i].cells[j].style.opacity = "0"
        deadState.rows[i].cells[j].style.opacity = "1"
    }
}

const intervalChangeHandle = (event) => {
    stopGame()
    gameState.interval = event.target.value
    startGame()
}
const field = document.querySelector(".field")
field.addEventListener("click", tableFillHandle)

const initialData = document.querySelectorAll(".initialData")
initialData[0][0].value = gameState.numCols
initialData[0][1].value = gameState.numRows
initialData[0][2].value = gameState.interval


initialData[0][2].addEventListener("change", intervalChangeHandle)
initialData[0][3].addEventListener("click", randomButtonHandle)
initialData[0][4].addEventListener("click", startGame)
initialData[0][5].addEventListener("click", stopGame)


initialTable(false)
initialField()
