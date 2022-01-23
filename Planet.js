class Planet {
  constructor(r, d, o) {
    this.v = p5.Vector.random3D();

    this.radius = r;
    this.distance = d;
    this.v.mult(this.distance);
    this.angle = random(tan(frameCount));
    this.orbitspeed = o;

    this.planets = null;
  }

  orbit() {
    this.angle = this.orbitspeed + this.angle;
    //console.log(this.angle);
    if (this.planets != null) {
      for (let i = 0; i < this.planets.length; i++) {
        this.planets[i].orbit();
      }
    }
  }

  spawnMoons(total, level) {
    this.planets = [];
    for (let i = 0; i < total; i++) {
      let r = this.radius / (level * 2);
      let d = random(this.radius + r, (this.radius + r) * 2);
      let o = random(-0.1, 0.1);
      this.planets[i] = new Planet(r, d, o);
      if (level < 2) {
        let num = int(random(0, 3));
        this.planets[i].spawnMoons(num, level + 1);
      }
    }
  }

  show() {
    push();
    noStroke();
    let v2 = createVector(1, 0, 1);
    let p = this.v.cross(v2);
    // Rotation around a 0-length axis doesn't work in p5.js, so don't do that.
    if (p.x != 0 || p.y != 0 || p.z != 0) {
      rotate(this.angle, p);
    }
    stroke(255);
    //line(0, 0, 0, this.v.x, this.v.y, this.v.z);
    //line(0, 0, 0, p.x, p.y, p.z);

    translate(this.v.x, this.v.y, this.v.z);
    noStroke();

    // for (let i = 0; i < 100; i++) {
    //   let c = map(sin(radians(frameCount * 5 + i)), -1, 1, 100, 255);
    //   fill(c);
    // }
    fill(255);
    // function getRandomColor() {
    //   var letters = "0123456789ABCDEF";
    //   var color = "#";
    //   for (var i = 0; i < 6; i++) {
    //     color += letters[Math.floor(Math.random() * 16)];
    //   }
    //   return color;
    // }

    //fill(getRandomColor());
    sphere(this.radius);
    //ellipse(0, 0, this.radius * 2, this.radius * 2);
    if (this.planets != null) {
      for (let i = 0; i < this.planets.length; i++) {
        this.planets[i].show();
      }
    }
    pop();
  }
}
