class Endboss extends Enemy{
  y = -250;
  //Medidas attack
  // height = 350;
  // width = 250;
  height = 800;
  width = 800;
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
  attackImages = [
    'assets/img/enemies/dragon/Attack1.png',
    'assets/img/enemies/dragon/Attack2.png',
    'assets/img/enemies/dragon/Attack3.png',
    'assets/img/enemies/dragon/Attack4.png',
  ]
  //Frame 
  offset = {
    top:390,
    right:160,
    bottom: 200,
    left: 190
  } 

  constructor(){
    super().loadImage(this.walkingImgs[0]);
    this.x = (this.countStage * 720) + 100;
    this.loadImages(this.walkingImgs);
    this.animate();
  }

  animate(){
    setInterval(() => {
      this.playAnimation(this.walkingImgs);
    }, 200);
  }
}