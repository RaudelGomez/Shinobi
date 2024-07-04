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

	constructor() {
		super().loadImage("assets/img/characters/Samurai/walk/walk-1.png");
		this.loadImages(this.walkingImgs);
		this.loadImages(this.runImgs);
		this.loadImages(this.jumpImgs);
		this.animate();
		this.animationRun();
		this.applyGravity();
	}

	animate() {
		//Condition inside if to move
		setInterval(() => {
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
				this.jump();
			}
			
      this.world.camera_x = -this.x + 100;
		}, 100);

		setInterval(() => {
			//Falling when he is in the air
			if(this.isInTheAir()){
				this.playAnimation(this.jumpImgs);
			}else{
				if (this.world.keyboard.right || this.world.keyboard.left) {
					//Walk animation
					this.playAnimation(this.walkingImgs);
				}
			}
		}, 400);
	}

	animationRun() {
    this.walk_sound.pause();
    this.run_sound.pause();
		setInterval(() => {
			if (this.world.keyboard.right && this.world.keyboard.space && (this.x < this.world.level.level_end_x)) {
				this.runRight();
				this.run_sound.play();
			};

			if (this.world.keyboard.left && this.world.keyboard.space && this.x > -600) {
				this.runLeft(this.run);
				this.run_sound.play();
			}

			if(this.world.keyboard.up && !this.isInTheAir()){
				this.jump();
				this.run_sound.play();
			}

      this.world.camera_x = -this.x + 100;
		}, 1000 / 60);

		setInterval(() => {
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
		this.speedY = 25;
		this.y = this.yAfterJump;
	}
}
