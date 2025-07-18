document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tryParam = urlParams.get("try");
  const warningBox = document.querySelector(".warning-box");

  if (!tryParam || tryParam === "1") {
    warningBox.style.display = "none";
  } else if (tryParam === "2") {
    warningBox.style.display = "flex";
  } else if (tryParam === "3" || tryParam > "3") {
    warningBox.classList.add("variant-box--red");
  }
});
