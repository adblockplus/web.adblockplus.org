'use strict';

var interval = document.querySelector(".interval");

interval.addEventListener("click", function() {
  if (interval.dataset.interval === "yearly")
    interval.dataset.interval = "monthly";
  else
    interval.dataset.interval = "yearly";
});

var expandableItems = document.querySelectorAll(".expandable-item a");

expandableItems.forEach(function(item) {
  item.addEventListener("click", function(event) {
    event.preventDefault();

    if (item.parentElement.classList.contains("expanded"))
      item.parentElement.classList.remove("expanded");
    else
      item.parentElement.classList.add("expanded");
  });
});
