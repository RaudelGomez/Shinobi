class Lizard extends Enemy{
  y = 100;
  height = 400;
  width = 400;

  constructor(){
    super().loadImage('assets/img/enemies/lizard/Walk1.png');
    this.x = 200 + Math.random() * 500;
  }
}