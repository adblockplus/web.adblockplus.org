title=About adware
description=What is adware and how to get rid of it
noheading=true

<head>
  <style>
    .separate-section
    {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #ccc;
    }

    .narrow-list-block
    {
      display: inline-block;
      width: 250px;
      margin: 0px 35px 10px 0px;
      vertical-align: top;
    }

    [dir="rtl"] .narrow-list-block
    {
      margin: 0px 0px 10px 35px;
    }

    .narrow-list-block ul
    {
      margin-bottom: 0px;
    }

    .warning
    {
      display: none;
      color: #e11a2c;
    }

    .warning p
    {
      padding: 15px;
      border: 2px solid;
      border-color: #e11a2c;
      background-color: #fff;
    }

    .show-warning .warning
    {
      display: block;
    }

    .icon-header
    {
      vertical-align: middle;
      line-height: 34px;
    }

    .icon-header em
    {
      display: inline-block;
      vertical-align: top;
      text-align: center;
      line-height: 20px;
      margin-right: 7px;
      padding: 7px 0px;
      width: 34px;
      border-radius: 4px;
      color: #fff;
      background-color: #53b044;
      font-weight: bold;
      font-style: normal;
      font-size: 20px;
    }

    #content ul
    {
      margin-top: 10px;
      margin-bottom: 10px;
      padding: 0px;
      position: relative;
    }

    #content ul,
    #content li
    {
      margin-left: 0px;
      margin-right: 0px;
      padding-left: 0px;
      padding-right: 0px;
    }

    #content li
    {
      padding-bottom: 10px;
      line-height: 20px;
      list-style-type: none;
    }

    #content li.icon
    {
      padding: 20px 0px 0px 40px;
      overflow: visible;
    }

    [dir="rtl"] #content li.icon
    {
      padding: 20px 40px 0px 0px;
    }

    li.icon::before
    {
      content: " ";
      position: absolute;
      left: 0px;
      right: auto;
      height: 20px;
      width: 40px;
    }

    [dir="rtl"] li.icon::before
    {
      right: 0px;
      left: auto;
    }

    li.icon.check::before
    {
      background: url("/img/check.png") no-repeat center top;
    }

    li.icon.cross::before
    {
      background: url("/img/cross.png") no-repeat center top;
    }

    li.icon.cross strong
    {
      color: #e11a2c;
    }
  </style>

  <script type="text/javascript">
    document.addEventListener("DOMContentLoaded", function()
    {
      if (window.location.search.indexOf("warning=true") == 1)
      {
        if ("classList" in document.body)
          document.body.classList.add("show-warning")
        else
          document.body.className += " show-warning";
      }
    }, false);
  </script>
</head>

# {{page-header I’m using <fix>Adblock Plus</fix> but I still see suspicious ads}}

<div class="warning" markdown="1">
## {{alert-heading What happened?}}

{{alert-content <fix>Adblock Plus</fix> has detected ads that are likely injected with Adware, which may have infected your computer.}}
</div>

## {{what-is-adware-heading What is Adware?}}

