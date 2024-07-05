class Character extends MovableObject {
	walkingImgs = [
		"assets/img/characters/Samurai/walk/walk-1.png",
		"assets/img/characters/Samurai/walk/walk-2.png",
		"assets/img/characters/Samurai/walk/walk-3.png",
		"assets/img/characters/Samurai/walk/walk-4.png",
		"assets/img/characters/Samurai/walk/walk-5.png",
		"assets/img/characters/Samurai/walk/walk-6.png",
		"assets/img/characters/Samurai/walk/walk-7.png",
		"assets/img/characters/Samurai/walk/walk-8.png",
	];
	runImgs = [
		"assets/img/characters/Samurai/run/run-1.png",
		"assets/img/characters/Samurai/run/run-2.png",
		"assets/img/characters/Samurai/run/run-3.png",
		"assets/img/characters/Samurai/run/run-4.png",
		"assets/img/characters/Samurai/run/run-5.png",
		"assets/img/characters/Samurai/run/run-6.png",
		"assets/img/characters/Samurai/run/run-7.png",
		"assets/img/characters/Samurai/run/run-8.png",
	];
	jumpImgs = [
		"assets/img/characters/Samurai/jump/jump-1.png",
		"assets/img/characters/Samurai/jump/jump-2.png",
		"assets/img/characters/Samurai/jump/jump-3.png",
		"assets/img/characters/Samurai/jump/jump-4.png",
		"assets/img/characters/Samurai/jump/jump-5.png",
		"assets/img/characters/Samurai/jump/jump-6.png",
		"assets/img/characters/Samurai/jump/jump-7.png",
		"assets/img/characters/Samurai/jump/jump-8.png",
		"assets/img/characters/Samurai/jump/jump-9.png",
		"assets/img/characters/Samurai/jump/jump-10.png",
		"assets/img/characters/Samurai/jump/jump-11.png",
		"assets/img/characters/Samurai/jump/jump-12.png"
	]
	deadImgs = [
		"assets/img/characters/Samurai/dead/dead-1.png",
		"assets/img/characters/Samurai/dead/dead-2.png",
		"assets/img/characters/Samurai/dead/dead-3.png",
	]
	hurtImgs = [
		"assets/img/characters/Samurai/hurt/hurt-1.png",
		"assets/img/characters/Samurai/hurt/hurt-2.png",
		"assets/img/characters/Samurai/hurt/hurt-3.png",
	]
	x = 100;
	y = 190;
	yAfterJump = 190;
	height = 150;
  width = 90;
	world;
	walk = 10;
	run = 15;
	currentImageRun = 0;
  walk_sound = new Audio('assets/audio/walking.mp3');
  run_sound = new Audio('assets/audio/running.mp3');
	offset = {
    top:0,
    right:10,
    bottom: 0,
    left: 40
  }
	allIntervalCharacter = [];
	
	gameOverAudio = new Audio('assets/audio/gameOver.mp3');
	hurtAudio = new Audio('assets/audio/hurt.mp3');
	actionAudio = new Audio('assets/audio/actionSound.mp3');
	

	constructor() {
		super().loadInitialPositionImage('assets/img/characters/Samurai/idle/idle.png');
		this.loadImages(this.walkingImgs);
		this.loadImages(this.runImgs);
		this.loadImages(this.jumpImgs);
		this.loadImages(this.hurtImgs);
		this.loadImages(this.deadImgs);
		this.animate();
		this.animationRun();
		this.applyGravity();
		this.collectingAllIdIntervalCharacter();
	}

	animate() {
		//Condition inside if to move
		this.intervalMoveCharacter = setInterval(() => {
      this.run_sound.pause();
      this.walk_sound.pause();
			if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
				this.moveRight();
				this.walk_sound.play();
			}

			if (this.world.keyboard.left && this.x > -600) {
				this.moveLeft(this.walk);
				this.otherDirection = true;
        this.walk_sound.play();
			}

			if(this.world.keyboard.up && !this.isInTheAir()){
				this.actionAudio.play();
				this.jump();
			}
			
      this.world.camera_x = -this.x + 100;
		}, 100);

		

		this.intervalPlayCharacter = setInterval(() => {
			if(this.isDead()){
				this.stopintervalCharacter();
				this.gameOverAudio.volume = 0.3;
				this.gameOverAudio.play();
				this.playAnimation(this.deadImgs);
				return
			}
			this.loadInitialPositionImage('assets/img/characters/Samurai/idle/idle.png');
			if(this.isHurt()){
				this.hurtAudio.volume = 0.1; 
				this.hurtAudio.play();
				this.playAnimation(this.hurtImgs);
			}
			//Falling when he is in the air
			if(this.isInTheAir()){
				this.playAnimation(this.jumpImgs);
			}else{
				if (this.world.keyboard.right || this.world.keyboard.left) {
					//Walk animation
					this.playAnimation(this.walkingImgs);
				}
			}
		}, 90);

	}

	animationRun() {
    this.walk_sound.pause();
    this.run_sound.pause();
		this.intervalRunCharacter = setInterval(() => {
			if (this.world.keyboard.right && this.world.keyboard.space && (this.x < this.world.level.level_end_x)) {
				this.runRight();
				this.run_sound.play();
			};

			if (this.world.keyboard.left && this.world.keyboard.space && this.x > -600) {
				this.runLeft(this.run);
				this.run_sound.play();
			}

			if(this.world.keyboard.up && !this.isInTheAir()){
				this.actionAudio.play();
				this.jump();
				this.run_sound.play();
			}

      this.world.camera_x = -this.x + 100;
		}, 1000 / 60);

		this.intervalPlayRunCharacter = setInterval(() => {
			if(this.isDead()){
				this.gameOverAudio.volume = 0.3;
				this.gameOverAudio.play();
				this.playAnimation(this.deadImgs);
				return
			}
			if(this.isHurt()){
				this.hurtAudio.volume = 0.1; 
				this.hurtAudio.play();
				this.playAnimation(this.hurtImgs);
			}
		
			//Falling when he is in the air
			if(this.isInTheAir()){
				this.playAnimation(this.jumpImgs);
			}else{
				if ((this.world.keyboard.right && this.world.keyboard.space) || (this.world.keyboard.left && this.world.keyboard.space)) 
					{
					//run animation
					this.playAnimation(this.runImgs);
					}
			}			
		}, 40);
	}
	
	jump() {
		this.speedY = 30;
		this.y = this.yAfterJump;
	}

	stopintervalCharacter(){
    this.allIntervalCharacter.forEach(id => {
      clearInterval(id);
    });
  }

	collectingAllIdIntervalCharacter(){
		this.allIntervalCharacter.push(this.intervalMoveCharacter);
		this.allIntervalCharacter.push(this.intervalPlayCharacter);
		this.allIntervalCharacter.push(this.intervalRunCharacter);
		this.allIntervalCharacter.push(this.intervalPlayRunCharacter);
	}
}
