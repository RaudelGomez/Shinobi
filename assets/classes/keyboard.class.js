/**
 * Thta create an instance of keyboard
 */
class Keyboard {
  left = false; // Indicates if the left arrow key is pressed
  right = false; // Indicates if the right arrow key is pressed
  up = false; // Indicates if the up arrow key is pressed
  down = false; // Indicates if the down arrow key is pressed
  space = false; // Indicates if the space key is pressed
  a = false; // Indicates if the 'A' key is pressed
  s = false; // Indicates if the 'S' key is pressed
  d = false; // Indicates if the 'D' key is pressed

  /**
   * Constructs a new Keyboard instance.
   */
  constructor() {
    this.pressKeyEvents(); // Initializes keyboard event listeners
    this.pressBtnMobile(); // Initializes mobile button event listeners
  }

  /**
   * Adds event listeners for keydown and keyup events to handle keyboard input.
   */
  pressKeyEvents() {
    window.addEventListener("keydown", (e) => {
      this.keyDownBtn(e); // Handles keydown event
    });
    window.addEventListener("keyup", (e) => {
      this.keyUpBtn(e); // Handles keyup event
    });
  }

  /**
   * Adds event listeners for touchstart and touchend events to handle mobile button input.
   */
  pressBtnMobile() {
    this.btnMobilePress(); // Initializes touchstart event listeners
    this.btnMobileNoPress(); // Initializes touchend event listeners
  }

  /**
   * Handles keydown events and sets the corresponding key state to true.
   * @param {KeyboardEvent} e - The keydown event.
   */
  keyDownBtn(e) {
    if (e.keyCode == 39) { // Right arrow key
      this.right = true;
    }
    if (e.keyCode == 37) { // Left arrow key
      this.left = true;
    }
    if (e.keyCode == 38) { // Up arrow key
      this.up = true;
    }
    if (e.keyCode == 40) { // Down arrow key
      this.down = true;
    }
    if (e.keyCode == 32) { // Space key
      this.space = true;
    }
    if (e.keyCode == 65) { // 'A' key
      this.a = true;
    }
  }

  /**
   * Handles keyup events and sets the corresponding key state to false.
   * @param {KeyboardEvent} e - The keyup event.
   */
  keyUpBtn(e) {
    if (e.keyCode == 39) { // Right arrow key
      this.right = false;
    }
    if (e.keyCode == 37) { // Left arrow key
      this.left = false;
    }
    if (e.keyCode == 38) { // Up arrow key
      this.up = false;
    }
    if (e.keyCode == 40) { // Down arrow key
      this.down = false;
    }
    if (e.keyCode == 32) { // Space key
      this.space = false;
    }
    if (e.keyCode == 65) { // 'A' key
      this.a = false;
    }
    if (e.keyCode == 83) { // 'S' key
      this.s = true;
      setTimeout(() => {
        this.s = false;
      }, 10); // Resets 'S' key state after 10ms
    }
    if (e.keyCode == 68) { // 'D' key
      this.d = true;
      setTimeout(() => {
        this.d = false;
      }, 10); // Resets 'D' key state after 10ms
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
