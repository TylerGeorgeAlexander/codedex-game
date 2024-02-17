const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 640; // Set canvas width to match the viewport
canvas.height = 480; // Set canvas height to match the viewport

let keys = {};

window.addEventListener("keydown", function (e) {
  keys[e.key] = true;
});

window.addEventListener("keyup", function (e) {
  delete keys[e.key];
});

// Adding touch controls for movement
function moveLeft() {
  keys["ArrowLeft"] = true;
}
function moveRight() {
  keys["ArrowRight"] = true;
}
function moveUp() {
  keys["ArrowUp"] = true;
}
function moveDown() {
  keys["ArrowDown"] = true;
}

function stopLeft() {
  delete keys["ArrowLeft"];
}
function stopRight() {
  delete keys["ArrowRight"];
}
function stopUp() {
  delete keys["ArrowUp"];
}
function stopDown() {
  delete keys["ArrowDown"];
}

document
  .getElementById("left")
  .addEventListener("touchstart", moveLeft, { passive: false });
document
  .getElementById("left")
  .addEventListener("touchend", stopLeft, { passive: false });
document
  .getElementById("right")
  .addEventListener("touchstart", moveRight, { passive: false });
document
  .getElementById("right")
  .addEventListener("touchend", stopRight, { passive: false });
document
  .getElementById("up")
  .addEventListener("touchstart", moveUp, { passive: false });
document
  .getElementById("up")
  .addEventListener("touchend", stopUp, { passive: false });
document
  .getElementById("down")
  .addEventListener("touchstart", moveDown, { passive: false });
document
  .getElementById("down")
  .addEventListener("touchend", stopDown, { passive: false });

let playerX = 725; // Starting X position
let playerY = 825; // Starting Y position

function update() {
  const playerSpeed = 5;
  if (keys["ArrowUp"]) playerY -= playerSpeed;
  if (keys["ArrowDown"]) playerY += playerSpeed;
  if (keys["ArrowLeft"]) playerX -= playerSpeed;
  if (keys["ArrowRight"]) playerX += playerSpeed;

  // Keep the player within the map bounds
  playerX = Math.max(0, Math.min(gameMap.width, playerX));
  playerY = Math.max(0, Math.min(gameMap.height, playerY));

  updateViewport(playerX, playerY); // Assuming this function adjusts the viewport
}

function drawCharacter() {
  ctx.fillStyle = "red"; // Example character color
  let viewportX = playerX - viewport.x;
  let viewportY = playerY - viewport.y;
  let charSquare = 25.6; // Main character size
  ctx.fillRect(viewportX, viewportY, charSquare, charSquare); // Example character size
}

function gameLoop() {
  requestAnimationFrame(gameLoop);
  update(); // Update game state
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gameMap.draw(ctx, viewport); // Draw the map
  drawCharacter(); // Draw the player
}

function resizeCanvas() {
    const canvas = document.getElementById('gameCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Calculate viewport size to maintain 16:9 aspect ratio within the canvas
    let aspectRatio = 16 / 9;
    let viewportWidth, viewportHeight;

    if (canvas.width / canvas.height < aspectRatio) {
        // Canvas is taller than the desired aspect ratio
        viewportWidth = canvas.width;
        viewportHeight = canvas.width / aspectRatio;
    } else {
        // Canvas is wider than the desired aspect ratio
        viewportWidth = canvas.height * aspectRatio;
        viewportHeight = canvas.height;
    }

    // Update global viewport object
    viewport.width = viewportWidth;
    viewport.height = viewportHeight;
    // Adjust viewport x and y to center the view if necessary
    viewport.x = (canvas.width - viewportWidth) / 2;
    viewport.y = (canvas.height - viewportHeight) / 2;

    // Optionally, re-center or adjust the game view based on new viewport size
    updateViewport(playerX, playerY);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial call to fit the viewport


// Start the game loop
gameLoop();
