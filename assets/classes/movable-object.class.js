class MovableObject extends DrawableObject {
  yAfterJump = 150;
  otherDirection = false;
  speed = 0.15;
  //Gravity
  speedY = 0;
  acceleration = 2.5; 
 
  //Life
  lastHit = 0;
  life = 0;
  //Treasures
  throwableObj = 0;
  spellObject = 0;
  throwObjectImages = [];

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

  pushAllInterval(allInterval, arrayInteval){
		arrayInteval.forEach(iv => {
      allInterval.push(iv);
    });
	}

  isColliding(mo){
    return this.x + this.width - this.offset.right > mo.x + mo.offset.left && 
          this.y + this.height - this.offset.bottom > mo.y +mo.offset.top && 
          this.x + this.offset.left < mo.x + mo.width -mo.offset.right && 
          this.y + this.offset.top < mo.y + mo.height -mo.offset.bottom;
  }

  isCollidingSpell(mo){
    return this.x + this.width - this.offset.right > mo.x + mo.offset.left && 
          this.y + this.height - this.offset.bottom > mo.y +mo.offset.top && 
          this.x + this.offset.left < mo.x + mo.width -mo.offset.right && 
          this.y + this.offset.top < mo.y + mo.height -mo.offset.bottom;
  }

  /**
   * Move to the right of the images
   */
  moveLeft(speed){
      this.x -= speed;
  }

  moveRight(){
    this.x += this.walk;
    this.otherDirection = false;
  }

  throwSpellRight(){
    let x = this.x;
    this.spellInterval = setInterval(() => {
      this.x += this.speedSpell;
      //If the x nof the spell is bigger than the initial postion of x + 1200 than stop
      if(this.x  >= x + 400){
        this.cleanInterval(this.spellInterval);
      }
    }, 1000 / 60);
  }

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

  cleanInterval(id){
    return clearInterval(id);
  };

  applyGravity(){
    this.intervalInTheAir = setInterval(() => {
      if(this.isInTheAir() || this.speedY > 0){
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
      if(this instanceof ThrowableObject){
        setInterval(() => {
          if(this.y >= 320){
            this.y = 320;
            this.cleanInterval(this.intervalInTheAir)
          }
        }, 1000 / 60);
        
      }
    }, 1000 / 25);
  }

  isInTheAir(){
    if(this instanceof ThrowableObject){
      return true;
    }else{
      return this.y < this.yAfterJump;
    }
  }

  hit(){
    this.life -= 100;
    //console.log(this.life);
    if(this.life < 0){
      this.life = 0;
    }else{
      this.lastHit = new Date().getTime();
    }
  }

  isDead(){
    return this.life == 0;
  }

  isHurt(){
    let timePassed = new Date().getTime() - this.lastHit;//Difference in ms
    timePassed = timePassed / 1000; //Difference in s
    return timePassed < 1;
  }

  animateThrowObject(){
    this.playAnimation(this.throwObjectImages);
	}

  hurt(){

  }

  dead(){

  }

  shield(){

  }
}