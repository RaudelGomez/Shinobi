class Cloud extends MovableObject{
  y = 0;
  width = 500;
  height = 180;

  constructor(){
    super().loadImage('assets/img/objects/otherObjects/cloudsGeneral.png');
    this.x = Math.random() * 500;
    this.animate();
  }

  animate(){
    setInterval(() => {
      this.x -= 0.15;
    }, 1000 / 60);
  }
}