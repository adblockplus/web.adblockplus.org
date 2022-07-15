//   Landing Image Text Rewrite Effect
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 5;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = 1500;
    //Determines how long the text sits before deleting.
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

// i18n code sets document.documentElement.dir when translation is complete.
// This value is required for initializing the animation. So we listen for a
// custom pageTranslationComplete event to be dispatched on document.
$(document).on("pageTranslationComplete", function() {
  const elements = document.getElementsByClassName("txt-rotate");
  for (var i = 0; i < elements.length; i++) {
    let translatedArray = [];
    var toRotate = elements[i].getAttribute("data-rotate");
    if (!chrome.i18n._getIsStaticlyTranslated()) {
      var rotateArray = JSON.parse(toRotate);
      translatedArray = rotateArray.map(function(elem) { return translate(undefined, elem) });
    } else {
      const txt_rotate_better = $("#i18n-txt_rotate_better").text();
      const txt_rotate_safer = $("#i18n-txt_rotate_safer").text();
      const txt_rotate_faster = $("#i18n-txt_rotate_faster").text();
      translatedArray.push(txt_rotate_better, txt_rotate_safer, txt_rotate_faster);
    }
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], translatedArray, period);
    }
  }
  // CSS for the "cursor" in the typing animation.
  var css = document.createElement("style");
  css.type = "text/css";
  if (document && document.documentElement && document.documentElement.dir === "rtl") {
    // If text is right-to-left, the cursor should be on the (border-)left.
    css.innerHTML = ".txt-rotate > .wrap { border-left: 0.08em solid #666; z-index: 0; position: relative; }";
  } else {
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666; z-index: 0; position: relative; }";
  }
  document.body.appendChild(css);
});

$(document).ready(function($) {
  // Handles clicks on elements that close/open a sub navigation menu
  $(".submenu-toggle").on("click", function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  
    const $clicked = $(this);
    const $submenu = $(`#${$clicked.attr("aria-controls")}`);
    const isCurrentlyShown = !!$submenu.is(":visible");
    const $submenus = $(".secondary-nav-container");

    $submenus.removeClass("shown");
  
    if (isCurrentlyShown) {
      $submenu.removeClass("shown");
      $clicked.attr("aria-expanded", "false");
    } else {
      $submenu.addClass("shown");
      $clicked.attr("aria-expanded", "true");
    }
  });

  // Handles clicks on hamburger icon to close/open main navigation menu on small screens
  $("#hamburgerMenu").on("click", function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const $clicked = $(this);
    const $submenu = $(`#${$clicked.attr("aria-controls")}`);
    const isCurrentlyShown = !!$submenu.is(":visible");

    if (isCurrentlyShown) {
      $submenu.removeClass("shown");
      $clicked.removeClass("change").attr("aria-expanded", "false");
    } else {
      $submenu.addClass("shown");
      $clicked.addClass("change").attr("aria-expanded", "true");
    }
  });

  // Initialize i18n translator before anything else on the page
  chrome.i18n._initialize("en", "/i18n/_locales/", function() {
      // Function to localize static HTML text using i18n
      localizePage();

      // Let any listeners know that translation is complete so they can act accordingly
      $(document).trigger($.Event("pageTranslationComplete"));
  }); // end i18n callback

  $('.infoCardPanel button.infoCardLearnMore').on("click", function() {
    $(this).closest(".infoCard").addClass("expanded");
    $(this).closest(".infoCard").find(".minimize").focus();
  });

  $('.infoCardPanel .infoIconArea .minimize').on("click", function() {
    $(this).closest(".infoCard").removeClass("expanded");
  });

  // FAQs accordions
  $(".faqElement .question").on("click", function() {
    const answerNumber = $(this).closest(".question").data("faq-item");
    const answerElement = $(`#answer-${answerNumber}`);
    const questionArrow = $(".faqElement .question[data-faq-item=" + answerNumber + "] i.faq-arrow");

    answerElement.toggleClass("visible");
    questionArrow.toggleClass("visible");

    $(".faq-arrow.visible").each(function showAnswer() {
        const $questionBtn = $(this).parent('button');
        const $answer = $(`#${$questionBtn.attr("aria-controls")}`);
        const ariaLabel = $('#i18n-hide_answer').text() || translate(this, "hide_answer");
        $questionBtn.attr("aria-label", ariaLabel);
        $answer.attr("aria-hidden", "false");
    });
    $(".faq-arrow:not(.visible)").each(function hideAnswer() {
        const $questionBtn = $(this).parent('button');
        const $answer = $(`#${$questionBtn.attr("aria-controls")}`);
        const ariaLabel = $('#i18n-show_answer').text() || translate(this, "show_answer");
        $questionBtn.attr("aria-label", ariaLabel);
        $questionBtn.attr("aria-expanded", "false");
        $answer.attr("aria-hidden", "true");
    });
  });
});
