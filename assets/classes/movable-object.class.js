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

  /**
   * This function load one images
   * @param {string} path - path of the image to load 
   */
  loadImage(path){
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
   * This function play all Photos in the array and makes animation.
   * @param {string} images - path of the images
   */
  playAnimation(images){
    let i = this.currentImageWalking % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImageWalking++;
  }

  /**
   * Move to the right of the images
   */
  moveLeft(){
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  moveRight(){
    this.x += this.walk;
    this.otherDirection = false;
    this.walk_sound.play();
  }

  runLeft(){
    this.x -= this.run;
    this.otherDirection = true;
    this.run_sound.play();
  }

  runRight(){
    this.x += this.run;
    this.otherDirection = false;
    this.run_sound.play();
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