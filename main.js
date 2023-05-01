
import {initialField, initialTable, nextGeneration, renderField} from "./helper.js";
import {gameState} from "./config.js"
const {interval} = gameState
export let table = []
let intervalId = null;
let generation = 0
const startGame = () => {
    intervalId = setInterval(() => {
        const newTable = nextGeneration(table);
        renderField(newTable);
        table = newTable;
        generation++
        console.log(generation)
    }, interval);
}

const stopGame = () => {
    clearInterval(intervalId);
    intervalId = null;
}

// document.getElementById('start').addEventListener('click', startGame);
// document.getElementById('stop').addEventListener('click', stopGame);

initialTable()
initialField()
startGame();
