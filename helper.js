import {gameState} from "./config.js"
import {table} from "./main.js";
const {minCellSize, interval, cellClass, deadColor, aliveColor, numCols, numRows} = gameState
export const initialTable = () => {
    for (let i = 0; i < numRows; i++) {
        table[i] = [];
        for (let j = 0; j < numCols; j++) {
            table[i][j] = Math.round(Math.random()); // Случайное начальное состояние
        }
    }
}
export const initialField = () => {
    const clientWidth = document.documentElement.clientWidth
    const size = (clientWidth - 20) / numCols - 2
    const cellSize = size > minCellSize ? size + "px" : minCellSize + "px"
    const field = document.querySelector(".field");
    const tableAlive = document.createElement("table");
    tableAlive.id = "aliveState";
    const tableDead = document.createElement("table");
    tableDead.id = "deadState";

    for (let i = 0; i < numRows; i++) {
        const rowAlive = tableAlive.insertRow();
        const rowDead = tableDead.insertRow();
        for (let j = 0; j < numCols; j++) {
            const cellAlive = rowAlive.insertCell();
            cellAlive.className = cellClass;
            cellAlive.style.width = cellSize
            cellAlive.style.minWidth = cellSize
            cellAlive.style.height = cellSize
            cellAlive.style.minHeight = cellSize
            cellAlive.style.backgroundColor = aliveColor;
            const cellDead = rowDead.insertCell();
            cellDead.className = cellClass;
            cellDead.style.width = cellSize
            cellDead.style.minWidth = cellSize
            cellDead.style.height = cellSize
            cellDead.style.minHeight = cellSize
            cellDead.style.backgroundColor = deadColor;

            if (table[i][j]) {
                cellDead.style.visibility = "hidden";
                cellAlive.style.visibility = "visible";
            } else {
                cellDead.style.visibility = "visible";
                cellAlive.style.visibility = "hidden";
            }
        }
    }

    field.append(tableAlive);
    field.append(tableDead);
}
export const renderField = (newState) => {
    const aliveState = document.getElementById("aliveState");
    const deadState = document.getElementById("deadState");

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (newState[i][j] !== table[i][j]) {
                deadState.rows[i].cells[j].style.visibility = newState[i][j]
                    ? "hidden"
                    : "visible";
                aliveState.rows[i].cells[j].style.visibility = newState[i][j]
                    ? "visible"
                    : "hidden";
            }
        }
    }
}


export const nextGeneration = (state) => {
    const numRows = state.length;
    const numCols = state[0].length;
    const checkBorders = (row, col) => {
        return row >= 0 && col >= 0 && row < numRows && col < numCols;
    }
    const countAliveNeighbours = (row, col) => {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const newRow = row + i;
                const newCol = col + j;
                if (checkBorders(newRow, newCol) && state[newRow][newCol]) {
                    count++;
                }
            }
        }
        return count;
    }
    const newState = [];
    for (let i = 0; i < numRows; i++) {
        newState[i] = [];
        for (let j = 0; j < numCols; j++) {
            const count = countAliveNeighbours(i, j);
            if (state[i][j] === 1 && (count === 2 || count === 3)) {
                newState[i][j] = 1;
            } else if (state[i][j] === 0 && count === 3) {
                newState[i][j] = 1;
            } else {
                newState[i][j] = 0;
            }
        }
    }
    return newState;
}