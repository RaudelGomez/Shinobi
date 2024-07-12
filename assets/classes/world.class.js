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
	gameOver = new Screen(this.camera_x, 1000, 'assets/img/backgroundGame/game_over.jpg');
	youWon = new Screen(this.camera_x, 1000, 'assets/img/backgroundGame/youWin.png');
	//objectTakedAudio = new Audio('assets/audio/getObject.mp3');
	throwedObject = [];
	throwedSpell = [];
	intervalEndBossAttack;
	allIntervalGame = [];
	
  /**
   * That is the constructor that bring all elements from game.js
   * @param {canvas} canvas - Canvas element where will be painted every img
   * @param {class} keyboard - Class keyboard that has every movement of the player
   */
	constructor(canvas, keyboard) {
		//clearInterval(this.allIntervalGame);
		this.context = canvas.getContext("2d");
		this.canvas = canvas;
		this.keyboard = keyboard;
		this.draw();
		this.checkCollisions();
		this.takeObject(this.level.lifeBottles);
		this.takeObject(this.level.throwableObjects);
		this.takeObject(this.level.spellObjects);
		this.pushAllIntervalGame();
		this.setWorld();
	}

	showGameOver(){
		setTimeout(() => {
			this.gameOver.x = -this.camera_x;
			this.gameOver.y = 0;
		}, 3000);
	}

	pushAllIntervalGame(){
		this.pushAllInterval(this.allIntervalGame, this.character.allIntervalCharacter);
		this.level.clouds.forEach((c)=>{
			this.allIntervalGame.push(c.intervalClouds);
		})
		this.level.enemies.forEach(e=>{
			this.allIntervalGame.push(e.intervalAnimation);
			if(e.intervalMove){
				this.allIntervalGame.push(e.intervalMove);
			}
		})
		this.allIntervalGame.push(this.intervalCollisions);
		this.allIntervalGame.push(this.intervalCollisionChecked);
	}

  /**
   * This function set the world in the character, like this this one has a referenz about what
   * happen in the world and also from the variable keyboard.
   * This here set the complete class world
   */
	setWorld() {
		this.character.world = this;
		this.level.enemies[this.level.enemies.length -1].world = this;
		// this.level.enemies[this.level.enemies.length -1].world = this;
	}

	pushAllInterval(allInterval, arrayInteval){
		arrayInteval.forEach(iv => {
      allInterval.push(iv);
    });
	}

	isGameOver(){
		if(this.character.life <= 0){
			this.showGameOver()
		}
	}


	checkCollisions(){
		this.intervalCollisions = setInterval(() => {
			this.checkThrow();
			this.checkSpell();
			this.collisionEnemySpell(this.throwedSpell);
			this.collisionEnemySpell(this.throwedObject);
			this.checkCharacterDamageSpell();
			this.isGameOver();
		}, 1000 / 60);

		// Interval collision with enemy hit and attacked
		this.intervalCollisionChecked = setInterval(() => {
			this.collisionChecked();
		}, 200);
	}

	collisionChecked(){
		this.level.enemies.forEach((enemy, index)=>{
			if(this.character.isColliding(enemy) && enemy.life > 0 && this.character.life > 0){
				if(enemy instanceof Endboss){
					this.EndBossSequenceAttack(enemy);
				}else{
					enemy.animate(enemy.attackImgs);
				}
				this.character.hit();
				this.healthbar.setPercentage(this.character.life);
			}
			// if(enemy.life <= 0 && !(enemy instanceof Endboss)){
			// 	//clearInterval(enemy.intervalAnimation);
			// 	setTimeout(() => {
			// 		this.level.enemies.splice(index, 1);
			// 	}, 1000);
			// }
		});
	}

	enemyIsNotAlive(enemy){
		clearInterval(enemy.intervalMove);
		clearInterval(enemy.intervalAnimation);
		enemy.dead(enemy.deadImgs);
		setTimeout(() => {
			clearInterval(enemy.intervalAnimation);
		}, 1550);
		if(enemy instanceof Endboss){
			return;
		}
		setTimeout(() => {
			let index = this.level.enemies.indexOf(enemy);
			if (index > -1) {
					this.level.enemies.splice(index, 1);
			}
		}, 800);
	}


	EndBossSequenceAttack(enemy){
		this.intervalEndBossAttack = clearInterval(enemy.intervalAnimation);
			enemy.animate(enemy.attackImgs);
			setTimeout(() => {
				if(enemy.life > 0){
					//console.log(enemy.life);
					if(this.character.x <  enemy.x){
						clearInterval(enemy.intervalAnimation);
						enemy.animate(enemy.walkingImgs);
						this.spellEnemy = new SpellEnemy(enemy.x +190 , 80);
						//this.spellEnemy = new SpellEnemy((this.character.countStage) * 720 + 400 , 80);
						this.spellEnemy.moveLeftSpell();
						setTimeout(() => {		
							clearInterval(this.spellEnemy.intervalSpellBoss);
						}, 20000);
					}
				}
			}, 1900);
	}

	collisionEnemySpell(throwed){
		for (let i = 0; i < throwed.length; i++) {
			const spell = throwed[i];
			for (let j = 0; j < this.level.enemies.length; j++) {
				const enemy = this.level.enemies[j];
				if(spell.isColliding(enemy) && enemy.life >= 0 && spell.y < 320 ){	
					//console.log(enemy.life);	
					enemy.life -= enemy.enemyLifeTaked;
					if(enemy instanceof Endboss){
						console.log(enemy.life);
						if(enemy.life <= 90 && enemy.life >1){
							this.EndBossSequenceAttack(enemy);						
							//clearInterval(this.intervalEndBossAttack);
						}
					}
					if(enemy.life <= 0){
						this.enemyIsNotAlive(enemy);
						
						// clearInterval(enemy.intervalMove);
						// clearInterval(enemy.intervalAnimation);
						// enemy.dead(enemy.deadImgs);
						// setTimeout(() => {
						// 	clearInterval(enemy.intervalAnimation);
						// }, 1550);
						// setTimeout(() => {
						// 	this.level.enemies.splice(j, 1);
						// }, 5000);
					}
					
				}
			}
		}
	}

	checkCharacterDamageSpell(){
		if(this.character.isCollidingSpell(this.spellEnemy)){
			this.character.life -= this.spellEnemy.damage;
			this.healthbar.setPercentage(this.character.life);
			if(soundOn){
				hurtAudio.play();
				hurtAudio.volume = 0.1; 
			}
			this.character.playAnimation(this.character.hurtImgs);
		}
	}


	checkThrow(){
		if(this.keyboard.s && this.character.throwableObj > 0){
			actionAudio.play();
			let newObj;
			let imgObjectThrow = 'assets/img/weapons/44.png';
			if(this.character.otherDirection == false){
				newObj = new ThrowableObject(this.character.x + 100, this.character.y, imgObjectThrow);
				newObj.throwRight();
							
			}else{
				newObj = new ThrowableObject(this.character.x , this.character.y, imgObjectThrow);
				newObj.throwLeft();
			}
			this.throwedObject.push(newObj);
			this.character.throwableObj -= 1;
			this.character.playAnimation(this.character.throwObjectImages);
			this.objetbar.setPercentage(this.character.throwableObj);
			//console.log(this.throwedObject);

			//Deleting the object throwed afet 5s
			setTimeout(() => {
				let index = this.throwedObject.indexOf(newObj);
				if (index > -1) {
						this.throwedObject.splice(index, 1);
				}
			}, 5000);
		}
	}

	checkSpell(){
		if(this.keyboard.d && this.character.spellObject > 0){
			actionAudio.play();
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
					if(soundOn){
						objectTakedAudio.pause();
						objectTakedAudio.play();
						console.log(objectTakedAudio.volume);
						//objectTakedAudio.volume = 0;
					}
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
		this.addToMap(this?.spellEnemy);
		this.addToMap(this.youWon);
		this.addObjectsToMap(this.level.enemies);
		this.addToMap(this.character);
		this.addToMap(this.gameOver);
	    
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
