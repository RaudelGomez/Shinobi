class Endboss extends Enemy{
  y = -240;
  height = 790;
  width = 790;
  walkingImgs = [
    'assets/img/enemies/dragon/Walk1.png',
    'assets/img/enemies/dragon/Walk1.png',
    'assets/img/enemies/dragon/Walk1.png',
    'assets/img/enemies/dragon/Walk1.png',
    'assets/img/enemies/dragon/Walk1.png',
    'assets/img/enemies/dragon/Walk1.png',
    'assets/img/enemies/dragon/Walk2.png',
    'assets/img/enemies/dragon/Walk3.png',
    'assets/img/enemies/dragon/Walk4.png',
    'assets/img/enemies/dragon/Walk5.png',
  ];

  constructor(){
    super().loadImage(this.walkingImgs[0]);
    this.x = (this.countStage * 720) + 80;
    this.loadImages(this.walkingImgs);
    this.animate();
  }

  animate(){
    setInterval(() => {
      this.playAnimation(this.walkingImgs);
    }, 200);
  }
}