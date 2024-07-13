class Demon extends Enemy{
  y = -100;
  height = 600;
  width = 600;
  enemyLifeTaked = 5;
  walkingImgs = [
    'assets/img/enemies/demon/Walk1.png',
    'assets/img/enemies/demon/Walk2.png',
    'assets/img/enemies/demon/Walk3.png',
    'assets/img/enemies/demon/Walk4.png',
    'assets/img/enemies/demon/Walk5.png',
    'assets/img/enemies/demon/Walk6.png',
  ];
  attackImgs = [
    'assets/img/enemies/demon/Attack1.png',
    'assets/img/enemies/demon/Attack2.png',
    'assets/img/enemies/demon/Attack3.png',
    'assets/img/enemies/demon/Attack4.png',
  ];
  deadImgs = [
    'assets/img/enemies/demon/Death1.png',
    'assets/img/enemies/demon/Death2.png',
    'assets/img/enemies/demon/Death3.png',
    'assets/img/enemies/demon/Death4.png',
    'assets/img/enemies/demon/Death5.png',
    'assets/img/enemies/demon/Death6.png',
  ];
  offset = {
    top: 230,
    right: 280,
    bottom: 150,
    left: 150
  } 

  constructor(){
    super().loadInitialPositionImage(this.walkingImgs[0]);
    this.x = 600 + Math.random() * 500 * this.countStage;
    this.loadImages(this.walkingImgs);
    this.loadImages(this.attackImgs);
    this.loadImages(this.deadImgs);
    this.speed = 0.20 + Math.random() * 0.5;
    this.animate(this.walkingImgs);
  } 
}