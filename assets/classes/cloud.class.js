class Cloud extends MovableObject{
  y = 0;
  width = 500;
  height = 180;

  constructor(){
    super().loadInitialPositionImage('assets/img/objects/otherObjects/cloudsGeneral.png');
    this.x = 100 + Math.random() * this.countStage * 720;
    this.animate();
  }

  animate(){
    setInterval(() => {
      this.moveLeft(this.speed);
    }, 1);
  }

}