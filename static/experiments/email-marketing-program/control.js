document.documentElement.classList.remove('modal-open');
const loader = document.getElementById("installed-loader");
if (loader) {
  loader.hidden = true;
}
const overlay = document.getElementById("installed-blur-overlay");
if (overlay) {
  overlay.hidden = true;
}
