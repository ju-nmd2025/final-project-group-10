class Platform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 60; // width
    this.h = 10; // height
  }

  draw() {
    fill(0, 200, 0); // green
    rect(this.x, this.y, this.w, this.h);
  }
}

// Create a platform 
let platform;

function setup() {
  createCanvas(400, 600);

  // Create a platform at position (100, 200)
  platform = new Platform(100, 200);
}

function draw() {
  background(135, 200, 230);

  // Draw the platform
  platform.draw();
}

