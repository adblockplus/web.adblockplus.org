
// reusing translated "1 of 4" string by replacing 1 with the current slide
document.querySelectorAll(".installed-slide-progress").forEach((element, index) => {
  element.textContent = element.textContent.replace("1", index + 1);
});

const sidebar = document.querySelector(".installed-sidebar");
const sidebarBody = document.querySelector(".installed-sidebar-body");
const sidebarBreakpoint = window.matchMedia("(min-width: 54rem)");

function showSidebar () {
  sidebar.classList.add("active");
  sidebarBody.hidden = false;
}

function hideSidebar() {
  sidebar.classList.remove("active");
  sidebarBody.hidden = true;
}

function toggleSidebar() {
  sidebar.classList.toggle("active");
  sidebarBody.hidden = !sidebarBody.hidden;
}

// show sidebar on large screens, allow toggle on small screens
function hideSidebarOnResize() {
  if (sidebarBreakpoint.matches) showSidebar();
  else hideSidebar();
}
sidebarBreakpoint.addEventListener("change", hideSidebarOnResize);
hideSidebarOnResize();

// enable sidebar toggle on small screens
document.querySelector(".installed-sidebar-toggle").addEventListener("click", event => {
  event.preventDefault();
  toggleSidebar();
});

// hide sidebar on sidebar link click when sidebar is toggled on small screens
document.querySelectorAll(".installed-sidebar [data-slide]").forEach(button => {
  button.addEventListener("click", () => {
    if (!sidebarBreakpoint.matches && sidebar.classList.contains("active")) {
      hideSidebar();
    }
  });
});

function gotoSlide(number) {
  document.querySelector(".installed-slide:not([hidden])").hidden = true;
  document.querySelector(`.installed-slide:nth-of-type(${number})`).hidden = false;
  document.querySelector(".installed-slide-list .active").classList.remove("active");
  document.querySelector(`.installed-slide-list li:nth-of-type(${number}) a`).classList.add("active");
  history.pushState({slide: button.dataset.slide}, "", `installed#${button.dataset.slide}`);
}

// add [data-slide] to enable gotoSlide on any link/button/element
document.querySelectorAll("[data-slide]").forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    gotoSlide(button.dataset.slide);
  });
});

// allow deep linking to slides via number
if (window.location.hash) {
  try {
    gotoSlide(window.location.hash.replace("#",""));
  } catch (error) {
    // fail quietly
  }
}