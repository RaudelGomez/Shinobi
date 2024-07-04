class StatusBar extends DrawableObject {
  healthImages = [
    'assets/img/health-bar/0.png',
    'assets/img/health-bar/20.png',
    'assets/img/health-bar/40.png',
    'assets/img/health-bar/60.png',
    'assets/img/health-bar/80.png',
    'assets/img/health-bar/100.png'
  ];
  percentage = 100;

  constructor(){
    super();
    this.x = 30;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.loadImages(this.healthImages);
    this.setPercentage(100);
  }

  setPercentage(percentage){
    this.percentage = percentage;
    let path = this.healthImages[this.resolvePercentageImgs()]
    this.img = this.imageCache[path];
  }

  resolvePercentageImgs(){
    if(this.percentage == 100){
      return 5;
    }else if(this.percentage > 80){
      return 4;
    } else if(this.percentage > 60){
      return 3;
    }else if(this.percentage > 40){
      return 2;
    }else if(this.percentage > 20){
      return 1;
    }else {
      return 0;
    }
  }

}