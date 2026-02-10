// Game Constants
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game Variables
let score = 0;
let lives = 3;
let level = 1;
let gameOver = false;

// Player (Frog)
const player = {
    x: canvas.width / 2,
    y: canvas.height - 80,
    width: 30,
    height: 30,
    speed: 4,
    color: '#2ecc71'
};

// Input handling
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    if (e.key === ' ') {
        e.preventDefault();
        shoot();
    }
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Bullets
let bullets = [];

function shoot() {
    if (!gameOver) {
        bullets.push({
            x: player.x + player.width / 2,
            y: player.y,
            width: 5,
            height: 15,
            speed: 6,
            color: '#f39c12'
        });
    }
}

// Flies
let flies = [];

function spawnFly() {
    const side = Math.random() < 0.5 ? 0 : 1;
    const fly = {
        x: side === 0 ? Math.random() * canvas.width : Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 2),
        width: 15,
        height: 15,
        speed: 1.5 + level * 0.2,
        color: '#e74c3c'
    };
    flies.push(fly);
}

// Spawn initial flies
for (let i = 0; i < 2; i++) {
    spawnFly();
}

// Update game state
function update() {
    if (gameOver) return;

    // Move player
    if (keys['ArrowUp'] || keys['w'] || keys['W']) player.y -= player.speed;
    if (keys['ArrowDown'] || keys['s'] || keys['S']) player.y += player.speed;
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['d'] || keys['D']) player.x += player.speed;

    // Boundary checking
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;

    // Update bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y -= bullets[i].speed;
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
        }
    }

    // Update flies and AI
    for (let i = flies.length - 1; i >= 0; i--) {
        const fly = flies[i];
        
        // Chase player
        const dx = player.x - fly.x;
        const dy = player.y - fly.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
            fly.x += (dx / distance) * fly.speed;
            fly.y += (dy / distance) * fly.speed;
        }

        // Check collision with bullets
        let hit = false;
        for (let j = bullets.length - 1; j >= 0; j--) {
            const bullet = bullets[j];
            if (
                bullet.x < fly.x + fly.width &&
                bullet.x + bullet.width > fly.x &&
                bullet.y < fly.y + fly.height &&
                bullet.y + bullet.height > fly.y
            ) {
                flies.splice(i, 1);
                bullets.splice(j, 1);
                score += 10;
                hit = true;
                break;
            }
        }

        if (hit) continue;

        // Check collision with player
        if (
            player.x < fly.x + fly.width &&
            player.x + player.width > fly.x &&
            player.y < fly.y + fly.height &&
            player.y + player.height > fly.y
        ) {
            lives--;
            flies.splice(i, 1);
            if (lives <= 0) {
                endGame();
            }
        }
    }

    // Spawn new flies
    if (flies.length < 2 + level) {
        spawnFly();
    }

    // Level progression
    if (score > 0 && score % 50 === 0 && score / 50 > level) {
        level = Math.floor(score / 50);
    }

    // Update UI
    document.getElementById('score').textContent = score;
    document.getElementById('lives').textContent = lives;
    document.getElementById('level').textContent = level;
}

// Draw everything
function draw() {
    // Clear canvas
    ctx.fillStyle = 'rgba(135, 206, 235, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw player (Frog)
    drawFrog(player.x, player.y);

    // Draw bullets
    for (let bullet of bullets) {
        ctx.fillStyle = bullet.color;
        ctx.beginPath();
        ctx.arc(bullet.x + bullet.width / 2, bullet.y + bullet.height / 2, bullet.width, 0, Math.PI * 2);
        ctx.fill();
    }

    // Draw flies
    for (let fly of flies) {
        drawFly(fly.x, fly.y);
    }

    // Draw player health indicator
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.font = 'bold 14px Arial';
    ctx.fillText(`Lives: ${lives}`, 10, 20);
}

// Draw a frog
function drawFrog(x, y) {
    ctx.fillStyle = '#2ecc71';
    
    // Body
    ctx.beginPath();
    ctx.ellipse(x + 15, y + 15, 15, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Head
    ctx.beginPath();
    ctx.arc(x + 15, y + 5, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Eyes
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x + 10, y + 2, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 20, y + 2, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Pupils
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(x + 10, y + 2, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 20, y + 2, 1.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Legs
    ctx.strokeStyle = '#27ae60';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + 8, y + 20);
    ctx.lineTo(x + 2, y + 28);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(x + 22, y + 20);
    ctx.lineTo(x + 28, y + 28);
    ctx.stroke();
}

// Draw a fly
function drawFly(x, y) {
    ctx.fillStyle = '#e74c3c';
    
    // Body
    ctx.beginPath();
    ctx.ellipse(x + 7.5, y + 7.5, 5, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Head
    ctx.beginPath();
    ctx.arc(x + 7.5, y + 2, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Eyes
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x + 5, y + 0.5, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 10, y + 0.5, 1.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Wings (animated)
    ctx.strokeStyle = '#c0392b';
    ctx.lineWidth = 1.5;
    const wingOffset = Math.sin(Date.now() / 100) * 2;
    ctx.beginPath();
    ctx.ellipse(x + 2, y + 5, 3, 4 + wingOffset, 0, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.ellipse(x + 13, y + 5, 3, 4 + wingOffset, 0, 0, Math.PI * 2);
    ctx.stroke();
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// End game
function endGame() {
    gameOver = true;
    document.getElementById('gameOverScreen').classList.remove('hidden');
    document.getElementById('finalScore').textContent = score;
    document.getElementById('finalLevel').textContent = level;
}

// Start game
gameLoop();
