class Platform {
  constructor(x, y, type) {
    this.x = x; // Horizontal position
    this.y = y; //vertical position
    this.w = 60; // width
    this.h = 10; // height
    this.type = type; //"normal" or "breaking"
    this.broken = false; // starts as not broken becomes true once bounced
    this.direction = 1;
    this.speed = 2;
  }

  draw() {
    if (this.type === "breaking" && this.broken) 
      //does not regenerete platform if broken
      return; //stops the function
    
    if (this.type === "breaking")
      fill(200, 0, 0); // breaking platform red
    else if (this.type === "moving")
      fill (0, 0, 200);
    else
      fill(0, 200, 0); //normal platform green
    
    if (this.type === "moving") { 
      this.x += this.direction * this.speed; // calculates speed and direction
      if (this.x < -60 || this.x > 400) { 
        this.direction *= -1; // if platform is at the edge of tghe screen it changes direction
      }
    }
    
    rect(this.x, this.y, this.w, this.h); //player
  }
}

let playerY = 150; // vertical position
let playerX = 180; // Horizontal position
let playerVy = 5; // vertical speed
let gravity = 0.4;
let jumpForce = -10; // jumping force
let moveSpeed = 6; // How fast vertical movement is
let platforms = []; //array
let gameover = false;
let gamestart = true;

function setup() {
  createCanvas(400, 600);

  //Generating platforms
  for (let i = 0; i < 5; i++) {
    let x = random(0, 340); // random horizontal position
    let y = 170 + i * 100; // spaced vertically 100 space between every platform
   let r = random (1); // 
   let type = "normal";
   if (r < 0.2) type = "breaking"; // 0.0 to 0.2 (20% breaking)
   else if (r < 0.4) type = "moving"; // 0.2 to 0.4 (20% moving)
   platforms.push(new Platform (x, y, type));
   }
}

function draw() {
  background(135, 200, 230);
if (gamestart) {
  fill (0);
  textSize (20);
  text ("Press space to start",100, 300);
  return;
}

  if (gameover) {
    fill(0, 200, 0);
    fill(0, 0, 0);
    text("press enter to start again", 150, 400);
    text("game over", 150, 300);
    return;
  }
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
       let r = random (1);
      let type = "normal";
      if (r < 0.2) type = "breaking";
      else if (r < 0.4) type = "moving";
      platforms.push(new Platform (newX, newY, type));
      i--; //go back one step in array so it doesent skip a platform
    }
  }

  rect(playerX, playerY, 44, 40); //player character

  if (playerY > 560) {
    gameover = true;
  }
}
function keyPressed() {
  if (keyCode === 13) {
    // 13 = ENTER key
    gameover = false; //gets you back to game screen

    playerY = 300; //resets
    playerX = 180;
    playerVy = 0;

    platforms = [];
    for (let i = 0; i < 5; i++) {
      let x = random(0, 340);
      let y = 170 + i * 100;
        let r = random (1);
      let type = "normal";
      if (r < 0.2) type = "breaking";
      else if (r < 0.4) type = "moving";
      platforms.push(new Platform (x, y, type));
    }
  }
  if (keyCode === 32) {
    // 32 = space key
    gamestart = false; //moves you from startscreen to game

    playerY = 300; //resets
    playerX = 180;
    playerVy = 0;

    platforms = [];
    for (let i = 0; i < 5; i++) {
      let x = random(0, 340);
      let y = 170 + i * 100;
       let r = random (1);
      let type = "normal";
      if (r < 0.2) type = "breaking";
      else if (r < 0.4) type = "moving";
      platforms.push(new Platform (x, y, type));
    }
  }
}
