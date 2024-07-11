class GameOver extends MovableObject{
  width = 720;
  height = 480;
  x;
  y;
  gameOverImg = 'assets/img/backgroundGame/game_over.jpg';
  constructor(x, y){
    super();
    this.x = x
    this.y = y
    this.loadInitialPositionImage(this.gameOverImg);
  }
}