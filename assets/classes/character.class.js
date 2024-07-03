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
		this.animate();
		this.animationRun();
	}

	animate() {
		//Condition inside if to move
		setInterval(() => {
      this.run_sound.pause();
      this.walk_sound.pause();
			if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
				//Move right
				this.x += this.walk;
				this.otherDirection = false;
        this.walk_sound.play();
			}

			if (this.world.keyboard.left && this.x > -600) {
				//Move left
				this.x -= this.walk;
				this.otherDirection = true;
        this.walk_sound.play();
			}
      this.world.camera_x = -this.x + 100;
		}, 100);

		setInterval(() => {
			if (this.world.keyboard.right || this.world.keyboard.left) {
				//Walk animation
				this.playAnimation(this.walkingImgs);
			}
		}, 150);
	}

	animationRun() {
    this.walk_sound.pause();
    this.run_sound.pause();
		setInterval(() => {
			if (this.world.keyboard.right && this.world.keyboard.run && this.x < this.world.level.level_end_x) {
				//Run animation
				this.x += this.run;
				this.otherDirection = false;
        this.run_sound.play();
			}

			if (this.world.keyboard.left && this.world.keyboard.run && this.x > -600) {
				//Run animation
				this.x -= this.run;
				this.otherDirection = true;
        this.run_sound.play();
			}
      this.world.camera_x = -this.x + 100;
		}, 1000 / 60);

		setInterval(() => {
			//Condition inside if to move
			if (
				(this.world.keyboard.right && this.world.keyboard.run) ||
				(this.world.keyboard.left && this.world.keyboard.run)
			) {
				//run animation
				this.playAnimation(this.runImgs);
			}
		}, 40);
	}

	jump() {}
}
