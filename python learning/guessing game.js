let correctAnswer = 50;
let count = 0;
const maxAttempts = 10;

function makeGuess() {
    const guessInput = document.getElementById('guessInput');
    const message = document.getElementById('message');
    const attempts = document.getElementById('attempts');
    const guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        message.textContent = "Please enter a valid number between 1 and 100.";
        return;
    }

    count += 1;

    if (guess < correctAnswer) {
        message.textContent = "Too low!";
    } else if (guess > correctAnswer) {
        message.textContent = "Too high!";
    } else {
        message.textContent = "You win!";
        guessInput.disabled = true;
        return;
    }

    if (count >= maxAttempts) {
        message.textContent = `You lose! The correct number was ${correctAnswer}.`;
        guessInput.disabled = true;
    }

    attempts.textContent = `Attempts: ${count}/${maxAttempts}`;
}