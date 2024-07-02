class World {
  clouds = [new Cloud(), new Cloud()];
	character = new Character();
	enemies = [new Lizard(), new Lizard(), new Lizard()];
  backgroundObjects = [
    new BackgroundObject('assets/img/stages/1/bridge.png', 0, 80, 370),
    new BackgroundObject('assets/img/stages/1/sea.png', 0, 0, 480),
    new BackgroundObject('assets/img/stages/1/bamboo.png', 0, 80, 370),
  ];
  context;
  canvas;

  constructor(canvas){
    this.context = canvas.getContext('2d');
    this.canvas = canvas;
    this.draw();
  }

	draw() {
    //Clear canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.clouds);
    this.addToMap(this.clouds[1]);
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);

    //Draw will be alwys loaded
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    })
  }

  addObjectsToMap(objects){
    objects.forEach(ob => {
      this.addToMap(ob);
    });
  }

  //That function drawImage is a method of getContext that allow to paint something in the canvas element. It required img path, x and y.
  //drawImage(image, dx, dy, dWidth, dHeight)
  addToMap(mo){
    this.context.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }
}
