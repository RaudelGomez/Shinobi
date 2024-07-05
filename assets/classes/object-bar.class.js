class ObjectBar extends StatusBar{
  SpellImages = [
    'assets/img/spell-bar/0.png',
    'assets/img/spell-bar/20.png',
    'assets/img/spell-bar/40.png',
    'assets/img/spell-bar/60.png',
    'assets/img/spell-bar/80.png',
    'assets/img/spell-bar/100.png',
  ];
  percentage = 80;
  x = -10;
  y = 50;
  width = 240;
  height = 120;

  constructor(){
    super();
    this.loadImages(this.SpellImages);
    this.setPercentage(this.percentage, this.SpellImages);
  }
}