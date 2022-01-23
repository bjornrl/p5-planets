let sun;
let cam;

function setup() {
  let canvas = createCanvas(600, 600, WEBGL);
  canvas.elt.oncontextmenu = () => false;

  cam = createEasyCam({ distance: 500 });
  sun = new Planet(50, 100, 0.01);

  sun.spawnMoons(5, 1);
}

let xBlue = [0, 48, 73];
let xRed = [214, 40, 40];
let xOrange = [247, 127, 0];
let xYellow = [252, 191, 73];
let xWhite = [234, 226, 186];
let colors = [];
colors.push(xBlue, xRed, xOrange, xYellow, xWhite);
console.log(colors, colors.length);

let tall = 0;
function doStuff() {
  tall += 1;
  setTimeout(doStuff, 5000);
  if (tall >= 4) {
    tall = 0;
  }
}
doStuff();

function draw() {
  background(0);
  //lights();
  let dirX = (mouseX / width - 0.5) * 2;
  let dirY = (mouseY / height - 0.5) * 2;
  let dirSin = map(sin(radians(frameCount)), -1, 1, -100, 100);
  let dirCos = map(cos(radians(frameCount)), -1, 1, -100, 100);
  directionalLight(...colors[tall], -dirSin, -dirCos, -1);

  sun.show();
  sun.orbit();
}
