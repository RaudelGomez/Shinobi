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
  enemyLifeTaked = 5;
  offset = {
    top:390,
    right:160,
    bottom: 200,
    left: 190
  } 
  /**
   * 
   * @param {[string]} walkingImgs - path of the imgs walking
   * @param {[string]} attackImgs - path of the imgs attacking
   * @param {[string]} deadImgs - path of the imgs dying
   * @param {Number} height - height of the img 
   * @param {Number} width - width of the img 
   * @param {Number} y - y coordinate of the img
   * @param {Number} x - x coordinate of the img
   */
  constructor(walkingImgs, attackImgs, deadImgs, height, width, y, x){
    super();
    this.x = x;
    this.y = y
    this.height = height;
    this.width = width
    this.walkingImgs = walkingImgs;
    this.attackImgs = attackImgs;
    this.deadImgs = deadImgs;
    //this.x = 400 ;
    this.x = (this.countStage * 720 + 150) ;
    this.loadingAllImgs();
    this.isCloseCharacter();
  }
  
  /**
   * Play every img of the array and make animation
   * @param {[string]} imgs - path of every imgs that will be loaded
   */
  animate(imgs){
    this.intervalAnimation = setInterval(() => {
      this.playAnimation(imgs);
    }, 200);
  }

  /**
   * That function says if the character is close of the endboss
   */
  isCloseCharacter(){
    this.intervalCloseCharacter = setInterval(() => {
      if(this.world.character.x >= this.x - 720){
        this.world.healthbarEndboss.x = 500;
      }else{
        this.world.healthbarEndboss.x = 800;
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

  /**
   * Animation of the attack endboss level 1
   */
  endBossSequenceAttackLevel1(){
		this.intervalEndBossAttack = clearInterval(this.intervalAnimation);
			this.animate(this.attackImgs);
			setTimeout(() => {
				if(this.life > 0){
					if(this.isTheCharacterTouchingTheEndBoss()){
            this.soundAttackEndBossLevel1();
						this.animationAttackEndBossLevel1(); 
					}
				}
			}, 850);
	};

  /**
   * Sound of the EndBoss level1 when attack with fire
   */
  soundAttackEndBossLevel1(){
    if(soundOn){
      endBossMad.play();
      endBossMad.volume = 0.1;
      endBossFire.play();
      endBossFire.volume = 0.1;
    }
  }

  /**
   * That function says if the endboss is collinding the character
   * @returns boolean
   */
  isTheCharacterTouchingTheEndBoss(){
    return this.world.character.x <  this.x;
  }
  /**
   * Sequence of animation of the attack from endboss level 1
   */
  animationAttackEndBossLevel1(){
    clearInterval(this.intervalAnimation);
    this.animate(this.walkingImgs);
    let newSpellEnemy = new SpellEnemy(this.x + 190 , 90);
    this.world.arraySpellEnemy.push(newSpellEnemy);
    let index = this.world.arraySpellEnemy.indexOf(newSpellEnemy);
    this.world.arraySpellEnemy[index].moveLeftSpell();
    setTimeout(() => {		
      clearInterval(this.world.spellEnemy.intervalSpellBoss);
    }, 20000);
    setTimeout(() => {
      this.world.arraySpellEnemy.splice(index, 1);
    }, 5000); 
  }

  /**
   * Anmation dead EndBoss
   * @param {[string]} imgs  - path of every imgs that will be loaded
   */
  dead(imgs){
    this.sequenceMusicEndBossDeath();
    this.intervalAnimation = setInterval(() => {
      this.playAnimation(imgs);
    }, 200);
    this.sequenceMusicYouWin();
    this.setPicYouWin();
    setTimeout(() => {
      clearAllIntervals();
    }, 2000);
  }

  /**
   * That function set the pic you win, when the endboss is dead
   */
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
  
  /**
   * Endboss music sequence
   */
  sequenceMusicEndBossDeath(){
    if(isMusicOn){
      musicGame.pause();
    }
    if(soundOn){
      enemyKilledAudio.play();
      enemyKilledAudio.volume = 0.1; 
    }
  }

  /**
   * Music sequence qhen the endBoss is dead
   */
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
  
  /**
   * Load every images
   */
  loadingAllImgs(){
    this.loadInitialPositionImage(this.walkingImgs[0]);
    this.loadImages(this.walkingImgs);
    this.loadImages(this.attackImgs);
    this.loadImages(this.deadImgs);
    this.animate(this.walkingImgs);
  }
}