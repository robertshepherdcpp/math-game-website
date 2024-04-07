document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const resetButton = document.getElementById('reset-button');

    const width = 8;
    const height = 8;
    const minesCount = 10;

    let mines = [];
    let flags = [];
    let revealed = [];

    initializeBoard();
    resetButton.addEventListener('click', initializeBoard);

    function initializeBoard() {
        board.innerHTML = '';
        mines = [];
        flags = [];
        revealed = [];

        // Create cells
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener('click', handleCellClick);
                cell.addEventListener('contextmenu', handleCellRightClick);
                board.appendChild(cell);
                revealed.push(false);
            }
        }

        // Place mines
        for (let i = 0; i < minesCount; i++) {
            let minePosition;
            do {
                minePosition = Math.floor(Math.random() * (width * height));
            } while (mines.includes(minePosition));
            mines.push(minePosition);
        }

        // Update cell content
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                const cellIndex = i * width + j;
                const cell = board.children[cellIndex];
                if (mines.includes(cellIndex)) {
                    cell.classList.add('mine');
                } else {
                    let surroundingMines = 0;
                    for (let k = -1; k <= 1; k++) {
                        for (let l = -1; l <= 1; l++) {
                            const neighborRow = i + k;
                            const neighborCol = j + l;
                            const neighborIndex = neighborRow * width + neighborCol;
                            if (mines.includes(neighborIndex)) {
                                surroundingMines++;
                            }
                        }
                    }
                    if (surroundingMines > 0) {
                        cell.textContent = surroundingMines;
                        cell.classList.add('number');
                    }
                }
            }
        }
    }

    function handleCellClick() {
        const row = parseInt(this.dataset.row);
        const col = parseInt(this.dataset.col);
        const index = row * width + col;
        if (mines.includes(index)) {
            revealMines();
            gameOver(false);
        } else {
            revealCell(row, col);
            if (checkWin()) {
                gameOver(true);
            }
        }
    }

    function handleCellRightClick(event) {
        event.preventDefault();
        const row = parseInt(this.dataset.row);
        const col = parseInt(this.dataset.col);
        const index = row * width + col;
        if (!revealed[index]) {
            if (!flags.includes(index)) {
                flags.push(index);
                this.classList.add('flagged');
            } else {
                flags.splice(flags.indexOf(index), 1);
                this.classList.remove('flagged');
            }
        }
    }

    function revealCell(row, col) {
        const index = row * width + col;
        if (!revealed[index] && !flags.includes(index)) {
            revealed[index] = true;
            const cell = board.children[index];
            cell.classList.remove('hidden');
            if (cell.textContent === '') {
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const neighborRow = row + i;
                        const neighborCol = col + j;
                        if (neighborRow >= 0 && neighborRow < height && neighborCol >= 0 && neighborCol < width) {
                            revealCell(neighborRow, neighborCol);
                        }
                    }
                }
            }
        }
    }

    function revealMines() {
        mines.forEach(mine => {
            const row = Math.floor(mine / width);
            const col = mine % width;
            const cell = board.children[mine];
            cell.classList.remove('hidden');
            cell.classList.add('mine');
        });
    }

    function checkWin() {
        for (let i = 0; i < width * height; i++) {
            if (!mines.includes(i) && !revealed[i]) {
                return false;
            }
        }
        return true;
    }

    function gameOver(win) {
        if (win) {
            alert('Congratulations! You win!');
        } else {
            alert('Game over! You lose!');
        }
        revealed.forEach((_, index) => {
            const cell = board.children[index];
            if (mines.includes(index)) {
                cell.classList.remove('hidden');
            }
            cell.removeEventListener('click', handleCellClick);
            cell.removeEventListener('contextmenu', handleCellRightClick);
        });
    }
});