{{what-is-adware-content Adware is one type of Malware, short for "Malicious Software.” It is a term generally used for software installed on your computer that is designed to infiltrate or damage a computer system without your consent. In many cases you obtained this software without knowing it, as these applications are often bundled in other software installers.}}

## {{why-not-blocked-heading Why doesn't <fix>Adblock Plus</fix> block these ads?}}

{{why-not-blocked-content <fix>Adblock Plus</fix> is designed to block ads that are delivered from websites or their advertising partners. Malicious software can inject ads in such a way that the ads can not reliably be blocked by <fix>Adblock Plus</fix>. The best way to stop these ads is to remove the Malware that displays them.}}

## {{how-to-solve-heading How can I solve this?}}

### *1* {{remove-unwanted-programs-heading Get rid of unwanted programs}} { .separate-section .icon-header }

{{remove-unwanted-programs-content For users unfamiliar with the administration of their computer's operating system, it’s recommended to run automated checks for Malware with one of the programs listed below, which also allow to remove the found unwanted software. All of the programs are free (for at least a trial period) with full functionality, and safe to install alongside your antivirus solution.}}

<div class="narrow-list-block" markdown="1">

#### Windows

* <a href="https://www.malwarebytes.com/">{{malwarebytes-brand[Malware bytes brand name] <fix>Malwarebytes</fix>}}</a>
* [{{hitmanpro-brand[Hitman Pro brand name] <fix>HitmanPro</fix>}}](http://www.surfright.nl/hitmanpro)
* [{{adwcleaner-brand[AdwCleaner brand name] <fix>AdwCleaner</fix>}}](https://toolslib.net/downloads/viewdownload/1-adwcleaner/)

</div>
<div class="narrow-list-block" markdown="1">

#### OS X

* <a href="https://www.malwarebytes.com/">{{malwarebytes-brand}}</a>

</div>

{{advanced-users-content For advanced users, refer to the  guides below to remove Malware and other programs on your computer that you don't remember installing. To regain control of your browsing experience, you must uninstall any malicious programs. For more help on uninstalling malicious programs from your computer, click one of the links below.}}

* [{{windows-brand[Windows brand name] <fix>Windows</fix>}}](http://malwaretips.com/blogs/malware-removal-guide-for-windows/)
* [{{osx-brand[OS X brand name] <fix>OS X</fix>}}](https://support.apple.com/en-us/HT203987)

### *2* {{reset-browser-settings-heading Reset your browser settings}} { .icon-header }

{{reset-browser-settings-content Oftentimes uninstalling unwanted software does not restore your browser settings to their original state. Follow these guides to do this manually:}}

* [{{ie-brand[Internet Explorer brand name] <fix>Internet Explorer</fix>}}](https://support.microsoft.com/en-us/kb/923737)
* [{{firefox-brand[Mozilla Firefox brand name] <fix>Mozilla Firefox</fix>}}](https://support.mozilla.org/kb/reset-firefox-easily-fix-most-problems)
* [{{chrome-brand[Google Chrome brand name] <fix>Google Chrome</fix>}}](https://support.google.com/chrome/answer/3296214)
* [{{opera-brand[Opera brand name] <fix>Opera</fix>}}](http://winaero.com/blog/how-to-reset-opera-browser-settings-to-their-defaults/)
* [{{yandex-brand[Yandex Browser brand name] <fix>Yandex.Browser</fix>}}](https://help.yandex.com/newbrowser/faq/faq-settings.xml#reset)
* [{{safari-6-7[Safari version 6 and 7] <fix>Safari</fix> 6 & 7}}](http://help.coupons.com/articles/177-How-do-I-reset-my-Safari-browser-to-its-default-settings-on-Macintosh)
* [{{safari-8-9[Safari version 8 and 9] <fix>Safari</fix> 8 & 9}}](https://discussions.apple.com/message/26874735)

## {{prevent-infection-heading How do I prevent my computer from getting infected with Malware in the future?}} { .separate-section .icon-header }

* **{{use-official-channels-heading Use official channels to download your browser:}}**
{ .icon .check }
    * [{{firefox-brand}}](http://www.mozilla.org/firefox)
    * [{{chrome-brand}}](https://www.google.com/chrome/browser/desktop/)
    * [{{opera-brand}}](http://www.opera.com/)
    * [{{yandex-brand}}](https://browser.yandex.com/)
* **{{install-abp-heading Install <fix>Adblock Plus</fix>.}}** {{install-abp-content <fix>Adblock Plus</fix> can help to block and hide ads that trick you into installing potentially unwanted programs. Get <fix>Adblock Plus</fix> from}} [https://adblockplus.org/](https://adblockplus.org/).
{ .icon .check }
* **{{update-os-heading Keep your operating system and other software up-to-date.}}**
{ .icon .check }
* **{{avoid-popups-heading Don't click inside misleading pop-up windows.}}**{ .text-danger } {{avoid-popups-content Many malicious websites try to install Malware on your system by making images look like pop-up windows, or by displaying an animation of the website scanning your computer.}}
{ .icon .cross }
* **{{dont-install-untrusted-heading Don't install untrusted software.}}**{: .text-danger} {{dont-install-untrusted-content Some websites offer you software to accelerate your browser, to help you search the web, or to add toolbars that do things your browser already does. Some unwanted programs also come bundled in software packages. Usually, these programs gather information on your browsing behavior that serve only the people who designed them. Make sure you only install add-ons, extensions and plug-ins from your browser’s web store website and that you uncheck unwanted programs in software installation wizards.}}
{ .icon .cross }
