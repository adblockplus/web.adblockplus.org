/* global adblock */

const body = document.querySelector(".premium-motivation-slider-body");
const button = document.querySelector(".premium-motivation-silder-modal-slider__button");
const slider = document.querySelector(".premium-motivation-silder-modal-slider");
const afterImage = document.querySelector(".premium-motivation-slider-image--after");

let isSliding = false;

function onStart (event) {
  event.preventDefault();
  if (!isSliding) isSliding = true;
}

button.addEventListener("mousedown", onStart);
button.addEventListener("touchstart", onStart);

function onEnd () {
  if (isSliding) isSliding = false;
}

document.addEventListener("mouseup", onEnd);
document.addEventListener("touchend", onEnd);

function onMove(event) {
  if (isSliding) {
    const touchX = (event.clientX || event.touches[0].clientX);
    const imageX = afterImage.getBoundingClientRect().left;
    const modalWidth = body.offsetWidth;
    let slidePercentage = (((touchX - imageX) / modalWidth)*100);
    if (slidePercentage < 0) slidePercentage = 0;
    if (slidePercentage > 100) slidePercentage = 100;
    slider.style.left = slidePercentage + "%";
    afterImage.style.width = slidePercentage + "%";
  }
}

body.addEventListener("mousemove", onMove);
body.addEventListener("touchmove", onMove);