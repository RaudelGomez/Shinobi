class Endboss extends Enemy{
  y = -250;
  height = 800;
  width = 800;
  speed = 1;
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
  attackImgs = [
    'assets/img/enemies/dragon/Death1.png',
    'assets/img/enemies/dragon/Attack2.png',
    'assets/img/enemies/dragon/Attack3.png',
    'assets/img/enemies/dragon/Attack4.png',
  ]
  deadImgs = [
    'assets/img/enemies/dragon/Death1.png',
    'assets/img/enemies/dragon/Death2.png',
    'assets/img/enemies/dragon/Death3.png',
    'assets/img/enemies/dragon/Death4.png',
    'assets/img/enemies/dragon/Death5.png',
  ];
  
  //spellBoss;

  //Frame 
  offset = {
    top:390,
    right:160,
    bottom: 200,
    left: 190
  } 

  constructor(){
    super().loadInitialPositionImage(this.walkingImgs[0]);
    this.x = (this.countStage * 720 + 150) ;
    console.log(this.x -1000);
    this.loadImages(this.walkingImgs);
    this.loadImages(this.attackImgs);
    this.loadImages(this.deadImgs);
    this.loadImages(this.throwingSomethingImgs);
    this.animate(this.walkingImgs);
    //this.spellBoss = new SpellEnemy(this.x - 10000 , this.y, this.throwingSomethingImgs[0]);
    //this.throwingSpellBoss();
  }

  animate(imgs){
    this.intervalAnimation = setInterval(() => {
      this.playAnimation(imgs);
    }, 200);
  }

  dead(imgs){
    this.enemyKilledAudio.play();
    this.enemyKilledAudio.volume = 0.1; 
    this.intervalAnimation = setInterval(() => {
      this.playAnimation(imgs);
    }, 200);
  }

  // throwingSpellBoss(){
  //   this.animate(this.throwingSomethingImgs);
  //   console.log(this.spellBoss);
  // }
}