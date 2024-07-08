class Level extends DrawableObject{
  clouds;
  enemies;
  backgroundObjects;
  level_end_x = (this.countStage * 720) + 90;
  lifeBottles;
  throwableObjects;
  spellObjects;
  world;
  

  constructor(clouds, enemies, backgroundObjects, lifeBottles, throwableObjects, spellObjects){
    super();
    this.clouds = clouds;
    this.enemies = enemies;
    this.backgroundObjects = backgroundObjects;
    this.lifeBottles = lifeBottles;
    this.throwableObjects = throwableObjects;
    this.spellObjects = spellObjects;
    this.settingBackground();
  }

  /**
   * This function set many times the background
   */
  settingBackground(){
    for (let i = -1; i < this.countStage; i++) {
      let mirrowEffect = false;
      let setMirrow = this.isEven(i);
      let resultMirrowEffect = this.setMirrowEffect(setMirrow, mirrowEffect);
      const bridge = new BackgroundObject("assets/img/stages/1/bridge.png", i*720, 80, 370, resultMirrowEffect);
      const sea = new BackgroundObject("assets/img/stages/1/sea.png", i*720, 0, 480, resultMirrowEffect);
      const bamboo = new BackgroundObject("assets/img/stages/1/bamboo.png", i*720, 80, 370, resultMirrowEffect);
      this.backgroundObjects.push(bridge);
      this.backgroundObjects.push(sea);
      this.backgroundObjects.push(bamboo);
      //Seting the landscape of the box level
      if(this.countStage -1){
        this.setBoxLevel(i, resultMirrowEffect);
      }
    }
  }

  /**
   * This function set the stage of the box level
   * @param {number} i - index of the last part of the stage before the box level enemy
   * @param {boolean} resultMirrowEffect - This boolean give a mirrow effect
   */
  setBoxLevel(i, resultMirrowEffect){
    const bridge = new BackgroundObject("assets/img/stages/2/bridge.png", (i+1)*720, 80, 370, !resultMirrowEffect);
    const sea = new BackgroundObject("assets/img/stages/1/sea.png", (i+1)*720, 0, 480, !resultMirrowEffect);
    const bamboo = new BackgroundObject("assets/img/stages/1/bamboo.png", (i+1)*720, 80, 370, !resultMirrowEffect);
    this.backgroundObjects.push(bridge);
    this.backgroundObjects.push(sea);
    this.backgroundObjects.push(bamboo);
  }

    /**
   * This function return a boolean if the last landscape on the stage is false or true
   * @param {number} variableMirrow - number to control if this is even or odd
   * @param {boolean} result - That is the variable that turn in mirrow or not the landscape on * * the stage
   * @returns boolean
   */
    setMirrowEffect(variableMirrow, result){
      variableMirrow ? result = true : result = false;
      return result;
    }
  
    /**
     * This function control if the number is even or odd
     * @param {number} num - Number to control if a even or odd
     * @returns 
     */
    isEven(num){
      return num % 2 == 0;
    }
}