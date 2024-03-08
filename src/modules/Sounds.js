const SOUNDS = {
  "click-1": new Audio("sounds/click-1.mp3"),
  "click-2": new Audio("sounds/click-2.mp3"),
  "click-3": new Audio("sounds/click-3.mp3")
};

export const playSound = (name) => {
  SOUNDS[name].currentTime = 0;
  SOUNDS[name].play();
};
