class Endboss extends Enemy{
  x;
  y;
  height;
  width;
  speed = 1;
  intervalEndBossAttack;
  walkingImgs = [];
  attackImgs = [];
  deadImgs = [];
  intervalMove;
  intervalCloseCharacter;
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
    this.x = 400 ;
    //this.x = (this.countStage * 720 + 150) ;
    this.loadingAllImgs();
    this.isCloseCharacter();
  }

  animate(imgs){
    this.intervalAnimation = setInterval(() => {
      this.playAnimation(imgs);
    }, 200);
  }

  isCloseCharacter(){
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
					if(this.isTheCharacterTouchingTheEndBoss()){
						this.animationAttackEndBossLevel1(); 
					}
				}
			}, 850);
	};

  isTheCharacterTouchingTheEndBoss(){
    return this.world.character.x <  this.x;
  }

  animationAttackEndBossLevel1(){
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
    }, 20000); 
  }

  dead(imgs){
    //clearAllIntervals();
    this.sequenceMusicEndBossDeath();
    this.intervalAnimation = setInterval(() => {
      this.playAnimation(imgs);
    }, 200);
    this.sequenceMusicYouWin();
    this.setPicYouWin();
    setTimeout(() => {
      clearAllIntervals();
    }, 10000);
  }

  setPicYouWin(){
    setTimeout(() => {
			this.world.youWon.x = -this.world.camera_x + 160;
			this.world.youWon.y = 80;
			this.world.youWon.width = 420;
			this.world.youWon.height = 180;
      if(isMusicOn){
        musicGame.play();
      }
		}, 2000);
  }

  sequenceMusicEndBossDeath(){
    if(isMusicOn){
      musicGame.pause();
    }
    if(soundOn){
      enemyKilledAudio.play();
      enemyKilledAudio.volume = 0.1; 
    }
  }

  sequenceMusicYouWin(){
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
  }
  
  loadingAllImgs(){
    this.loadInitialPositionImage(this.walkingImgs[0]);
    this.loadImages(this.walkingImgs);
    this.loadImages(this.attackImgs);
    this.loadImages(this.deadImgs);
    this.animate(this.walkingImgs);
  }
}