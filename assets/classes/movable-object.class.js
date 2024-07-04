class MovableObject extends VariableUtil {
  x = 100;
  y = 150;
  yAfterJump = 150;
  img;
  height = 200;
  width = 100;
  currentImageWalking = 0;
  imageCache = {};
  otherDirection = false;
  speed = 0.15;
  //Gravity
  speedY = 0;
  acceleration = 2.5; 
  //Frame Objects
  offset = {
    top:0,
    right:0,
    bottom: 0,
    left: 0
  } 
  life = 100;
  lastHit = 0;

  /**
   * This function load one images
   * @param {string} path - path of the image to load 
   */
  loadInitialPositionImage(path){
    this.img = new Image(); //this.img = document.getElementById('image') <img id="image" src="">
    this.img.src = path;
  }

  /**
   * This function load every Photos of the array.
   * @param {Array} imgArray - that is the Array of Photos to animate
   */
  loadImages(imgArray){
    imgArray.forEach(path => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * This function draw every image
   * @param {ctx} context - context of Canvas
   */
  draw(context){
    context.drawImage(this.img, this.x, this.y, this.width, this.height);
  };

  /**
   * This function draw the frame of every images
   * @param {*} context - context of Canvas
   */
  drawFrame(context){
    //Drawing only instance of Character or Enemy
    if(this instanceof Character || this instanceof Enemy ){
      // context.beginPath();
      // context.lineWidth = "4";
      // context.strokeStyle = "blue";
      // context.rect(this.x, this.y, this.width, this.height);
      // context.stroke();

      context.beginPath();
      context.lineWidth = "4";
      context.strokeStyle = "red";
      context.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right- this.offset.left, this.height - this.offset.bottom - this.offset.top);
      context.stroke();
    }
  }

  /**
   * This function play all Photos in the array and makes animation.
   * @param {string} images - path of the images
   */
  playAnimation(images){
    let i = this.currentImageWalking % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImageWalking++;
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