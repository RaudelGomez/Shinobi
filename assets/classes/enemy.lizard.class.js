class Lizard extends Enemy{
  y = 100;
  height = 400;
  width = 400;
  walkingImgs = [
    'assets/img/enemies/lizard/Walk1.png',
    'assets/img/enemies/lizard/Walk2.png',
    'assets/img/enemies/lizard/Walk3.png',
    'assets/img/enemies/lizard/Walk4.png',
    'assets/img/enemies/lizard/Walk5.png',
    'assets/img/enemies/lizard/Walk6.png',
  ];

  constructor(){
    super().loadImage('assets/img/enemies/lizard/Walk1.png');
    this.x = 200 + Math.random() * 500;
    this.loadImages(this.walkingImgs);
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate()
  }

  animate(){
    this.moveLeft();

    setInterval(() => {
      this.playAnimation(this.walkingImgs);
    }, 200);
  }
}