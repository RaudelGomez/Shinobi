class Character extends MovableObject{
  walkingImgs = [
    'assets/img/characters/Samurai/walk/walk-1.png',
    'assets/img/characters/Samurai/walk/walk-2.png',
    'assets/img/characters/Samurai/walk/walk-3.png',
    'assets/img/characters/Samurai/walk/walk-4.png',
    'assets/img/characters/Samurai/walk/walk-5.png',
    'assets/img/characters/Samurai/walk/walk-6.png',
    'assets/img/characters/Samurai/walk/walk-7.png',
    'assets/img/characters/Samurai/walk/walk-8.png'
  ];
  currentImageWalking = 0;

  constructor(){
    super().loadImage('assets/img/characters/Samurai/walk/walk-1.png');
    this.loadImages(this.walkingImgs);
    this.animate();
  }

  animate(){
    setInterval(() => {
      let i = this.currentImageWalking % this.walkingImgs.length;
      let path = this.walkingImgs[i];
      this.img = this.imageCache[path];
      this.currentImageWalking++;
    }, 150);
  }

  jump(){

  }
}