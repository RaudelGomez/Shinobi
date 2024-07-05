class SpellBar extends StatusBar{
  SpellImages = [
    'assets/img/spell-bar/0.png',
    'assets/img/spell-bar/20.png',
    'assets/img/spell-bar/40.png',
    'assets/img/spell-bar/60.png',
    'assets/img/spell-bar/80.png',
    'assets/img/spell-bar/100.png',
  ];
  percentage = 0;
  y = 90;
  height = 50;

  constructor(){
    super();
    this.arrayImages = this.SpellImages;
    this.loadImages(this.arrayImages);
    this.setPercentage(this.percentage, this.arrayImages);
  }
}