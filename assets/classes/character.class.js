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
		// "assets/img/characters/Samurai/dead/dead-1.png",
		// "assets/img/characters/Samurai/dead/dead-2.png",
		"assets/img/characters/Samurai/dead/dead-3.png",
	]
	hurtImgs = [
		"assets/img/characters/Samurai/hurt/hurt-1.png",
		"assets/img/characters/Samurai/hurt/hurt-2.png",
		"assets/img/characters/Samurai/hurt/hurt-3.png",
	];
	throwObjectImages = [
		"assets/img/characters/Samurai/attack1/attack-1.png",
		"assets/img/characters/Samurai/attack1/attack-2.png",
		"assets/img/characters/Samurai/attack1/attack-3.png",
		"assets/img/characters/Samurai/attack1/attack-4.png",
		"assets/img/characters/Samurai/attack1/attack-5.png",
		"assets/img/characters/Samurai/attack1/attack-6.png",
	];
	gameOverImg = ['assets/img/backgroundGame/game_over.jpg'];

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
	throwableObj = 0;
	spellObject = 0;
	
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
		this.loadImages(this.throwObjectImages);
		this.loadImages(this.gameOverImg);
		this.animate();
		this.animationRun();
		this.applyGravity();
		this.pushAllInterval(this.allIntervalCharacter, [this.intervalMoveCharacter, this.intervalPlayCharacter, this.intervalRunCharacter, this.intervalPlayRunCharacter, this.intervalInTheAir ]);
	}
	
	animate() {
		console.log(this.life);
		//Condition inside if to move
		this.intervalMoveCharacter = setInterval(() => {
      this.run_sound.pause();
      this.walk_sound.pause();
			if (this.world.keyboard.right && this.x < (this.world.level.level_end_x + 400)) {
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

			if(this.isTheEndOfTheLevel()){
				return
			}
			this.cameraMoveLeft();
		      
		}, 100);

		

		this.intervalPlayCharacter = setInterval(() => {
			if(this.isDead()){
				this.y = 190;
				this.stopintervalCharacter();
				this.gameOverAudio.volume = 0.3;
				this.gameOverAudio.play();
				this.playAnimation(this.deadImgs);
				this.cleanInterval(this.world.allIntervalGame);
				this.world.keyboard = '';
				this.game = new GameOver(0, 0, 'assets/img/backgroundGame/game_over.jpg');
				// setTimeout(() => {
				// 	this.playAnimation(this.gameOverImg);
				// 	this.height = 480;
				// 	this.width = 720;
				// 	this.x = 0;
				// 	this.y = 0;
				// 	//this.y = 200;
				// 	console.log(this.x);
				// 	console.log(this.y);
				// 	clearInterval(this.world.allIntervalGame);
				// }, 1000);
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
		this.intervalRunCharacter = setInterval(() => {
			this.walk_sound.pause();
			this.run_sound.pause();
			if (this.world.keyboard.right && this.world.keyboard.a && (this.x < this.world.level.level_end_x + 400)) {
				this.runRight(this.run);
				this.run_sound.play();
			};

			if (this.world.keyboard.left && this.world.keyboard.a && this.x > -600) {
				this.runLeft(this.run);
				this.run_sound.play();
			}

			if(this.world.keyboard.up && !this.isInTheAir()){
				this.actionAudio.play();
				this.jump();
				this.run_sound.play();
			}

      if(this.isTheEndOfTheLevel()){
				return
			}
			this.cameraMoveLeft();

		}, 1000 / 60);

		this.intervalPlayRunCharacter = setInterval(() => {
			if(this.isDead()){
				this.y = 190; 
				// this.gameOverAudio.volume = 0.3;
				// this.gameOverAudio.play();
				this.playAnimation(this.deadImgs);
				this.world.keyboard = '';
				// setTimeout(() => {
				// 	this.playAnimation(this.gameOverImg);
				// 	this.height = 480;
				// 	this.width = 720;
				// 	this.x = 0;
				// 	this.y = 0;
				// 	//this.y = 200;
				// 	console.log(this.x);
				// 	console.log(this.y);
				// 	clearInterval(this.world.allIntervalGame);
				// }, 1000);
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
				if ((this.world.keyboard.right && this.world.keyboard.a) || (this.world.keyboard.left && this.world.keyboard.a)) 
					{
					//run animation
					this.playAnimation(this.runImgs);
					}
			}			
		}, 1000/60);
	}

	cameraMoveLeft(){
		this.world.camera_x = -this.x + 100;
	}

	isTheEndOfTheLevel(){
		return (this.x >= (this.world.level.level_end_x) && this.x <= (this.world.level.level_end_x + 500));
	}

	runRight(run){
    this.x += run;
    this.otherDirection = false;
  }

	runLeft(run){
    this.x -= run;
    this.otherDirection = true;
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

	// pushAllInterval(){
	// 	this.allIntervalCharacter.push(this.intervalMoveCharacter);
	// 	this.allIntervalCharacter.push(this.intervalPlayCharacter);
	// 	this.allIntervalCharacter.push(this.intervalRunCharacter);
	// 	this.allIntervalCharacter.push(this.intervalPlayRunCharacter);
	// }


}
