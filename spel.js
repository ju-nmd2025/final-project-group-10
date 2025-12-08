let playerY = 560; // starting position (vertical)
let playerVy = 30; // vertical speed
let gravity = 0.4;
let jumpForce = -10; // jumping force (more negative = larger jump)

function setup() {
  createCanvas(400, 600);
}

function draw() {
  background(135, 200, 230);

  playerVy += gravity; //gravity applied
  playerY += playerVy;

  rect(180, playerY, 44, 40); //player

  if (playerY > 560) {
    playerY = 560; // stop at bottom
    playerVy = 0; // stop from falling
  }
}

function keyPressed() {
  if (key === "w") {
    // if "W" pressed jump
    playerVy = jumpForce;
  }
}
