from pages.basePage import BasePage

DOWNLOAD_BUTTON_HREF = 'a[href*="install"]'
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
    def get_download_button_text(self):
        return self.driver.find_element_by_css_selector(self._download_button_href).get_attribute('innerText')

    def click_download_button(self):
        self.driver.find_element_by_css_selector(self._download_button_href).click()
