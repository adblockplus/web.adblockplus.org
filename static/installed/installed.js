
// reusing translated "1 of 4" string by replacing 1 with the current slide
document.querySelectorAll(".installed-slide-progress").forEach((element, index) => {
  element.textContent = element.textContent.replace("1", index + 1);
});

const sidebar = document.querySelector(".installed-sidebar");
const sidebarBreakpoint = window.matchMedia("(min-width: 54rem)");

// show sidebar on large screens, allow toggle on small screens
function hideSidebarOnResize() {
  if (sidebarBreakpoint.matches) sidebar.classList.add("active");
  else sidebar.classList.remove("active");
}

sidebarBreakpoint.addEventListener("change", hideSidebarOnResize);

hideSidebarOnResize();

// enable sidebar toggle on small screens
document.querySelector(".installed-sidebar-toggle").addEventListener("click", event => {
  event.preventDefault();
  sidebar.classList.toggle("active");
});

function gotoSlide(number) {
  document.querySelector(".installed-slide.active").classList.remove("active");
  document.querySelector(`.installed-slide:nth-of-type(${number})`).classList.add("active");
  document.querySelector(".installed-slide-list .active").classList.remove("active");
  document.querySelector(`.installed-slide-list li:nth-of-type(${number}) a`).classList.add("active");
}

// add [data-slide] to enable gotoSlide on any link/button/element
document.querySelectorAll("[data-slide]").forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    gotoSlide(button.dataset.slide);
  });
});

