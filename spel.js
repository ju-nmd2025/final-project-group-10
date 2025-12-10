class Platform {
  constructor(x, y, type) {
    this.x = x; // Horizontal position
    this.y = y; //vertical position
    this.w = 60; // width
    this.h = 10; // height
    this.type = type; //"normal" or "breaking"
    this.broken = false; // starts as not broken becomes true once bounced
  }

  draw() {
    if (this.type === "breaking" && this.broken) {
      //does not regenerete platform if broken
      return; //stops the function
    }
    if (this.type === "breaking") {
      fill(200, 0, 0); // breaking platform red
    } else {
      fill(0, 200, 0); //normal platform green
    }

    rect(this.x, this.y, this.w, this.h); //player
  }
}

let playerY = 560; // vertical position
let playerX = 180; // Horizontal position
let playerVy = 30; // vertical speed
let gravity = 0.4;
let jumpForce = -10; // jumping force
let moveSpeed = 6; // How fast vertical movement is
let platforms = []; //array

function setup() {
  createCanvas(400, 600);

  //Generating platforms
  for (let i = 0; i < 5; i++) {
    let x = random(0, 340); // random horizontal position
    let y = 170 + i * 100; // spaced vertically 100 space between every platform
    let type = random(1) < 0.3 ? "breaking" : "normal"; //randomly choose type breaking or normal
    platforms.push(new Platform(x, y, type)); //push into array
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
    //check all platforms in array
    if (p.type === "breaking" && p.broken) {
      //if platform breaking and broken check new
      continue;
    }
    if (playerVy > 0) {
      //bounce only when falling down

      let touchingX = playerX + 44 > p.x && playerX < p.x + p.w; //check if touching platform horizontaly

      let touchingY = playerY + 40 > p.y && playerY + 40 < p.y + p.h; //check if touching platform vertically

      if (touchingX && touchingY) {
        //if both are true, bounce
        playerVy = jumpForce;
        if (p.type === "breaking") {
          //breaking platforms should disapear
          p.broken = true; //marks the platform as true so it doesnt get redrawn
        }
      }
    }
  }

  if (playerY < 250) {
    let scroll = 4; // how fast everything moves
    playerY += scroll; //push player down scroll amount
    for (let p of platforms) p.y += scroll; //loops through each platform and adds scroll to it
  }

  for (let i = 0; i < platforms.length; i++) {
    let p = platforms[i];
    if (p.y > height) {
      // if platforms y is below screen
      platforms.splice(i, 1); // Remove one platform from array
      let highestY = Infinity; //we make the the highestY infite to find the smallest platform value
      for (let p of platforms) if (p.y < highestY) highestY = p.y; //loop through platforms and updates highest Y value
      let newX = random(0, 340); //create a new X value to platform
      let newY = highestY - 100; // create a new Y value to platform 100 from highest one
      let type = random(1) < 0.3 ? "breaking" : "normal"; //make randomly breaking/normal
      platforms.push(new Platform(newX, newY, type)); //push new platform into array
      i--; //go back one step in array so it doesent skip a platform
    }
  }

  rect(playerX, playerY, 44, 40); //player character

  if (playerY > 560) {
    playerY = 560; // player start on floor
    playerVy = jumpForce;
  }
}
