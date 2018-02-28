"use strict";

(function()
{
  function initLanguageSelection()
  {
    var locale = document.getElementById("navbar-locale-selected");

    // skip if page does not have language selection (EG: blog)
    if (!locale) return;

    locale.addEventListener("click", function()
    {
      document.getElementById("navbar-locale-menu")
        .classList.toggle("visible");
    }, false);
  }

  function navigationClick(event)
  {
    document.getElementById("navbar-menu")
      .classList.toggle("visible");
  }

  function initMenu()
  {
    document.getElementById("navbar-menu-toggle")
      .addEventListener("click", navigationClick, false);
  }

  initLanguageSelection();
  initMenu();
})();

(function()
{
  /**
   * Creats a GDPR compatible video
   * @constructor
   * @param {Element} parent - video parent / container
   * @example
   * <div id="example-video" class="video-parent">
   *   <a
   *     class="video-link"
   *     target="_blank"
   *     href="http://example.com/iframe/video/src">
   *     <img
   *       class="video-thumbnail"
   *       alt="Short description of video"
   *       src="/img/video-thumbnail.png" />
   *     <img
   *       class="video-play"
   *       alt="Open video in separate window""
   *       src="/img/video-link.png" />
   *   </a>
   *   <p class="video-disclaimer">Disclaimer text</p>
   * </div>
   */
  function Video(parent)
  {
    /**
     * Video parent / container element
     * @member {Element}
     */
    this.parent = parent;

    /**
     * The last time that the play button was clicked
     * @member {number}
     */
    this.lastClicked = 0;

    var videoLink = parent.querySelector(".video-link");

    /**
     * The iframe video src url
     * @member {string}
     */
    this.src = videoLink.getAttribute("href");

    //remove disclaimer if disclaimer is shown by default
    this.parent.classList.add("hide-disclaimer");

    //change external link icon into play button icon
    parent.querySelector(".video-play")
      .setAttribute("src", "/img/video-play.png");

    //show disclaimer or replace thumbnail with video on click
    videoLink.addEventListener("click", this._onPlayClick.bind(this));
  }

  Video.prototype = {

    _onPlayClick: function(event)
    {
      event.preventDefault();

      if (this.parent.classList.contains("hide-disclaimer"))
        this.toggleDisclaimer();
      //prevent bypassing the disclaimer via double click
      else if (new Date().getTime() - this.lastClicked > 600)
        this.insertVideo();
    },

    toggleDisclaimer: function()
    {
      this.parent.classList.toggle("hide-disclaimer");
      this.lastClicked = new Date().getTime();
    },

    /** Replace video thumbnail with video iframe */
    insertVideo: function()
    {
      this.parent.classList.add("hide-disclaimer");
      this.parent.classList.add("has-iframe");

      //replace static thumbnail with iframe video
      this.parent.innerHTML =
        "<iframe " +
          "class='video-iframe' " +
          "frameborder=0 " +
          "allowfullscreen " +
          "src='" + encodeURI(this.src) + "'>" +
        "</iframe>";
    }
  };

  window.videos = [].slice.call(document.querySelectorAll(".video-parent"))
    .map(function(parent) {return new Video(parent);});
}());
