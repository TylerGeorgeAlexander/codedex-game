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

let playerX = 1105; // Starting X position
let playerY = 1320; // Starting Y position

function update() {
  const playerSpeed = 5;
  if (keys["ArrowUp"]) playerY -= playerSpeed;
  if (keys["ArrowDown"]) playerY += playerSpeed;
  if (keys["ArrowLeft"]) playerX -= playerSpeed;
  if (keys["ArrowRight"]) playerX += playerSpeed;

  // Keep the player within the map bounds
  playerX = Math.max(0, Math.min(gameMap.width, playerX));
  playerY = Math.max(0, Math.min(gameMap.height, playerY));
  // Calculate logs of where the player is located
  console.log(playerX, playerY)
  updateViewport(playerX, playerY); // Assuming this function adjusts the viewport
}

// Load the character image
const characterImage = new Image();
characterImage.src = 'codedex-bot-logo.gif'; // Path to your image

function drawCharacter() {
  let viewportX = playerX - viewport.x;
  let viewportY = playerY - viewport.y;
  let charSquare = 50; // You can adjust this size if needed

  // Ensure the image is loaded before drawing
  if (characterImage.complete) {
    ctx.drawImage(characterImage, viewportX, viewportY, charSquare, charSquare);
  } else {
    // Optionally, draw a placeholder or retry until the image is loaded
    characterImage.onload = () => {
      ctx.drawImage(characterImage, viewportX, viewportY, charSquare, charSquare);
    };
  }
}


function gameLoop() {
  requestAnimationFrame(gameLoop);
  update(); // Update game state
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gameMap.draw(ctx, viewport); // Draw the map
  drawCharacter(); // Draw the player
}

function resizeCanvas() {
  const aspectRatio = 16 / 9;
  let newWidth = window.innerWidth;
  let newHeight = window.innerWidth / aspectRatio;

  if (newHeight > window.innerHeight) {
      newHeight = window.innerHeight;
      newWidth = window.innerHeight * aspectRatio;
  }

  // Set canvas dimensions to match the new calculated dimensions
  const canvas = document.getElementById('gameCanvas');
  canvas.style.width = `${newWidth}px`;
  canvas.style.height = `${newHeight}px`;
  canvas.width = newWidth;
  canvas.height = newHeight;

  // Update viewport to match new canvas size, maintaining the game's aspect ratio
  viewport.width = newWidth;
  viewport.height = newHeight;
  // Adjust viewport x and y to ensure the game view is centered
  viewport.x = Math.max(0, playerX - viewport.width / 2);
  viewport.y = Math.max(0, playerY - viewport.height / 2);

  // Re-center or adjust the game view based on the new viewport size
  updateViewport(playerX, playerY); // Ensure this function is defined to adjust the game's viewport
}

// Listen for window resize events to adjust the canvas
window.addEventListener('resize', resizeCanvas);
// Call resizeCanvas initially to set up the canvas size
resizeCanvas();

// Start the game loop
gameLoop();

