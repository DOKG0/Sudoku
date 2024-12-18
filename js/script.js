let selectedCell = null;
let selectedNumber = null;
let timer = null;
let seconds = 0;
let currentPuzzle = [];
let solution = [];
let nickname = '';
let difficulty = 'normal';
let hintsRemaining = 3;

const DIFFICULTY_SETTINGS = {
    easy: {
        cellsToRemove: 30,
        hints: 5
    },
    normal: {
        cellsToRemove: 40,
        hints: 3
    },
    hard: {
        cellsToRemove: 50,
        hints: 1
    }
};

// Generar un puzzle de Sudoku valido
function generateSudoku() {
    const puzzle = Array(9).fill().map(() => Array(9).fill(0));
    const sol = Array(9).fill().map(() => Array(9).fill(0));
    
    fillDiagonal(puzzle);
    solveSudoku(puzzle);
    
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            sol[i][j] = puzzle[i][j];
        }
    }
    
    const cellsToRemove = DIFFICULTY_SETTINGS[difficulty].cellsToRemove;
    for(let i = 0; i < cellsToRemove; i++) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        puzzle[row][col] = 0;
    }
    
    currentPuzzle = puzzle;
    solution = sol;
    hintsRemaining = DIFFICULTY_SETTINGS[difficulty].hints;
    updateHintButton();
}

// Actualizar el botón de ayuda
function updateHintButton() {
    const hintBtn = document.querySelector('.hint-btn');
    hintBtn.textContent = `Ayuda (${hintsRemaining})`;
    hintBtn.disabled = hintsRemaining <= 0;
}

// Funcion de ayuda
function getHint() {
    if (!selectedCell || selectedCell.classList.contains('fixed') || hintsRemaining <= 0) {
        return;
    }

    const row = parseInt(selectedCell.dataset.row);
    const col = parseInt(selectedCell.dataset.col);
    selectedCell.textContent = solution[row][col];
    selectedCell.classList.add('hint');
    selectedCell.classList.add('fixed');
    
    hintsRemaining--;
    updateHintButton();
}

// Iniciar el juego
function startGame() {
    nickname = document.getElementById('nickname').value.trim();
    if(!nickname) {
        alert('Por favor ingresa un nickname');
        return;
    }
    
    difficulty = document.getElementById('difficulty').value;
    
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    document.getElementById('playerName').textContent = nickname;
    document.getElementById('difficultyDisplay').textContent = 
        difficulty === 'easy' ? 'Principiante' : 
        difficulty === 'normal' ? 'Normal' : 'Difícil';
    
    generateSudoku();
    renderBoard();
    startTimer();
    displayScores();
}

// Renderizar el tablero
function renderBoard() {
    const board = document.getElementById('sudoku-board');
    board.innerHTML = '';
    
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if(currentPuzzle[i][j] !== 0) {
                cell.textContent = currentPuzzle[i][j];
                cell.classList.add('fixed');
            }
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', selectCell);
            board.appendChild(cell);
        }
    }
}

// Seleccionar una celda
function selectCell(e) {
    if(e.target.classList.contains('fixed')) return;
    
    if(selectedCell) {
        selectedCell.classList.remove('selected');
    }
    
    selectedCell = e.target;
    selectedCell.classList.add('selected');
}

// Seleccionar un numero
function selectNumber(num) {
    if(!selectedCell || selectedCell.classList.contains('fixed')) return;
    
    selectedCell.textContent = num === 0 ? '' : num;
    selectedCell.classList.remove('error');
}

// Iniciar el timer
function startTimer() {
    if(timer) clearInterval(timer);
    seconds = 0;
    timer = setInterval(updateTimer, 1000);
}

