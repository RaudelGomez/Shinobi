/**
 * That is the class World that load the game
 */
class World {
	clouds = [new Cloud(), new Cloud(), new Cloud()];
	character = new Character();
	enemies = [new Lizard(), new Lizard(), new Lizard()];
	backgroundObjects = [
		new BackgroundObject("assets/img/stages/1/bridge.png", 0, 80, 370),
		new BackgroundObject("assets/img/stages/1/sea.png", 0, 0, 480),
		new BackgroundObject("assets/img/stages/1/bamboo.png", 0, 80, 370),
    new BackgroundObject("assets/img/stages/1/sea.png", 720, 0, 480),
    
	];
	context;
	canvas;
	keyboard;
  camera_x = 0;

  /**
   * That is the constructor that bring all elements from game.js
   * @param {canvas} canvas - Canvas element where will be painted every img
   * @param {class} keyboard - Class keyboard that has every movement of the player
   */
	constructor(canvas, keyboard) {
		this.context = canvas.getContext("2d");
		this.canvas = canvas;
		this.keyboard = keyboard;
		this.draw();
		this.setWorld();
	}

  /**
   * This function set the world in the character, like this this one has a referenz about what
   * happen in the world and also from the variable keyboard.
   * This here set the complete class world
   */
	setWorld() {
		this.character.world = this;
	}

  /**
   * This function draw every element created before in the canvas
   */
	draw() {
		//Clear canvas
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //moving the context(camera) where the elements in canvas are painted to left, when the canvas is painted
    this.context.translate(this.camera_x, 0);

		this.addObjectsToMap(this.backgroundObjects);
		this.addObjectsToMap(this.clouds);
		this.addToMap(this.character);
		this.addObjectsToMap(this.enemies);
    

    //setting again the context(camera in the before position)
    this.context.translate(-this.camera_x, 0);

		//Draw will be alwys loaded
		let self = this;
		requestAnimationFrame(function () {
			self.draw();
		});
	}

  /**
   * This function add all elements in the array a method to be add in the canvas
   * @param {*} objects - object array to add in the canvas
   */
	addObjectsToMap(objects) {
		objects.forEach((ob) => {
			this.addToMap(ob);
		});
	}

  /**
   * That function drawImage is a method of getContext that allow to paint something in the canvas *element. It required img path, x and y.
   * drawImage(image, dx, dy, dWidth, dHeight)
   * @param {*} mo - That is the object that it will be change of posotion/Mirrow effet
   */
	addToMap(mo) {
		if (mo.otherDirection) {
			this.flipImage(mo);
		}
		this.context.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
		if (mo.otherDirection) {
			this.flipImageBack(mo);
		}
	}

  /**
   * This function saves the canvas before make mirrow of the canvas, because with restore later, * like this it could be like before the mirrow effect.
   * @param {*} mo - That is the object that it will be change of posotion/Mirrow effet
   */
	flipImage(mo) {
		this.context.save();
    //Mirrow of the object.
		this.context.translate(mo.width, 0);
		this.context.scale(-1, 1);
		mo.x = mo.x * -1;
	}

  /**
   * This function restores the mirrow effect of the canvas
   * @param {object} mo - That is the object that it will be change of posotion/Mirrow effet
   */
	flipImageBack(mo) {
		mo.x = mo.x * -1;
		this.context.restore();
	}
}
