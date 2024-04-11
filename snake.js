document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const box = 20;
    let snake = [{x: 20 * box, y: 20 * box}];
    let score = 0;
    let food = {x: Math.floor(Math.random()*20) * box, y: Math.floor(Math.random()*20) * box};
    let d;

    document.addEventListener('keydown', direction);

    function direction(event) {
        let key = event.keyCode;
        if (key === 65 && d !== 'RIGHT') d = 'LEFT';
        else if (key === 87 && d !== 'DOWN') d = 'UP';
        else if (key === 68 && d !== 'LEFT') d = 'RIGHT';
        else if (key === 83 && d !== 'UP') d = 'DOWN';
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake.forEach(function(part, index) {
            ctx.fillStyle = (index === 0) ? 'green' : 'lightgreen';
            ctx.fillRect(part.x, part.y, box, box);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(part.x, part.y, box, box);
        });

        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, box, box);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (d === 'LEFT') snakeX -= box;
        if (d === 'UP') snakeY -= box;
        if (d === 'RIGHT') snakeX += box;
        if (d === 'DOWN') snakeY += box;

        if (snakeX === food.x && snakeY === food.y) {
            score++;
            food = {x: Math.floor(Math.random()*20) * box, y: Math.floor(Math.random()*20) * box};
        } else {
            snake.pop();
        }

        let newHead = {x: snakeX, y: snakeY};
        if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
            clearInterval(game);
        }

        snake.unshift(newHead);

        document.getElementById('score').innerHTML = 'Score: ' + score;
    }

    let game = setInterval(draw, 100);

    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x === array[i].x && head.y === array[i].y) {
                return true;
            }
        }
        return false;
    }
});