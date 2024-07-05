class MovableObject extends DrawableObject {
  yAfterJump = 150;
  otherDirection = false;
  speed = 0.15;
  //Gravity
  speedY = 0;
  acceleration = 2.5; 
 
  //Life
  life = 20;
  lastHit = 0;
  //Treasures
  lifePotion = 0;


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

  isColliding(mo){
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

  runLeft(run){
    this.x -= run;
    this.otherDirection = true;
  }

  runRight(){
    this.x += this.run;
    this.otherDirection = false;
  }

  applyGravity(){
    setInterval(() => {
      if(this.isInTheAir() || this.speedY > 0){
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isInTheAir(){
    return this.y < this.yAfterJump;
  }

  hit(){
    this.life -= 2;
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

  attackNormal(){

  }

  attackSpell(){
    
  }

  hurt(){

  }

  dead(){

  }

  shield(){

  }
}