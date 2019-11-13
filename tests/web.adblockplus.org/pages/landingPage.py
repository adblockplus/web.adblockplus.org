from pages.basePage import BasePage

DOWNLOAD_BUTTON_HREF = 'a[href*="chrome_install"]'


class LandingPage(BasePage):

    def __init__(self, driver):
        self.driver = driver

    @property
    def get_download_button_link(self):
        return self.driver.find_element_by_css_selector(DOWNLOAD_BUTTON_HREF).get_attribute('href')

    @property
    def get_download_button_text(self):
        return self.driver.find_element_by_css_selector(DOWNLOAD_BUTTON_HREF).get_attribute('innerText')

    def click_download_button(self):
        self.driver.find_element_by_css_selector(DOWNLOAD_BUTTON_HREF).click()
