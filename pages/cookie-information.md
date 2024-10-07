title=Cookies
description=eyeo's use of cookies
noheading=1

# {{ use-of-cookies[heading] Use of cookies on our websites }}

{{ use-of-cookies-1 Our Websites use cookies, which are text files stored on your computer that help us to analyze your use of our Websites and optimize user benefit. If you do not want to enable cookies, you can opt against them by selecting the appropriate settings within your browser. }}

{{ use-of-cookies-2 We also use Google Analytics and Google Optimize to analyze traffic on our website and occasionally perform usability tests. Data stored by Google for these purposes is anonymized and stored in the USA. It is possible that Google may transmit this information to third parties if required by law.<span class="eea-element"> You can deactivate Google Analytics in the settings (below).</span> }}

{{ use-of-cookies-3 Please note that by deactivating any of the above-mentioned settings, the efficiency and range of eyeo's services may be restricted as a result. }}
{: .eea-element}

{{ use-of-cookies-4 You can disable cookies at any time if you do not want to help us improve our products. }}
{: .eea-element}

<div class="dropup cookies-dropup">
  <a class="cookies-settings eea-element">
    {{ change-cookie-settings-label[button label] Change cookie settings }}
  </a>
  <div class="cookies-dropup-menu text-start" tabindex="1">
    <? include cookie-consent/settings ?>
    <span class="arrow"></span>
  </div>
</div>

<? include cookie-consent/script ?>