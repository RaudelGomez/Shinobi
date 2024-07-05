/**
 * That is the class World that load the game
 */
class World {
	character = new Character();
	level = level1;
	context;
	canvas;
	keyboard;
  camera_x = 0;
	healthbar = new HealthBar();
	spellbar = new SpellBar();
	knifebar = new ObjectBar();
  
  /**
   * That is the constructor that bring all elements from game.js
   * @param {canvas} canvas - Canvas element where will be painted every img
   * @param {class} keyboard - Class keyboard that has every movement of the player
   */
	constructor(canvas, keyboard) {
		this.context = canvas.getContext("2d");
		this.canvas = canvas;
		this.keyboard = keyboard;
		this.setWorld();
		this.draw();
		this.checkCollisions();
		this.takeObject();
	}

  /**
   * This function set the world in the character, like this this one has a referenz about what
   * happen in the world and also from the variable keyboard.
   * This here set the complete class world
   */
	setWorld() {
		this.character.world = this;
	}

	checkCollisions(){
		setInterval(() => {
			this.level.enemies.forEach((enemy)=>{
				if(this.character.isColliding(enemy)){
					this.character.hit();
					this.statusBar.setPercentage(this.character.life);
				}
			});
		}, 200);
	}

	takeObject(){
		setInterval(() => {
			for (let i = 0; i < this.level.treasures.length; i++) {
				const treasure = this.level.treasures[i];
				if(this.character.isColliding(treasure)){
					this.level.treasures.splice(i, 1);
					if(this.character.life <= 90){
						this.character.life += 10;
						this.statusBar.setPercentage(this.character.life);
					}
				}
			}
		}, 200);
	}

  /**
   * This function draw every element created before in the canvas
   */
	draw() {
		//Clear canvas
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //moving the context(camera) where the elements in canvas are painted to left, when the canvas is painted
    this.context.translate(this.camera_x, 0);

		this.addObjectsToMap(this.level.backgroundObjects);
		this.addObjectsToMap(this.level.clouds);

		this.context.translate(-this.camera_x, 0); //Camara back
		//----space for fixing object-------------
		this.addToMap(this.healthbar);
		this.addToMap(this.spellbar);
		this.addToMap(this.knifebar);
		this.context.translate(this.camera_x, 0); //Camara foward

		this.addObjectsToMap(this.level.treasures);
		this.addToMap(this.character);
		this.addObjectsToMap(this.level.enemies);

    
    //setting again the context(camera in the before position)
    this.context.translate(-this.camera_x, 0);

		//Draw will be alwys loaded
    requestAnimationFrame(()=> this.draw());
	}

  /**
   * This function add all elements in the array a method to be add in the canvas
   * @param {object} objects - object array to add in the canvas
   */
	addObjectsToMap(objects) {
		objects.forEach((ob) => {
			this.addToMap(ob);
		});
	}

  /**
   * That function drawImage is a method of getContext that allow to paint something in the canvas *element. It required img path, x and y.
   * drawImage(image, dx, dy, dWidth, dHeight)
   * @param {object} mo - That is the object that it will be change of posotion/Mirrow effet
   */
	addToMap(mo) {
		if (mo.otherDirection) {
			this.flipImage(mo);
		}
		mo.draw(this.context);
		mo.drawFrame(this.context);
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
