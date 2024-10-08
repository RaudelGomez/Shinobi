/**
 * This is the class World that loads the game.
 */
class World {
  character = new Character();
  level = level1;
  context;
  canvas;
  keyboard;
  camera_x = 0;
  healthbar = new HealthBar();
  healthbarEndboss = new HealthBarEndBoss();
  objetbar = new ObjectBar();
  spellbar = new SpellBar();
  spellEnemy = new SpellEnemy();
  gameOver = new Screen(this.camera_x, 1000, 'assets/img/backgroundGame/game_over.jpg');
  youWon = new Screen(this.camera_x, 1000, 'assets/img/backgroundGame/youWin.png');
  throwedObject = [];
  throwedSpell = [];
  arraySpellEnemy = [];
  allIntervalGame = [];
  
  /**
   * Constructor that initializes all elements from game.js
   * That load the keyboard to be used to move. Draw every imgs in the world and check when chaacter, enemies and objects make a collision
   * @param {HTMLCanvasElement} canvas - Canvas element where every image will be painted
   * @param {Object} keyboard - Class keyboard that has every movement of the player
   */
  constructor(canvas, keyboard) {
    this.context = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.checkCollisions();
    this.checkOtherStatement();
    this.takeObject(this.level.lifeBottles);
    this.takeObject(this.level.throwableObjects);
    this.takeObject(this.level.spellObjects);
    this.pushAllIntervalGame();
    this.setWorld();
  }

  /**
   * Displays the game over screen after a delay.
   */
  showGameOver() {
    setTimeout(() => {
      this.gameOver.x = -this.camera_x;
      this.gameOver.y = 0;
    }, 3000);
  }

  /**
   * Collects all intervals of the game.
   */
  pushAllIntervalGame() {
    this.pushAllInterval(this.allIntervalGame, this.character.allIntervalCharacter);
    this.collectIntervalClouds();
    this.collectIntervalEnemies();
    this.allIntervalGame.push(this.intervalCollisions);
    this.allIntervalGame.push(this.intervalCollisionChecked);
    this.allIntervalGame.push(this.intervalOtherStatement);
    this.allIntervalGame.push(this.intervalObjectTaked);
  }

  /**
   * Collects intervals of enemies.
   */
  collectIntervalEnemies() {
    this.level.enemies.forEach(e => {
      this.allIntervalGame.push(e.intervalAnimation);
      if (e.intervalMove) {
        this.allIntervalGame.push(e.intervalMove);
      }
      if (e.intervalAnimationDeath) {
        this.allIntervalGame.push(e.intervalAnimationDeath);
      }
      if (e.intervalCloseCharacter) {
        this.allIntervalGame.push(e.intervalCloseCharacter);
      }
      if (e.intervalEndBossAttack) {
        this.allIntervalGame.push(e.intervalEndBossAttack);
      }
    });
  }

  /**
   * Collects intervals of clouds.
   */
  collectIntervalClouds() {
    this.level.clouds.forEach((c) => {
      this.allIntervalGame.push(c.intervalClouds);
    });
  }

  /**
   * Sets the world for the character and last enemy.
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies[this.level.enemies.length - 1].world = this;
  }

  /**
   * Pushes all intervals into the provided array.
   * @param {Array} allInterval - Array to store intervals
   * @param {Array} arrayInterval - Array of intervals to be added
   */
  pushAllInterval(allInterval, arrayInterval) {
    arrayInterval.forEach(iv => {
      allInterval.push(iv);
    });
  }

  /**
   * Checks if the game is over.
   */
  isGameOver() {
    if (this.character.life <= 0) {
      this.showGameOver();
    }
  }

  /**
   * Sets up collision checking intervals.
   */
  checkCollisions() {
    this.intervalCollisions = setInterval(() => {
      this.checkThrow();
      this.checkSpell();
      this.collisionEnemySpell(this.throwedSpell);
      this.collisionEnemySpell(this.throwedObject);
    }, 1000 / 60);

    this.intervalCollisionChecked = setInterval(() => {
      this.collisionChecked();
    }, 200);
  }

