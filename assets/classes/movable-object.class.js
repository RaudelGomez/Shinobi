/**
 * That is the super class for every object that can move
 */
class MovableObject extends DrawableObject {
  /**
	 * That is variable, to move the character to the postion in y after jump
	 */
  yAfterJump = 150;
  /**
   * That is the direction of that element. false: right, true, left
   */
  otherDirection = false;
  /**
   * That is the speed of how fast moves an element.
   */
  speed = 0.15;
  /**
   * That is the speed of how fast fall an element.
   */
  speedY = 0;
  /**
   * That is the acceleration of the element that is falling
   */
  acceleration = 2.5; 
  /**
   * That is a number that save when was the character hitted
   */
  lastHit = 0;
  /**
   * That is the life of enemies and character subclasss
   */
  life = 100;
 
 /**
	 * How many objects and spell has the character to throw
	 */
  throwableObj = 0;
  spellObject = 0;
  /**
   * That is the array of every imgs that will be created to represent every Object that 
   * the character hat to throw
   */
  throwObjectImages = [];
  /**
   * That is the speed of the throwed spell
   */
  speedSpell = 10;
  spellInterval;
  
   /**
   * This function play all Photos in the array and makes animation.
   * @param {string} images - path of the images
   */
  playAnimation(images){
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * That function svave every intrval in an Array
   * @param {[Number]} allInterval - All intervl that will be save in the array
   * @param {[Number]} arrayInteval - Array of interval where every Interval will be saved
   */
  pushAllInterval(allInterval, arrayInteval){
		arrayInteval.forEach(iv => {
      allInterval.push(iv);
    });
	}

  /**
   * That function says if an enemy and the character are colliding
   * @param {object} mo 
   * @returns Boolean
   */
  isColliding(mo){
    return this.x + this.width - this.offset.right > mo.x + mo.offset.left && 
          this.y + this.height - this.offset.bottom > mo.y +mo.offset.top && 
          this.x + this.offset.left < mo.x + mo.width -mo.offset.right && 
          this.y + this.offset.top < mo.y + mo.height -mo.offset.bottom;
  }

  /**
   * That function says if an enemy and  spells are colliding with a character or enemies
   * @param {object} mo 
   * @returns Boolean
   */
  isCollidingSpell(mo){
    return this.x + this.width - this.offset.right > mo.x + mo.offset.left && 
          this.y + this.height - this.offset.bottom > mo.y +mo.offset.top && 
          this.x + this.offset.left < mo.x + mo.width -mo.offset.right && 
          this.y + this.offset.top < mo.y + mo.height -mo.offset.bottom;
  }

  /**
   * Move to the right 
   */
  moveLeft(speed){
      this.x -= speed;
  }

  /**
   * Move to the left 
   */
  moveRight(){
    this.x += this.walk;
    this.otherDirection = false;
  }

  /**
   * Movement ofte spell to the right
   */
  throwSpellRight(){
    let x = this.x;
    this.spellInterval = setInterval(() => {
      this.x += this.speedSpell;
      if(this.x  >= x + 400){
        this.cleanInterval(this.spellInterval);
      }
    }, 1000 / 60);
  }

  /**
   * Movement ofte spell to the left
   */
  throwSpellLeft(){
    let x = this.x;
    this.spellInterval = setInterval(() => {
      this.x -= this.speedSpell;
      //If the x nof the spell is bigger than the initial postion of x + 1200 than stop
      if(this.x  <= x - 400){
        this.cleanInterval(this.spellInterval);
      }
    }, 1000 / 60);
  }

  /**
   * That function clean a interval
   * @param {Number} id 
   * @returns Boolean
   */
  cleanInterval(id){
    return clearInterval(id);
  };

  /**
   * Tahat function pretends to simulate the gravity effect of the real life 
   */
  applyGravity(){
    this.intervalInTheAir = setInterval(() => {
      if(this.isInTheAir() || this.speedY > 0){
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
      this.isGravityOfAnObject();
    }, 1000 / 25);
  }

  /**
   * That function calculates and represent how behave an object, 
   * pretending to simulate the gravity effect of the real life 
   */
  isGravityOfAnObject(){
    if(this instanceof ThrowableObject){
      setInterval(() => {
        if(this.y >= 320){
          this.y = 320;
          this.cleanInterval(this.intervalInTheAir)
        }
      }, 1000 / 60); 
    }
  }

  /**
   * That function says if a character is on the air
   * @returns Boolean
   */
  isInTheAir(){
    if(this instanceof ThrowableObject){
      return true;
    }else{
      return this.y < this.yAfterJump;
    }
  }

  /**
   * That function rest life of the character when he get hitting
   */
  hit(){
    this.life -= 2;
    if(this.life < 0){
      this.life = 0;
    }else{
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * That function says of the character of enemy is dead
   * @returns Boolean
   */
  isDead(){
    return this.life == 0;
  }

  /**
   * That function says if the character was hitted
   * @returns Number - Tha is the number that says how much time passed
   * since the character was hitted.
   */
  isHurt(){
    let timePassed = new Date().getTime() - this.lastHit;//Difference in ms
    timePassed = timePassed / 1000; //Difference in s
    return timePassed < 1;
  }

  /**
   * Animation of a object that was throwed
   */
  animateThrowObject(){
    this.playAnimation(this.throwObjectImages);
	}
}