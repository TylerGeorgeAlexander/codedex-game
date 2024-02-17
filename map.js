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
            viewport.x, viewport.y, viewport.width, viewport.height,
            0, 0, viewport.width, viewport.height
        );
    }
}

// Initialize the map with your actual map image path
const gameMap = new Map('map/background.png', 1024, 1024); // Assuming a large map size of 2000x2000 pixels

// Define the viewport (the visible portion of the map)
const viewport = {
    x: 0, // Starting X position of the viewport on the map
    y: 1024, // Adjusted Y position to start from the bottom left, considering the viewport height
    width: 640,
    height: 480
};

function updateViewport(playerX, playerY) {
    // Update the viewport based on the player's position
    // This basic implementation may need adjustments to prevent showing areas outside the map

    // Center the player in the viewport if possible
    viewport.x = Math.min(Math.max(0, playerX - viewport.width / 2), gameMap.width - viewport.width);
    viewport.y = Math.min(Math.max(0, playerY - viewport.height / 2), gameMap.height - viewport.height);
}
