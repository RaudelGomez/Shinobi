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
	objetbar = new ObjectBar();
	spellbar = new SpellBar();
	spellEnemy = new SpellEnemy();
	objectTakedAudio = new Audio('assets/audio/getObject.mp3');
	throwedObject = [];
	throwedSpell = [];

  
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
		this.takeObject(this.level.lifeBottles);
		this.takeObject(this.level.throwableObjects);
		this.takeObject(this.level.spellObjects);
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
			this.checkThrow();
			this.checkSpell();
			this.collisionEnemySpell(this.throwedSpell);
			this.collisionEnemySpell(this.throwedObject);
		}, 1000 / 60);

		// Interval collision with enemy hit and attacked
		setInterval(() => {
			this.collisionChecked();
		}, 200);
	}

	collisionChecked(){
		this.level.enemies.forEach((enemy)=>{
			if(this.character.isColliding(enemy)){
				if(enemy instanceof Endboss){
					console.log('boss');
					clearInterval(enemy.intervalAnimation);
					enemy.animate(enemy.attackImgs);
					setTimeout(() => {
						clearInterval(enemy.intervalAnimation);
						enemy.animate(enemy.walkingImgs);
						this.spellEnemy = new SpellEnemy((this.level.enemies[this.level.enemies.length - 1].countStage) * 720 , -80);
						this.spellEnemy.moveLeftSpell();
						setTimeout(() => {		
							clearInterval(this.spellEnemy.intervalSpellBoss);
						}, 2000);
					}, 2000);
					return
				}
				enemy.animate(enemy.attackImgs);
				this.character.hit();
				this.healthbar.setPercentage(this.character.life);
			}
		});
	}

	collisionEnemySpell(throwed){
		for (let i = 0; i < throwed.length; i++) {
			const spell = throwed[i];
			for (let j = 0; j < this.level.enemies.length; j++) {
				const enemy = this.level.enemies[j];
				if(spell.isColliding(enemy)){		
					enemy.life -= enemy.enemyLifeTaked;
					
					if(enemy.life <= 0){
						console.log(enemy.life);
						clearInterval(enemy.intervalMove);
						clearInterval(enemy.intervalAnimation);
						enemy.dead(enemy.deadImgs);
						setTimeout(() => {
							this.level.enemies.splice(j, 1);
						}, 1500);
					}
					if(enemy instanceof Endboss){
						if(enemy.life <= 90){
							clearInterval(enemy.intervalAnimation);
							enemy.animate(enemy.attackImgs);
							(console.log('boss', enemy.life));
						}
					}
				}
			}
		}
	}


	checkThrow(){
		if(this.keyboard.s && this.character.throwableObj > 0){
			this.character.actionAudio.play();
			let newObj;
			if(this.character.otherDirection == false){
				newObj = new ThrowableObject(this.character.x + 100, this.character.y );
				newObj.throwRight();
				
			}else{
				newObj = new ThrowableObject(this.character.x , this.character.y );
				newObj.throwLeft();
			}
			this.throwedObject.push(newObj);
			this.character.throwableObj -= 1;
			this.character.playAnimation(this.character.throwObjectImages);
			this.objetbar.setPercentage(this.character.throwableObj);
			//console.log(this.throwedObject);
		}
	}

	checkSpell(){
		if(this.keyboard.d && this.character.spellObject > 0){
			this.character.actionAudio.play();
			let spellImage = "assets/img/weapons/spell-attack/Magic_Attack6.png";
			let newObj;
			if(this.character.otherDirection == false){
				newObj = new SpellObject(this.character.x + 100, this.character.y + 50, spellImage);
				newObj.throwSpellRight();
			}else{
				newObj = new SpellObject(this.character.x - 100, this.character.y + 50, spellImage);
				newObj.throwSpellLeft();
			}
			this.throwedSpell.push(newObj);
			this.character.spellObject -= 1;
			this.character.playAnimation(this.character.throwObjectImages);
			this.spellbar.setPercentage(this.character.spellObject);
			//deleting spell sent
			setTimeout(() => {
				this.throwedSpell.pop();
			}, 500);
		}
	}


	takeObject(objs){
		setInterval(() => {
			for (let i = 0; i < objs.length; i++) {
				const obj = objs[i];
				const valueObj = obj.valueTreasure;
				if(this.character.isColliding(obj)){
					this.objectTakedAudio.pause();
					this.objectTakedAudio.play();
					this.objectTakedAudio.volume = 0.2;
					objs.splice(i, 1);
					if(this.isLifeBottle(obj)){
						this.collectBottle(valueObj);
					}
					if(this.isSomethingThrow(obj)){
						this.collectObjet(valueObj);
					}
					if(this.isSpellObject(obj)){
						this.collectSpell(valueObj);
					}				
				}
			}
		}, 1000 / 60);
	}

	isLifeBottle(obj){
		return obj instanceof LifeBottle;
	}

	collectBottle(valueObj){
			this.character.life += valueObj;
			if(this.character.life >= 100){
				this.character.life = 100;
			}
			this.healthbar.setPercentage(this.character.life);
	}

	isSomethingThrow(obj){
		return obj instanceof ThrowableObject;
	}

	collectObjet(valueObj){
			this.character.throwableObj += valueObj;
			if(this.character.throwableObj >= 100){
				this.character.throwableObj = 100;
			}
			this.objetbar.setPercentage(this.character.throwableObj);
	}

	isSpellObject(obj){
		return obj instanceof SpellObject;
	}

	collectSpell(valueObj){
		this.character.spellObject += valueObj;
		if(this.character.spellObject >= 100){
			this.character.spellObject = 100;
		}
		this.spellbar.setPercentage(this.character.spellObject);
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
		this.addToMap(this.objetbar);
		this.context.translate(this.camera_x, 0); //Camara foward

		this.addObjectsToMap(this.level.lifeBottles);
		this.addObjectsToMap(this.level.throwableObjects);
		this.addObjectsToMap(this.throwedObject);
		this.addObjectsToMap(this.level.spellObjects);
		this.addObjectsToMap(this.throwedSpell);
		this.addToMap(this.character);
		this.addToMap(this?.spellEnemy);
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
