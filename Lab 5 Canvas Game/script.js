// Get the canvas element and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let score = 0;
const PADDING = 50;  // Padding from canvas edges
const IMAGE_SIZE = 50;  // Size of images

// Function to get random position within boundaries
function getRandomPosition() {
    return {
        x: PADDING + Math.random() * (canvas.width - 2 * PADDING - IMAGE_SIZE),
        y: PADDING + Math.random() * (canvas.height - 2 * PADDING - IMAGE_SIZE)
    };
}

// Initialize positions
let targetX = getRandomPosition().x;
let targetY = getRandomPosition().y;
let obstacleX = getRandomPosition().x;
let obstacleY = getRandomPosition().y;

// Load game images
const targetImage = new Image();
targetImage.src = 'images/badger.jpg';
const obstacleImage = new Image();
obstacleImage.src = 'images/bomb.png';

// Function to check collision between click and image
function isCollision(clickX, clickY, imageX, imageY) {
    const imageWidth = 50;  // Adjust based on your image size
    const imageHeight = 50; // Adjust based on your image size
    return clickX > imageX && 
           clickX < imageX + imageWidth && 
           clickY > imageY && 
           clickY < imageY + imageHeight;
}

// Function to draw the container
function drawContainer() {
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.strokeRect(PADDING, PADDING, canvas.width - 2 * PADDING, canvas.height - 2 * PADDING);
    
    // Add a subtle background for the play area
    ctx.fillStyle = 'rgba(200, 200, 200, 0.1)';
    ctx.fillRect(PADDING, PADDING, canvas.width - 2 * PADDING, canvas.height - 2 * PADDING);
}

// Function to draw the game
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw container
    drawContainer();
    
    // Draw target and obstacle
    // Draw game title
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText('Badgers & Bombs', canvas.width / 2, PADDING / 2);
    
    // Draw badger count
    ctx.font = '18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Badgers Caught: ' + score, PADDING, PADDING - 10);
    
    // Draw game elements
    ctx.drawImage(targetImage, targetX, targetY, IMAGE_SIZE, IMAGE_SIZE);
    ctx.drawImage(obstacleImage, obstacleX, obstacleY, IMAGE_SIZE, IMAGE_SIZE);
}

// Moves images to random positions
setInterval(() => {
    const targetPos = getRandomPosition();
    const obstaclePos = getRandomPosition();
    
    targetX = targetPos.x;
    targetY = targetPos.y;
    obstacleX = obstaclePos.x;
    obstacleY = obstaclePos.y;
}, 2000);  // Moves every 2 seconds

// Handle mouse clicks
canvas.addEventListener('mousedown', (event) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    // Check collisions
    if (isCollision(clickX, clickY, targetX, targetY)) {
        score += 1;
        alert('You caught a badger! Total caught: ' + score);
    } else if (isCollision(clickX, clickY, obstacleX, obstacleY)) {
        if (score > 0) {
            score -= 1;
            alert('Oh no! The bomb scared away a badger! Badgers remaining: ' + score);
        } else {
            alert('Lucky you have no badgers to lose!');
        }
    }
});

// Start the game loop
setInterval(draw, 1000/60);  // 60 FPS
