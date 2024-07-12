class Endboss extends Enemy{
  x;
  y;
  height;
  width;
  speed = 1;
  intervalEndBossAttack;
  // walkingImgs = [
  //   'assets/img/enemies/dragon/Walk1.png',
  //   'assets/img/enemies/dragon/Walk1.png',
  //   'assets/img/enemies/dragon/Walk1.png',
  //   'assets/img/enemies/dragon/Walk1.png',
  //   'assets/img/enemies/dragon/Walk1.png',
  //   'assets/img/enemies/dragon/Walk1.png',
  //   'assets/img/enemies/dragon/Walk2.png',
  //   'assets/img/enemies/dragon/Walk3.png',
  //   'assets/img/enemies/dragon/Walk4.png',
  //   'assets/img/enemies/dragon/Walk5.png',
  // ];
  // attackImgs = [
  //   'assets/img/enemies/dragon/Attack1.png',
  //   'assets/img/enemies/dragon/Attack2.png',
  //   'assets/img/enemies/dragon/Attack3.png',
  //   'assets/img/enemies/dragon/Attack4.png',
  // ]
  // deadImgs = [
  //   'assets/img/enemies/dragon/Death1.png',
  //   'assets/img/enemies/dragon/Death2.png',
  //   'assets/img/enemies/dragon/Death3.png',
  //   'assets/img/enemies/dragon/Death4.png',
  //   'assets/img/enemies/dragon/Death5.png',
  // ];
  walkingImgs = [];
  attackImgs = [];
  deadImgs = [];
  intervalMove;
  intervalCloseCharacter;

  
  //spellBoss;

  //Frame 
  offset = {
    top:390,
    right:160,
    bottom: 200,
    left: 190
  } 

  constructor(walkingImgs, attackImgs, deadImgs, height, width, y, x){
    super();
    this.x = x;
    this.y = y
    this.height = height;
    this.width = width
    this.walkingImgs = walkingImgs;
    this.attackImgs = attackImgs;
    this.deadImgs = deadImgs;
    this.loadInitialPositionImage(this.walkingImgs[0]);
    this.x = 400 ;
    //this.x = (this.countStage * 720 + 150) ;
    this.loadImages(this.walkingImgs);
    this.loadImages(this.attackImgs);
    this.loadImages(this.deadImgs);
    //this.loadImages(this.throwingSomethingImgs);
    this.animate(this.walkingImgs);
    //this.spellBoss = new SpellEnemy(this.x - 10000 , this.y, this.throwingSomethingImgs[0]);
    //this.throwingSpellBoss();
    this.closeCharacter();
  }

  animate(imgs){
    this.intervalAnimation = setInterval(() => {
      this.playAnimation(imgs);
    }, 200);
  }

  closeCharacter(){
    this.intervalCloseCharacter = setInterval(() => {
      if(this.world.character.x >= this.x - 720){
        // if(isMusicOn){
        //   musicEndBoss.play()
        // }
      };
     
      // }
      // if(this.world.character.x >= this.x - 720){
      //   this.x -= 1;
      // }else if(this.world.character.x + 100 >= this.x ){
      //   this.x += 1;
      // }
      // console.log('boss', this.world.character.x);
      // console.log('chara',this.x);
    }, 1000 / 60);
  }

  endBossSequenceAttackLevel1(){
    //clean interval in world
		this.intervalEndBossAttack = clearInterval(this.intervalAnimation);
			this.animate(this.attackImgs);
			setTimeout(() => {
				if(this.life > 0){
					//console.log(enemy.life);
					if(this.world.character.x <  this.x){
						clearInterval(this.intervalAnimation);
						this.animate(this.walkingImgs);
						this.world.spellEnemy = new SpellEnemy(this.x + 190 , 90);
						//this.spellEnemy = new SpellEnemy((this.character.countStage) * 720 + 400 , 80);
						this.world.spellEnemy.moveLeftSpell();
						setTimeout(() => {		
							clearInterval(this.world.spellEnemy.intervalSpellBoss);
						}, 20000);
						setTimeout(() => {
							this.world.spellEnemy = new SpellEnemy();;
					}, 20000); // 200 segundos son 200,000 milisegundos
					}
				}
			}, 850);
	};

  dead(imgs){
    //clearAllIntervals();
    if(isMusicOn){
      musicGame.pause();
    }
    if(soundOn){
      enemyKilledAudio.play();
      enemyKilledAudio.volume = 0.1; 
    }
    this.intervalAnimation = setInterval(() => {
      this.playAnimation(imgs);
    }, 200);
    if(soundOn){
    youWinAudio.play();
    }
    if(isMusicOn){
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
      if(isMusicOn){
        musicGame.play();
      }
		}, 2000);
    setTimeout(() => {
      clearAllIntervals();
    }, 5000);
  }
}