class Lizard extends Enemy{
  y = 90;
  height = 400;
  width = 400;
  enemyLifeTaked = 3
  walkingImgs = [
    'assets/img/enemies/lizard/Walk1.png',
    'assets/img/enemies/lizard/Walk2.png',
    'assets/img/enemies/lizard/Walk3.png',
    'assets/img/enemies/lizard/Walk4.png',
    'assets/img/enemies/lizard/Walk5.png',
    'assets/img/enemies/lizard/Walk6.png',
  ];
  attackImgs = [
    'assets/img/enemies/lizard/Attack1.png',
    'assets/img/enemies/lizard/Attack2.png',
    'assets/img/enemies/lizard/Attack3.png',
    'assets/img/enemies/lizard/Attack4.png',
    'assets/img/enemies/lizard/Attack5.png',
  ];

  deadImgs = [
    'assets/img/enemies/lizard/Death1.png',
    'assets/img/enemies/lizard/Death2.png',
    'assets/img/enemies/lizard/Death3.png',
    'assets/img/enemies/lizard/Death4.png',
    'assets/img/enemies/lizard/Death5.png',
    'assets/img/enemies/lizard/Death6.png',
  ];

  offset = {
    top:160,
    right:140,
    bottom: 150,
    left: 135
  } 

  constructor(){
    super().loadInitialPositionImage(this.walkingImgs[0]);
    this.x = 500 + Math.random() * 500 * this.countStage;
    this.loadImages(this.walkingImgs);
    this.loadImages(this.attackImgs);
    this.loadImages(this.deadImgs);
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate(this.walkingImgs);
  } 
}