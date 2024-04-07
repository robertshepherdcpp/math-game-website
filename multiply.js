document.addEventListener('DOMContentLoaded', function() {
    let score = 0;
    let currentAnswer = 0;

    function generateQuestion() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        currentAnswer = num1 * num2;
        document.getElementById('question').textContent = `What is ${num1} x ${num2}?`;
        document.getElementById('answer').value = '';
        document.getElementById('feedback').textContent = '';
        document.getElementById('nextRound').style.display = 'none';
    }

    document.getElementById('checkAnswer').addEventListener('click', function() {
        const userAnswer = parseInt(document.getElementById('answer').value, 10);
        if (userAnswer === currentAnswer) {
            document.getElementById('feedback').textContent = 'Correct!';
            document.getElementById('feedback').style.backgroundColor = 'green';
            score++;
        } else {
            document.getElementById('feedback').textContent = 'Wrong!';
            document.getElementById('feedback').style.backgroundColor = 'red';
            score = 0; // Reset score on wrong answer
        }
        document.getElementById('score').textContent = score;
        document.getElementById('nextRound').style.display = 'inline';
    });

    document.getElementById('nextRound').addEventListener('click', function() {
        generateQuestion();
    });

    generateQuestion(); // Initialize the first question
});
