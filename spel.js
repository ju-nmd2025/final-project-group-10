let playerY = 560; // vertical position 
let playerX = 180; // Horizontal position 
let playerVy = 30; // vertical speed 
let gravity = 0.4; 
let jumpForce = -10; // jumping force 
let moveSpeed = 6; // How fast vertical movement is 
 
function setup() { 
createCanvas(400, 600); 
} 
 
function draw() { 
background(135, 200, 230); 
 
playerVy += gravity; //gravity applied 
playerY += playerVy; 
 
if (keyIsDown(65)) { 
playerX -= moveSpeed; // move left 
} 
if (keyIsDown(68)) { 
playerX += moveSpeed; // move right 
} 
 
rect(playerX, playerY, 44, 40); //player 
 
if (playerY > 560) { 
playerY = 560; // player start on floor 
playerVy = jumpForce; // bounce up 
} 
} 


  

