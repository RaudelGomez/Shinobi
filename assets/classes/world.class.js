/**
 * That is the class World that load the game
 */
class World {
	clouds = [new Cloud(), new Cloud(), new Cloud()];
	character = new Character();
	enemies = [new Lizard(), new Lizard(), new Lizard()];
  countStage = 3;
  mirrowEffectBoxEnemy = false;
	backgroundObjects = [
		new BackgroundObject("assets/img/stages/2/bridge.png", this.countStage*720, 80, 370, this.lastStage ),
		new BackgroundObject("assets/img/stages/1/sea.png", this.countStage*720, 0, 480, this.lastStage),
		new BackgroundObject("assets/img/stages/1/bamboo.png", this.countStage*720, 80, 370, this.lastStage),    
	];
	context;
	canvas;
	keyboard;
  camera_x = 0;
  lastStage;
  
  /**
   * That is the constructor that bring all elements from game.js
   * @param {canvas} canvas - Canvas element where will be painted every img
   * @param {class} keyboard - Class keyboard that has every movement of the player
   */
	constructor(canvas, keyboard) {
		this.context = canvas.getContext("2d");
		this.canvas = canvas;
		this.keyboard = keyboard;
    this.settingBackground();
    this.lastStage = this.lastStageMirrowPosition();
		this.draw();
		this.setWorld();
	}

  /**
   * This function changes the position mirrow of the last stage
   * @returns boolean
   */
  lastStageMirrowPosition(){
    let lenghtbackgroundObjects = this.backgroundObjects.length - 1;
    let lastStage = this.backgroundObjects[lenghtbackgroundObjects];
    let mirrowEffect = !lastStage.otherDirection;
    return mirrowEffect;
  }

  /**
   * This function set many times the background
   */
  settingBackground(){
    let self = this;
    for (let i = -1; i < this.countStage; i++) {
      let mirrowEffect = false;
      let setMirrow = self.isEven(i);
      let resultMirrowEffect = self.setMirrowEffect(setMirrow, mirrowEffect);
      // console.log(i);
      // console.log(resultMirrowEffect);
      const bridge = new BackgroundObject("assets/img/stages/1/bridge.png", i*720, 80, 370, resultMirrowEffect);
      const sea = new BackgroundObject("assets/img/stages/1/sea.png", i*720, 0, 480, resultMirrowEffect);
      const bamboo = new BackgroundObject("assets/img/stages/1/bamboo.png", i*720, 80, 370, resultMirrowEffect);
      this.backgroundObjects.push(bridge);
      this.backgroundObjects.push(sea);
      this.backgroundObjects.push(bamboo);
    }
  }

  /**
   * This function return a boolean if the last landscape on the stage is false or true
   * @param {number} variableMirrow - number to control if this is even or odd
   * @param {boolean} result - That is the variable that turn in mirrow or not the landscape on * * the stage
   * @returns boolean
   */
  setMirrowEffect(variableMirrow, result){
    variableMirrow ? result = true : result = false;
    return result;
  }

  /**
   * This function control if the number is even or odd
   * @param {number} num - Number to control if a even or odd
   * @returns 
   */
  isEven(num){
    return num % 2 == 0;
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
