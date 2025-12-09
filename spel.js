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
let platforms = []; //array

function setup() {
  createCanvas(400, 600);
  for (let i = 0; i < 5; i++) {
    //loop
    let x = random(0, 340); // random horizontal position
    let y = 170 + i * 100; // spaced vertically 100 space between every platform
    platforms.push(new Platform(x, y)); //push into array
  }
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
  for (let p of platforms) {
    p.draw();
  }
  for (let p of platforms) {
    if (playerVy > 0) {
      //bounce only when falling down

      let touchingX = playerX + 44 > p.x && playerX < p.x + p.w; //check if touching platform horizontaly

      let touchingY = playerY + 40 > p.y && playerY + 40 < p.y + p.h; //check if touching platform vertically

      if (touchingX && touchingY) {
        //if both are true, bounce
        playerVy = jumpForce;
      }
    }
  }

  rect(playerX, playerY, 44, 40); //player character

  if (playerY > 560) {
    playerY = 560; // player start on floor
    playerVy = jumpForce;
  }
}
