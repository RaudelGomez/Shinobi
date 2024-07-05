class ObjectBar extends StatusBar{
  SpellImages = [
    'assets/img/object-bar/0.png',
    'assets/img/object-bar/20.png',
    'assets/img/object-bar/40.png',
    'assets/img/object-bar/60.png',
    'assets/img/object-bar/80.png',
    'assets/img/object-bar/100.png',
  ];
  percentage = 0;
  y = 50;
  height = 50;
 
  constructor(){
    super();
    this.arrayImages = this.SpellImages;
    this.loadImages(this.arrayImages);
    this.setPercentage(this.percentage, this.arrayImages);
  }
}