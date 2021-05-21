from pages.basePage import BasePage

DOWNLOAD_BUTTON_HREF = 'a[href*="install"]'
DOWNLOAD_BUTTON_HREF_ANDROID = 'a[href*="https://eyeo.to/adblockbrowser/android/abp-website"]'
DOWNLOAD_BUTTON_HREF_IOS = 'a[href*="https://eyeo.to/adblockplus/ios_safari_install/abp-website"]'
DOWNLOAD_BUTTON_HREF_LANG = 'a[href*="chrome_install"]'


class LandingPage(BasePage):

    def __init__(self, driver, is_language_test=False):
        self.driver = driver
        self._download_button_href = DOWNLOAD_BUTTON_HREF
        if is_language_test:
            self._download_button_href = DOWNLOAD_BUTTON_HREF_LANG

    @property
    def get_download_button_link(self):
        return self.driver.find_element_by_css_selector(self._download_button_href).get_attribute('href')

    @property
    def get_download_button_link_android(self):
        return self.driver.find_element_by_css_selector(DOWNLOAD_BUTTON_HREF_ANDROID).get_attribute('href')

    @property
    def get_download_button_link_ios(self):
        return self.driver.find_element_by_css_selector(DOWNLOAD_BUTTON_HREF_IOS).get_attribute('href')

    @property
    def get_download_button_text(self):
        return self.driver.find_element_by_css_selector(self._download_button_href).get_attribute('innerText')

    @property
    def get_download_button_text_android(self):
        return self.driver.find_element_by_css_selector(DOWNLOAD_BUTTON_HREF_ANDROID).get_attribute('title')

    @property
    def get_download_button_text_ios(self):
        return self.driver.find_element_by_css_selector(DOWNLOAD_BUTTON_HREF_IOS).get_attribute('title')

    def click_download_button(self):
        self.driver.find_element_by_css_selector(self._download_button_href).click()

    def click_download_button_android(self):
        self.driver.find_element_by_css_selector(DOWNLOAD_BUTTON_HREF_ANDROID).click()


