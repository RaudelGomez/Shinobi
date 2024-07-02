class MovableObject {
  x = 100;
  y = 150;
  img;
  height = 200;
  width = 100;
  currentImageWalking = 0;
  imageCache = {};
  speed = 0.15;

  loadImage(path){
    this.img = new Image(); //this.img = document.getElementById('image') <img id="image" src="">
    this.img.src = path;
  }

  loadImages(imgArray){
    imgArray.forEach(path => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  walkRight(){
    console.log('Move right');
  }

  moveLeft(){
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  runRight(){

  }

  runLeft(){

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