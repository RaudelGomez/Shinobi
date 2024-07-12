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
  intervalMove;
  world;
  
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
    this.loadImages(this.walkingImgs);
    this.loadImages(this.attackImgs);
    this.loadImages(this.deadImgs);
    //this.loadImages(this.throwingSomethingImgs);
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
    clearAllIntervals();
    if(soundOn){
      musicGame.pause();
      enemyKilledAudio.play();
      enemyKilledAudio.volume = 0.1; 
    }
    this.intervalAnimation = setInterval(() => {
      this.playAnimation(imgs);
    }, 200);
    if(soundOn){
    youWinAudio.play();
    youWinAudio.volume = 0.2;
    }
    setTimeout(() => { 
      if(soundOn){
      youWinVoice.volume = 0.8;
      youWinVoice.play();
      }
    }, 1000);
    
   setTimeout(() => {
			this.world.youWon.x = -this.world.camera_x + 160;
			this.world.youWon.y = 80;
			this.world.youWon.width = 420;
			this.world.youWon.height = 180;
      musicGame.play();
		}, 2000);
  }
}