let timerInterval;
let totalTime = 0;
let remainingTime = 0;

const timerDisplay = document.getElementById('timer');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const restartButton = document.getElementById('restart');

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateDisplay() {
    timerDisplay.textContent = formatTime(remainingTime);
}

function startTimer() {
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    if (isNaN(minutes) || isNaN(seconds)) {
        remainingTime = 0;
        updateDisplay();
        return;
    }

    totalTime = remainingTime = minutes * 60 + seconds;

    if (timerInterval) {
        clearInterval(timerInterval);
    }

    timerInterval = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
        } else {
            remainingTime--;
            updateDisplay();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    remainingTime = totalTime;
    updateDisplay();
}

function restartTimer() {
    stopTimer();
    startTimer();
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
restartButton.addEventListener('click', restartTimer);

updateDisplay();

// Add keyboard event listeners
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'Enter': // Start timer
            startTimer();
            break;
        case 's': // Stop timer
            stopTimer();
            break;
        case 'r': // Reset timer
            resetTimer();
            break;
        case 't': // Restart timer
            restartTimer();
            break;
        default:
            break;
    }
});