  /**
   * Sets up other game state checking intervals.
   */
  checkOtherStatement() {
    this.intervalOtherStatement = setInterval(() => {
      this.checkCharacterDamageSpell();
      this.jumpingOnEnemy();
      this.isGameOver();
    }, 1000 / 60);
  }

  /**
   * Checks collisions between character and enemies.
   */
  collisionChecked() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && enemy.life > 0 && this.character.life > 0) {
        if (enemy instanceof Endboss) {
          enemy.endBossSequenceAttackLevel1();
        } else {
          enemy.animate(enemy.attackImgs);
          enemy.soundEnemyAttack();
        }
        this.character.hit();
        this.healthbar.setPercentage(this.character.life);
      }
    });
  }

  /**
   * Checks if character is jumping on an enemy.
   */
  jumpingOnEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && this.character.life > 0 && this.character.isInTheAir() && enemy.life > 0 && enemy.bigSize == false) {
        enemy.life = 0;
        this.enemyIsNotAlive(enemy);
      }
    });
  }

  /**
   * Handles the event when an enemy is not alive.
   * @param {Object} enemy - The enemy object
   */
  enemyIsNotAlive(enemy) {
    clearInterval(enemy.intervalMove);
    clearInterval(enemy.intervalAnimation);
    enemy.dead(enemy.deadImgs);;
    if (enemy instanceof Endboss) {
      return;
    }
    this.deletingEnemyDestroyed(enemy, 400);
  }

  /**
   * Deletes the destroyed enemy after a specified time.
   * @param {Object} enemy - The enemy object
   * @param {number} timeToDesapear - Time after which the enemy will disappear
   */
  deletingEnemyDestroyed(enemy, timeToDesapear) {
    setTimeout(() => {
      let index = this.level.enemies.indexOf(enemy);
      if (index > -1) {
        this.level.enemies.splice(index, 1);
      }
    }, timeToDesapear);
  }

  /**
   * Checks for collisions between thrown objects/spells and enemies.
   * @param {Array} throwed - Array of thrown objects/spells
   */
  collisionEnemySpell(throwed) {
    for (let i = 0; i < throwed.length; i++) {
      const spell = throwed[i];
      for (let j = 0; j < this.level.enemies.length; j++) {
        const enemy = this.level.enemies[j];
        if (this.isEnemyCollision_isAlive(enemy, spell)) {
          if (enemy instanceof Endboss) {
            this.deleteSpellArrayThrowed(throwed, spell);
          }
          setTimeout(() => {
            this.deleteSpellArrayThrowed(throwed, spell);
          }, 250);
          enemy.life -= enemy.enemyLifeTaked;
          this.healthbarEndboss.setPercentage(enemy.life);
          this.isTheCollisionWithAEndBoss(enemy);
          if (enemy.life <= 0) {
            clearInterval(enemy.intervalAnimateEnemy)
            this.enemyIsNotAlive(enemy);
          }
        }
      }
    }
  }

  /**
   * Deletes a thrown object/spell from the array.
   * @param {Array} throwed - Array of thrown objects/spells
   * @param {Object} spell - The thrown object/spell to be deleted
   */
  deleteSpellArrayThrowed(throwed, spell) {
    let index = throwed.indexOf(spell);
    throwed.splice(index, 1);
  }

  /**
   * Checks if there is a collision between a spell and an enemy.
   * @param {Object} enemy - The enemy object
   * @param {Object} spell - The spell object
   * @returns {boolean} - True if collision and enemy is alive, otherwise false
   */
  isEnemyCollision_isAlive(enemy, spell) {
    return spell.isColliding(enemy) && enemy.life >= 0 && spell.y < 320;
  }

  /**
   * Handles the collision with an Endboss.
   * @param {Object} enemy - The enemy object
   */
  isTheCollisionWithAEndBoss(enemy) {
    if (enemy instanceof Endboss) {
      if (enemy.life <= 100 && enemy.life > 1) {
        enemy.endBossSequenceAttackLevel1();
      }
    }
  }

  /**
   * Checks if the character is damaged by a spell.
   */
  checkCharacterDamageSpell() {
    this.arraySpellEnemy.forEach(spell => {
      if (spell.isCollidingSpell(this.character) && this.level.enemies[this.level.enemies.length - 1].life > 0) {
        this.character.life -= this.spellEnemy.damage;
        this.healthbar.setPercentage(this.character.life);
        this.character.audioVolumeCharacterHurt();
        this.character.playAnimation(this.character.hurtImgs);
      }
    });
  }

  /**
   * Checks if the character is throwing an object.
   */
  checkThrow() {
    if (this.keyboard.s && this.character.throwableObj > 0) {
      if (soundOn) { actionAudio.play(); }
      let newObj = this.throwingObject();
      this.throwedObject.push(newObj);
      this.character.throwableObj -= 1;
      this.character.playAnimation(this.character.throwObjectImages);
      this.objetbar.setPercentage(this.character.throwableObj);
      this.deletingObjectThrowed(newObj, 5000);
    }
  }

  /**
   * Creates a new throwable object.
   * @returns {Object} - The new throwable object
   */
  throwingObject() {
    let newObj;
    let imgObjectThrow = 'assets/img/weapons/44.png';
    if (this.isThePositionRightOrLeft()) {
      newObj = new ThrowableObject(this.character.x + 100, this.character.y, imgObjectThrow);
      newObj.throwRight();
    } else {
      newObj = new ThrowableObject(this.character.x, this.character.y, imgObjectThrow);
      newObj.throwLeft();
    }
    return newObj;
  }

  /**
   * Checks if the character is facing right or left.
   * @returns {boolean} - True if facing right, otherwise false
   */
  isThePositionRightOrLeft() {
    return this.character.otherDirection == false;
  }

  /**
   * Deletes a thrown object after a specified time.
   * @param {Object} newObj - The thrown object
   * @param {number} timeToDesapear - Time after which the object will disappear
   */
  deletingObjectThrowed(newObj, timeToDesapear) {
    setTimeout(() => {
      let index = this.throwedObject.indexOf(newObj);
      if (index > -1) {
        this.throwedObject.splice(index, 1);
      }
    }, timeToDesapear);
  }

  /**
   * Creates a new throwable spell.
   * @returns {Object} - The new throwable spell
   */
  throwingSpell() {
    let newObj;
    let spellImage = "assets/img/weapons/spell-attack/Magic_Attack6.png";
    if (this.isThePositionRightOrLeft()) {
      newObj = new SpellObject(this.character.x + 100, this.character.y + 50, spellImage);
      newObj.throwSpellRight();
    } else {
      newObj = new SpellObject(this.character.x - 100, this.character.y + 50, spellImage);
      newObj.throwSpellLeft();
    }
    return newObj;
  }

  /**
   * Checks if the character is throwing a spell.
   */
  checkSpell() {
    if (this.keyboard.d && this.character.spellObject > 0) {
      if (soundOn) { actionAudio.play(); }
      let newObj = this.throwingSpell();
      this.throwedSpell.push(newObj);
      this.character.spellObject -= 1;
      this.character.playAnimation(this.character.throwObjectImages);
      this.spellbar.setPercentage(this.character.spellObject);
      this.deletingSpellThrowed(newObj, 500);
    }
  }

  /**
   * Deletes a thrown spell after a specified time.
   * @param {Object} newObj - The thrown spell
   * @param {number} timeToDesapear - Time after which the spell will disappear
   */
  deletingSpellThrowed(newObj, timeToDesapear) {
    setTimeout(() => {
      let index = this.throwedSpell.indexOf(newObj);
      if (index > -1) {
        this.throwedSpell.splice(index, 1);
      }
    }, timeToDesapear);
  }

  /**
   * Takes objects and checks for collisions.
   * @param {Array} objs - Array of objects to take
   */
  takeObject(objs) {
    this.intervalObjectTaked = setInterval(() => {
      for (let i = 0; i < objs.length; i++) {
        const obj = objs[i];
        const valueObj = obj.valueTreasure;
        if (this.character.isColliding(obj)) {
          this.soundTakingIbject();
          objs.splice(i, 1);
          this.is_Life_Spell_Object(obj, valueObj);
        }
      }
    }, 1000 / 60);
  }

  /**
   * Checks the type of object taken and updates accordingly.
   * @param {Object} obj - The object taken
   * @param {number} valueObj - The value of the object taken
   */
  is_Life_Spell_Object(obj, valueObj) {
    if (this.isLifeBottle(obj)) {
      this.collectBottle(valueObj);
    }
    if (this.isSomethingThrow(obj)) {
      this.collectObjet(valueObj);
    }
    if (this.isSpellObject(obj)) {
      this.collectSpell(valueObj);
    }
  }

  /**
   * Plays sound when an object is taken.
   */
  soundTakingIbject() {
    if (soundOn) {
      objectTakedAudio.pause() && objectTakedAudio.play();
      objectTakedAudio.play();
      objectTakedAudio.volume = 0.2;
    }
  }

  /**
   * Checks if the object is a life bottle.
   * @param {Object} obj - The object to check
   * @returns {boolean} - True if the object is a life bottle, otherwise false
   */
  isLifeBottle(obj) {
    return obj instanceof LifeBottle;
  }

  /**
   * Collects the life bottle and updates character's life.
   * @param {number} valueObj - The value of the life bottle
   */
  collectBottle(valueObj) {
    this.character.life += valueObj;
    if (this.character.life >= 100) {
      this.character.life = 100;
    }
    this.healthbar.setPercentage(this.character.life);
  }

  /**
   * Checks if the object is throwable.
   * @param {Object} obj - The object to check
   * @returns {boolean} - True if the object is throwable, otherwise false
   */
  isSomethingThrow(obj) {
    return obj instanceof ThrowableObject;
  }

  /**
   * Collects the throwable object and updates the character's throwable objects count.
   * @param {number} valueObj - The value of the throwable object
   */
  collectObjet(valueObj) {
    this.character.throwableObj += valueObj;
    if (this.character.throwableObj >= 100) {
      this.character.throwableObj = 100;
    }
    this.objetbar.setPercentage(this.character.throwableObj);
  }

  /**
   * Checks if the object is a spell object.
   * @param {Object} obj - The object to check
   * @returns {boolean} - True if the object is a spell object, otherwise false
   */
  isSpellObject(obj) {
    return obj instanceof SpellObject;
  }

  /**
   * Collects the spell object and updates the character's spell objects count.
   * @param {number} valueObj - The value of the spell object
   */
  collectSpell(valueObj) {
    this.character.spellObject += valueObj;
    if (this.character.spellObject >= 100) {
      this.character.spellObject = 100;
    }
    this.spellbar.setPercentage(this.character.spellObject);
  }

  /**
   * Draws every element created before in the canvas.
   */
  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.context.translate(-this.camera_x, 0);
    this.addToMap(this.healthbar);
    this.addToMap(this.healthbarEndboss);
    this.addToMap(this.spellbar);
    this.addToMap(this.objetbar);
    this.context.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.lifeBottles);
    this.addObjectsToMap(this.level.throwableObjects);
    this.addObjectsToMap(this.throwedObject);
    this.addObjectsToMap(this.level.spellObjects);
    this.addObjectsToMap(this.throwedSpell);
    this.addObjectsToMap(this.arraySpellEnemy);
    this.addToMap(this.spellEnemy);
    this.addToMap(this.youWon);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addToMap(this.gameOver);
    this.context.translate(-this.camera_x, 0);
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Adds all elements in the array to the map.
   * @param {Array} objects - Array of objects to add to the canvas
   */
  addObjectsToMap(objects) {
    objects.forEach((ob) => {
      this.addToMap(ob);
    });
  }

  /**
   * Draws an object on the canvas, including flipping the image if necessary.
   * @param {Object} mo - The object to be added to the map
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
   * Flips an image horizontally.
   * @param {Object} mo - The object to be flipped
   */
  flipImage(mo) {
    this.context.save();
    this.context.translate(mo.width, 0);
    this.context.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the image flip effect.
   * @param {Object} mo - The object to be restored
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.context.restore();
  }
}

