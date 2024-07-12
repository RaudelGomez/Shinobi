class HealthBar extends StatusBar{
  arrayImages = [
    'assets/img/health-bar/0.png',
    'assets/img/health-bar/20.png',
    'assets/img/health-bar/40.png',
    'assets/img/health-bar/60.png',
    'assets/img/health-bar/80.png',
    'assets/img/health-bar/100.png'
  ];

  constructor(){
    super();
    this.loadImages(this.arrayImages);
    this.setPercentage(this.percentage, this.arrayImages);
  }
}