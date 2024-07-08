class Enemy extends MovableObject{
  otherDirection = true;
  intervalMove;
  intervalAnimation;

  animate(imgs){
    this.intervalMove = setInterval(() => {
      this.moveLeft(this.speed);
    }, 1000 / 60);

    this.intervalAnimation = setInterval(() => {
      this.playAnimation(imgs);
    }, 200);
  }

  dead(imgs){
    this.intervalAnimation = setInterval(() => {
      this.playAnimation(imgs);
    }, 200);
  }
}