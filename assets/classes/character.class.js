class Character extends MovableObject {
	idleImg = "assets/img/characters/Samurai/idle/idle.png";
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
		"assets/img/characters/Samurai/jump/jump-12.png",
	];
	deadImgs = [
		// "assets/img/characters/Samurai/dead/dead-1.png",
		// "assets/img/characters/Samurai/dead/dead-2.png",
		"assets/img/characters/Samurai/dead/dead-3.png",
	];
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
	x = 100;
	y = 190;
	yAfterJump = 190;
	height = 150;
	width = 90;
	world;
	walk = 10;
	run = 15;
	currentImageRun = 0;
	offset = {
		top: 0,
		right: 10,
		bottom: 0,
		left: 40,
	};
	allIntervalCharacter = [];
	throwableObj = 0;
	//spellObject = 100;
	spellObject = 0;

	constructor() {
		super();
		this.loadAllImgs()
		this.animate();
		this.animationRun();
		this.applyGravity();
		this.pushAllInterval(this.allIntervalCharacter, [
			this.intervalMoveCharacter,
			this.intervalPlayCharacter,
			this.intervalRunCharacter,
			this.intervalPlayRunCharacter,
			this.intervalInTheAir,
		]);
	}

	loadAllImgs(){
		this.loadInitialPositionImage(this.idleImg);
		this.loadImages(this.walkingImgs);
		this.loadImages(this.runImgs);
		this.loadImages(this.jumpImgs);
		this.loadImages(this.hurtImgs);
		this.loadImages(this.deadImgs);
		this.loadImages(this.throwObjectImages);
	}

	animate() {
		this.movementWalking();
		this.intervalPlayCharacter = setInterval(() => {
			if (this.isDead()) {
				this.isDeadAnimation();
				return;
			}
			this.loadInitialPositionImage(this.idleImg);
			this.itsGettingHurt();
			this.isInTheAir_notRunning();
		}, 90);
	}

	animationRun() {
		this.movementRunning();
		this.intervalPlayRunCharacter = setInterval(() => {
			if (this.isInTheAir()) {
				this.playAnimation(this.jumpImgs);
			} else {
				this.animationRuningJumping();
			}
		}, 1000 / 60);
	}

	animationRuningJumping(){
		if (
			(this.world.keyboard.right && this.world.keyboard.a) ||
			(this.world.keyboard.left && this.world.keyboard.a)
		) {
			//run animation
			this.playAnimation(this.runImgs);
		}
	}

	movementRunning(){
		this.intervalRunCharacter = setInterval(() => {
			this.stopMusicRunWalk();
			this.isRunningToRight();
			this.isJumpingAndMoveToLeft();
			if (this.isTheEndOfTheLevel()) {
				return;
			}
			this.cameraMoveLeft();
		}, 1000 / 60);
	}

	isRunningToRight(){
		if (this.world.keyboard.a && this.isMovingRight_notEndScreenYet()) {
			this.runRight(this.run);
			if (soundOn) {
				run_sound.play();
			}
		}
	}

	isJumpingAndMoveToLeft(){
		if ( this.world.keyboard.a && this.isMovingLeft_notEndScreenYet()) {
			this.runLeft(this.run);
			if (soundOn) {
				run_sound.play();
			}
		}
	}

	itsGettingHurt(){
		if (this.isHurt()) {
			this.audioVolumeCharacterHurt();
			this.playAnimation(this.hurtImgs);
		}
	}

	audioVolumeCharacterHurt(){
		if (soundOn) {
			hurtAudio.play();
			hurtAudio.volume = 0.1;
		}
	}

	isInTheAir_notRunning(){
		if (this.isInTheAir()) {
			this.playAnimation(this.jumpImgs);
		} else {
			if (this.world.keyboard.right || this.world.keyboard.left) {
				//Walk animation
				this.playAnimation(this.walkingImgs);
			}
		}
	}

	isDeadAnimation(){
		this.y = 190;
		this.stopintervalCharacter();
		if (soundOn) {
			musicGame.pause();
			gameOverAudio.volume = 0.3;
			gameOverAudio.play();
		}
		this.playAnimation(this.deadImgs);
		this.cleanInterval(this.world.allIntervalGame);
		this.world.keyboard = "";
	}

	movementWalking(){
		this.intervalMoveCharacter = setInterval(() => {
			this.stopMusicRunWalk();
			this.walkingToRight();
			this.walkingToLeft();
			this.jumping();
			if (this.isTheEndOfTheLevel()) {
				return;
			}
			this.cameraMoveLeft();
		}, 100);
	}

	isMovingRight_notEndScreenYet(){
		return this.world.keyboard.right && this.x < this.world.level.level_end_x + 400;
	}

	isMovingLeft_notEndScreenYet(){
		return this.world.keyboard.left && this.x > -600;
	}

	stopMusicRunWalk(){
		if (soundOn) {
			run_sound.pause();
			walk_sound.pause();
		}
	}

	walkingToRight(){
		if (this.isMovingRight_notEndScreenYet()) {
			this.moveRight();
			if (soundOn) {
				walk_sound.play();
			}
		}
	}

	walkingToLeft(){
		if (this.isMovingLeft_notEndScreenYet()) {
			this.moveLeft(this.walk);
			this.otherDirection = true;
			if (soundOn) {
				walk_sound.play();
			}
		}
	}

	isJumping(){
		return this.world.keyboard.up && !this.isInTheAir();
	}

	jumping(){
		if (this.isJumping()) {
			if (soundOn) {
				actionAudio.play();
			}
			this.jump();
		}
	}

	cameraMoveLeft() {
		this.world.camera_x = -this.x + 100;
	}

	isTheEndOfTheLevel() {
		return (
			this.x >= this.world.level.level_end_x &&
			this.x <= this.world.level.level_end_x + 500
		);
	}

	runRight(run) {
		this.x += run;
		this.otherDirection = false;
	}

	runLeft(run) {
		this.x -= run;
		this.otherDirection = true;
	}

	jump() {
		this.speedY = 30;
		this.y = this.yAfterJump;
	}

	stopintervalCharacter() {
		this.allIntervalCharacter.forEach((id) => {
			clearInterval(id);
		});
	}
}
