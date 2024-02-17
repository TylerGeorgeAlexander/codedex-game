const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 640; // Set canvas width to match the viewport
canvas.height = 480; // Set canvas height to match the viewport

let keys = {};

window.addEventListener('keydown', function(e) {
    keys[e.key] = true;
});

window.addEventListener('keyup', function(e) {
    delete keys[e.key];
});

// Placeholder for player's position
// Set near the starting bridge
let playerX = 725; // Starting X position - you'll want to update this based on game logic
let playerY = 825; // Starting Y position close to the bottom left of the map

function update() {
    // Handle player movement - this is very basic and should be expanded
    const playerSpeed = 5;
    if (keys['ArrowUp']) playerY -= playerSpeed;
    if (keys['ArrowDown']) playerY += playerSpeed;
    if (keys['ArrowLeft']) playerX -= playerSpeed;
    if (keys['ArrowRight']) playerX += playerSpeed;

    // Ensure the player stays within the map bounds
    playerX = Math.max(0, Math.min(gameMap.width, playerX));
    playerY = Math.max(0, Math.min(gameMap.height, playerY));

    // Update the viewport based on the player's new position
    updateViewport(playerX, playerY);
}

function drawCharacter() {
    // Adjust this method to draw your character based on its current position and potentially facing direction
    ctx.fillStyle = 'red';
    // Translate player position to viewport position
    let viewportX = playerX - viewport.x;
    let viewportY = playerY - viewport.y;
    ctx.fillRect(viewportX, viewportY, 25, 25); // Draw the character as a simple square for now
    console.log(playerX, playerY)
}

function gameLoop() {
    requestAnimationFrame(gameLoop);
    update(); // Update game state
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    gameMap.draw(ctx, viewport); // Draw the portion of the map in the current viewport
    drawCharacter(); // Draw the player character
}

// Start the game loop
gameLoop();
