class Character extends MovableObject {
	/**
	 * imgs of every movement of the character
	 */
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
	 /**
   * The variables, that dont have comment, its because it was explained in 
   * the super class (Drawable-objects or Movableobjects)
   */
	x = 100;
	y = 190;
	yAfterJump = 190;
	height = 150;
	width = 90;
	world;
	/**
	 * How may pixels moves the character when he walk
	 */
	walk = 10;
	/**
	 * How may pixels moves the character when he run
	 */
	run = 15;
	/**
	 * That is the current image when the character is running
	 */
	currentImageRun = 0;
	offset = {
		top: 0,
		right: 10,
		bottom: 0,
		left: 40,
	};
	/**
	 * All intervlas of the character
	 */
	allIntervalCharacter = [];
	throwableObj = 0;
	spellObject = 0;

	/**
	 * That is the function tha run every function when the instance is created.
	 */
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

	/**
	 * This function load every images of the character
	 */
	loadAllImgs(){
		this.loadInitialPositionImage(this.idleImg);
		this.loadImages(this.walkingImgs);
		this.loadImages(this.runImgs);
		this.loadImages(this.jumpImgs);
		this.loadImages(this.hurtImgs);
		this.loadImages(this.deadImgs);
		this.loadImages(this.throwObjectImages);
	}

	/**
	 * This function animate the character when he is walking
	 */
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

	/**
	 * This function animate the character when he is running
	 */
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

	/**
	 * This function animate the character when he is jumping
	 */
	animationRuningJumping(){
		if (
			(this.world.keyboard.right && this.world.keyboard.a) ||
			(this.world.keyboard.left && this.world.keyboard.a)
		) {
			//run animation
			this.playAnimation(this.runImgs);
		}
	}

	/**
	 * This function animate the character when he is walking
	 */
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

	/**
	 * This function move the character when he is running
	 */
	isRunningToRight(){
		if (this.world.keyboard.a && this.isMovingRight_notEndScreenYet()) {
			this.runRight(this.run);
			if (soundOn) {
				run_sound.play();
			}
		}
	}

	/**
	 * This function move to left the character when he is jumping
	 */
	isJumpingAndMoveToLeft(){
		if ( this.world.keyboard.a && this.isMovingLeft_notEndScreenYet()) {
			this.runLeft(this.run);
			if (soundOn) {
				run_sound.play();
			}
		}
	}

	/**
	 * This function play audio and animation when the character get hurt
	 */
	itsGettingHurt(){
		if (this.isHurt()) {
			this.audioVolumeCharacterHurt();
			this.playAnimation(this.hurtImgs);
		}
	}

	/**
	 * This function play the audio character when he is getting hurt
	 */
	audioVolumeCharacterHurt(){
		if (soundOn) {
			hurtAudio.play();
			hurtAudio.volume = 0.1;
		}
	}

	/**
	 * This function animate the character when he is walking or running and he is on the air
	 */
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
	/**
	 * This function is the animation and audio when the character is dead
	 */
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

	/**
	 * This function is the animation of he character when he moves, and dont allow the character go 
	 * to the left when the way is over
	 */
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

	/**
	 * This function is to know if the character is at the end of the screen of the right place in th screen
	 * @returns @params {Boolean}
	 */
	isMovingRight_notEndScreenYet(){
		return this.world.keyboard.right && this.x < this.world.level.level_end_x + 400;
	}

	/**
	 * This function is to know if the character is at the end of the screen of the left place in th screen
	 * @returns @params {Boolean}
	 */
	isMovingLeft_notEndScreenYet(){
		return this.world.keyboard.left && this.x > -600;
	}

	/**
	 * That stop sound run and play walking of the character
	 */
	stopMusicRunWalk(){
		if (soundOn) {
			run_sound.pause();
			walk_sound.pause();
		}
	}

	/**
	 * That function move the characte to the right if he is not
	 * at the end of the screen und play the sound of walking
	 */
	walkingToRight(){
		if (this.isMovingRight_notEndScreenYet()) {
			this.moveRight();
			if (soundOn) {
				walk_sound.play();
			}
		}
	}

	/**
	 * That function move the characte to the left if he is not
	 * at the end of the screen und play the sound of walking
	 */
	walkingToLeft(){
		if (this.isMovingLeft_notEndScreenYet()) {
			this.moveLeft(this.walk);
			this.otherDirection = true;
			if (soundOn) {
				walk_sound.play();
			}
		}
	}

	/**
	 * This function is to know if the character is jumping
	 * @returns @params {Boolean}
	 */
	isJumping(){
		return this.world.keyboard.up && !this.isInTheAir();
	}

	/**
	 * That function makes te character jump and play the audio of jump
	 */
	jumping(){
		if (this.isJumping()) {
			if (soundOn) {
				actionAudio.play();
			}
			this.jump();
		}
	}

	/**
	 * That function move the camera when the character moves
	 */
	cameraMoveLeft() {
		this.world.camera_x = -this.x + 100;
	}

		/**
	 * This function is to know if the character is at the end of the Level
	 * @returns @params {Boolean}
	 */
	isTheEndOfTheLevel() {
		return (
			this.x >= this.world.level.level_end_x &&
			this.x <= this.world.level.level_end_x + 500
		);
	}

	/**
	 * That function move the character to right
	 * @param {Number} run - That is the number how many pixels the character moves when he is running
	 */
	runRight(run) {
		this.x += run;
		this.otherDirection = false;
	}

	/**
	 * That function move the character to left
	 * @param {Number} run - That is the number how many pixels the character moves when he is running
	 */
	runLeft(run) {
		this.x -= run;
		this.otherDirection = true;
	}

	/**
	 * That function move the character up.  
	 * That is the number how many pixels the character moves when he is jumping
	 */
	jump() {
		this.speedY = 30;
		this.y = this.yAfterJump;
	}

	/**
	 * That function stop all intervals of the character
	 */
	stopintervalCharacter() {
		this.allIntervalCharacter.forEach((id) => {
			clearInterval(id);
		});
	}
}
