class Map {
  constructor(imageSrc, width, height) {
    this.image = new Image();
    this.width = width;
    this.height = height;
    this.isLoaded = false; // Flag to check if the image is loaded
    this.image.onload = () => {
      this.isLoaded = true;
    };
    this.image.src = imageSrc;
  }

  draw(ctx, viewport) {
    if (!this.isLoaded) return; // Only draw the map if the image is loaded
    // Calculate the portion of the map to draw based on the viewport
    ctx.drawImage(
      this.image,
      viewport.x,
      viewport.y,
      viewport.width,
      viewport.height,
      0,
      0,
      viewport.width,
      viewport.height
    );
  }
}

// Initialize the map with your actual map image path
const gameMap = new Map("map/background.png", 2048, 2048); // Assuming a large map size

// Define the viewport (the visible portion of the map) dynamically based on window size
function calculateViewport() {
  const aspectRatio = 16 / 9; // Maintain a 16:9 aspect ratio
  let viewportWidth = window.innerWidth;
  let viewportHeight = window.innerHeight;

  // Adjust viewport size to maintain a specific aspect ratio
  if (viewportWidth / viewportHeight > aspectRatio) {
    viewportWidth = viewportHeight * aspectRatio;
  } else {
    viewportHeight = viewportWidth / aspectRatio;
  }

  return {
    x: 0,
    y: 0, // Initially set to 0, will be updated based on player position
    width: viewportWidth,
    height: viewportHeight,
  };
}

let viewport = calculateViewport(); // Initialize viewport based on current window size

function updateViewport(playerX, playerY) {
  viewport = calculateViewport(); // Recalculate viewport dimensions based on current window size
  
  // Center the player in the viewport if possible
  viewport.x = Math.min(
    Math.max(0, playerX - viewport.width / 2),
    gameMap.width - viewport.width
  );
  viewport.y = Math.min(
    Math.max(0, playerY - viewport.height / 2),
    gameMap.height - viewport.height
  );
}

// Consider adding an event listener to handle window resize events
window.addEventListener('resize', function() {
  updateViewport(playerX, playerY); // Assuming playerX and playerY are accessible
});
