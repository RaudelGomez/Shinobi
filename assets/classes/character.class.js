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

	constructor() {
		super().loadImage("assets/img/characters/Samurai/walk/walk-1.png");
		this.loadImages(this.walkingImgs);
		this.loadImages(this.runImgs);
		this.animate(); 
    this.animationRun();   
	}

	animate() {
		setInterval(() => {
      //Condition inside if to move
			if (this.world.keyboard.right) {
        //Move right
        this.x += this.walk;

        //Walk animation
				let i = this.currentImageWalking % this.walkingImgs.length;
				let path = this.walkingImgs[i];
				this.img = this.imageCache[path];
				this.currentImageWalking++;
			}
		}, 100);
	}

  animationRun(){
    setInterval(() => {
      if (this.world.keyboard.right && this.world.keyboard.run) {
        //Run animation
        this.x += this.run;
      }
    }, 60);

    setInterval(() => {
      //Condition inside if to move
			if (this.world.keyboard.right && this.world.keyboard.run) {

        //run animation
				let i = this.currentImageRun % this.runImgs.length;
				let path = this.runImgs[i];
				this.img = this.imageCache[path];
				this.currentImageRun++;
			}
		}, 100);
  }



	jump() {}
}
