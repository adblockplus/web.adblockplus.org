function gotoCampaign(number)
{
  document
    .querySelector(".campaign-thumbnail.active")
    .classList.remove("active");

  document
    .querySelectorAll(".campaign-thumbnail")[number]
    .classList.add("active");

  document
    .querySelector(".campaign.active")
    .classList.remove("active");

  document
    .querySelectorAll(".campaign")[number]
    .classList.add("active");

  gotoSlide(0);
}

function gotoSlide(number)
{
  document
    .querySelector(".campaign.active .campaign-slide.active")
    .classList.remove("active");

  document
    .querySelectorAll(".campaign.active .campaign-slide")[number]
    .classList.add("active");

  document
    .querySelector(".campaign.active .campaign-slide-control.active")
    .classList.remove("active");

  document
    .querySelectorAll(".campaign.active .campaign-slide-control")[number]
    .classList.add("active");
}

function previousSlide()
{
  var activeSlideNumber = parseInt(
    document
      .querySelector(".campaign.active .campaign-slide.active")
      .getAttribute("data-index"),
    10
  );

  if (activeSlideNumber > 0)
    gotoSlide(activeSlideNumber - 1);
}

function nextSlide()
{
  var activeSlideNumber = parseInt(
    document
      .querySelector(".campaign.active .campaign-slide.active")
      .getAttribute("data-index"),
    10
  );

  var activeSlidesLength = document
    .querySelectorAll(".campaign.active .campaign-slide")
    .length;

  if (activeSlideNumber < (activeSlidesLength - 1))
    gotoSlide(activeSlideNumber + 1);
}

// @from https://stackoverflow.com/a/11582513
function getURLParameter(name)
{
  return decodeURIComponent(
    (
      new RegExp(
        '[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)'
      ).exec(
        location.search
      ) ||
        [null, '']
    )[1]
      .replace(/\+/g, '%20')
  ) || null;
}

var UTM_SOURCES = {
  "the_skateboard": 0,
  "the_party": 1,
  "the_ring": 2,
  "the_kitchen": 3
};

document.addEventListener("DOMContentLoaded", function()
{
  var utmContent = parseInt(
    UTM_SOURCES[getURLParameter("utm_content")],
    10
  );

  if (utmContent)
    gotoCampaign(utmContent);
});

document.addEventListener("click", function(event)
{
  var parent = event.target.parentNode;

  if (!event.target.classList.contains("dropdown"))
  {
    var activateParentSibling = false;

    if (parent.classList.contains("social-icon"))
    {
      var parentSibling = event.target.parentElement.nextElementSibling;

      if (!parentSibling.classList.contains("active"))
        activateParentSibling = true;
    }

    var activeSocialDropdowns = document.querySelectorAll(".dropdown.active");

    for (var i = 0; i < activeSocialDropdowns.length; i++)
    {
      activeSocialDropdowns[i].classList.remove("active");
    }

    if (activateParentSibling)
    {
        parentSibling.classList.add("active");
        event.preventDefault();
    }
  }
});
