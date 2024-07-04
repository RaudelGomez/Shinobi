class Lizard extends Enemy{
  y = 90;
  height = 400;
  width = 400;
  walkingImgs = [
    'assets/img/enemies/lizard/Walk1.png',
    'assets/img/enemies/lizard/Walk2.png',
    'assets/img/enemies/lizard/Walk3.png',
    'assets/img/enemies/lizard/Walk4.png',
    'assets/img/enemies/lizard/Walk5.png',
    'assets/img/enemies/lizard/Walk6.png',
  ];
  offset = {
    top:160,
    right:140,
    bottom: 150,
    left: 135
  } 

  constructor(){
    super().loadInitialPositionImage(this.walkingImgs[0]);
    this.x = 200 + Math.random() * 500 * this.countStage;
    this.loadImages(this.walkingImgs);
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate()
  }

  animate(){
    setInterval(() => {
      this.moveLeft(this.speed);
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.walkingImgs);
    }, 200);
  }
}