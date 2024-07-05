class HealthBar extends StatusBar{
  healthImages = [
    'assets/img/health-bar/0.png',
    'assets/img/health-bar/20.png',
    'assets/img/health-bar/40.png',
    'assets/img/health-bar/60.png',
    'assets/img/health-bar/80.png',
    'assets/img/health-bar/100.png'
  ];


  constructor(){
    super();
    this.arrayImages = this.healthImages;
    this.loadImages(this.arrayImages);
    this.setPercentage(this.percentage, this.arrayImages);
  }

  // setPercentage(percentage){
  //   this.percentage = percentage;
  //   let path = this.healthImages[this.resolvePercentageImgs()];
  //   this.img = this.imageCache[path];
  // }
}