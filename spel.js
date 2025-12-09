class Platform {
  constructor(x, y) {
    this.x = x; // Horizontal position
    this.y = y; //vertical position
    this.w = 60; // width
    this.h = 10; // height
  }

  draw() {
    fill(0, 200, 0); // green
    rect(this.x, this.y, this.w, this.h);
  }
}

let playerY = 560; // vertical position
let playerX = 180; // Horizontal position
let playerVy = 30; // vertical speed
let gravity = 0.4;
let jumpForce = -10; // jumping force
let moveSpeed = 6; // How fast vertical movement is
let testPlatform;

function setup() {
  createCanvas(400, 600);
  testPlatform = new Platform(150, 400);
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
  testPlatform.draw();

  rect(playerX, playerY, 44, 40); //player

  if (playerY > 560) {
    playerY = 560; // player start on floor
    playerVy = jumpForce; // bounce up
  }
}
