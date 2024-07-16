/**
 * Thta create an instance of keyboard
 */
class Keyboard {
  left = false; 
  right = false; 
  up = false; 
  down = false; 
  space = false; 
  a = false; 
  s = false; 
  d = false; 

  /**
   * Constructs a new Keyboard instance.
   * Set the events for pressing a key or when that game is playing in a mobile
   */
  constructor() {
    this.pressKeyEvents(); 
    this.pressBtnMobile(); 
  }

  /**
   * Adds event listeners for keydown and keyup events to handle keyboard input.
   */
  pressKeyEvents() {
    window.addEventListener("keydown", (e) => {
      this.keyDownBtn(e); 
    });
    window.addEventListener("keyup", (e) => {
      this.keyUpBtn(e); 
    });
  }

  /**
   * Adds event listeners for touchstart and touchend events to handle mobile button input.
   */
  pressBtnMobile() {
    this.btnMobilePress(); 
    this.btnMobileNoPress(); 
  }

  /**
   * Handles keydown events and sets the corresponding key state to true.
   * @param {KeyboardEvent} e - The keydown event.
   */
  keyDownBtn(e) {
    if (e.keyCode == 39) { 
      this.right = true;
    }
    if (e.keyCode == 37) { 
      this.left = true;
    }
    if (e.keyCode == 38) { 
      this.up = true;
    }
    if (e.keyCode == 40) { 
      this.down = true;
    }
    if (e.keyCode == 32) { 
      this.space = true;
    }
    if (e.keyCode == 65) { 
      this.a = true;
    }
  }

  /**
   * Handles keyup events and sets the corresponding key state to false.
   * @param {KeyboardEvent} e - The keyup event.
   */
  keyUpBtn(e) {
    if (e.keyCode == 39) { 
      this.right = false;
    }
    if (e.keyCode == 37) { 
      this.left = false;
    }
    if (e.keyCode == 38) { 
      this.up = false;
    }
    if (e.keyCode == 40) { 
      this.down = false;
    }
    if (e.keyCode == 32) { 
      this.space = false;
    }
    if (e.keyCode == 65) { 
      this.a = false;
    }
    if (e.keyCode == 83) { 
      this.s = true;
      setTimeout(() => {
        this.s = false;
      }, 10); 
    }
    if (e.keyCode == 68) { 
      this.d = true;
      setTimeout(() => {
        this.d = false;
      }, 10); 
    }
  }

  /**
   * Adds touchstart event listeners for mobile button presses.
   */
  btnMobilePress() {
    document.getElementById('btn-left').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.left = true;
    });
    document.getElementById('btn-right').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.right = true;
    });
    document.getElementById('btn-up').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.up = true;
    });
    document.getElementById('btn-a').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.a = true;
    });
    document.getElementById('btn-s').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.s = true;
    });
    document.getElementById('btn-d').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.d = true;
    });
  }

  /**
   * Adds touchend event listeners for mobile button releases.
   */
  btnMobileNoPress() {
    document.getElementById('btn-left').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.left = false;
    });
    document.getElementById('btn-right').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.right = false;
    });
    document.getElementById('btn-up').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.up = false;
    });
    document.getElementById('btn-a').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.a = false;
    });
    document.getElementById('btn-s').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.s = false;
    });
    document.getElementById('btn-d').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.d = false;
    });
  }
}