// Actualizar el timer
function updateTimer() {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    document.getElementById('timer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Nuevo juego
function newGame() {
    if(confirm('¿Estás seguro de que quieres comenzar un nuevo juego?')) {
        generateSudoku();
        renderBoard();
        startTimer();
    }
}

// Verificar la solucion
function checkSolution() {
    let isComplete = true;
    let isCorrect = true;
    const cells = document.querySelectorAll('.cell');
    
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const value = cell.textContent ? parseInt(cell.textContent) : 0;
        
        if(value === 0) {
            isComplete = false;
        } else if(value !== solution[row][col]) {
            isCorrect = false;
            cell.classList.add('error');
        }
    });
    
    if(!isComplete) {
        alert('¡Completa todas las celdas!');
        return;
    }
    
    if(isCorrect) {
        clearInterval(timer);
        const score = calculateScore();
        saveScore(score);
        alert(`¡Felicitaciones! Has completado el Sudoku en ${document.getElementById('timer').textContent}`);
    } else {
        alert('Hay errores en tu solución. ¡Sigue intentando!');
    }
}

// Calcular el puntaje
function calculateScore() {
    let baseScore = Math.max(1000 - seconds, 100);
    
    const multiplier = 
        difficulty === 'easy' ? 1 :
        difficulty === 'normal' ? 1.5 :
        2;
    
    return Math.floor(baseScore * multiplier);
}

// Guardar el puntaje
function saveScore(score) {
    let scores = JSON.parse(localStorage.getItem('sudokuScores') || '[]');
    scores.push({
        nickname: nickname,
        difficulty: difficulty,
        time: document.getElementById('timer').textContent,
        score: score
    });
    
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 10);
    
    localStorage.setItem('sudokuScores', JSON.stringify(scores));
    displayScores();
}

// Mostrar los puntajes
function displayScores() {
    const scoresDiv = document.getElementById('scores');
    const scores = JSON.parse(localStorage.getItem('sudokuScores') || '[]');
    
    if (scores.length === 0) {
        scoresDiv.innerHTML = '<div class="no-scores">No hay puntajes registrados</div>';
        return;
    }
    
    scoresDiv.innerHTML = scores.map((score, index) => `
        <div class="score-item">
            <span>${index + 1}.</span>
            <span>${score.nickname}</span>
            <span>${score.difficulty === 'easy' ? 'Principiante' : 
                   score.difficulty === 'normal' ? 'Normal' : 'Difícil'}</span>
            <span>${score.score} pts (${score.time})</span>
        </div>
    `).join('');
}

function clearScores() {
    if(confirm('¿Estás seguro de que quieres borrar todos los puntajes? Esta acción no se puede deshacer.')) {
        localStorage.removeItem('sudokuScores');
        displayScores();
        alert('Tabla de puntajes borrada correctamente');
    }
}

// Funciones de generacion del Sudoku
function fillDiagonal(puzzle) {
    for(let i = 0; i < 9; i += 3) {
        fillBox(puzzle, i, i);
    }
}

function fillBox(puzzle, row, col) {
    let num;
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            do {
                num = Math.floor(Math.random() * 9) + 1;
            } while(!isSafe(puzzle, row + i, col + j, num));
            puzzle[row + i][col + j] = num;
        }
    }
}

function isSafe(puzzle, row, col, num) {
    for(let x = 0; x < 9; x++) {
        if(puzzle[row][x] === num) return false;
    }
    
    for(let x = 0; x < 9; x++) {
        if(puzzle[x][col] === num) return false;
    }
    
    const startRow = row - row % 3;
    const startCol = col - col % 3;
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(puzzle[i + startRow][j + startCol] === num) return false;
        }
    }
    
    return true;
}

function solveSudoku(puzzle) {
    let row = 0;
    let col = 0;
    let isEmpty = false;
    
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            if(puzzle[i][j] === 0) {
                row = i;
                col = j;
                isEmpty = true;
                break;
            }
        }
        if(isEmpty) break;
    }
    
    if(!isEmpty) return true;
    
    for(let num = 1; num <= 9; num++) {
        if(isSafe(puzzle, row, col, num)) {
            puzzle[row][col] = num;
            if(solveSudoku(puzzle)) return true;
            puzzle[row][col] = 0;
        }
    }
    return false;
}

function changeDifficulty() {
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('welcomeScreen').style.display = 'block';
}