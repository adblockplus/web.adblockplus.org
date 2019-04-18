from pages.basePage import BasePage


class LandingPage(BasePage):

    def __init__(self, driver):
        self.driver = driver

        self.download_button_id = 'hero-download-button'

    @property
    def get_download_button_link(self):
        return self.driver.find_element_by_id(self.download_button_id).get_attribute('href')

    @property
    def get_download_button_text(self):
        return self.driver.find_element_by_id(self.download_button_id).text

    def click_download_button(self):
        self.driver.find_element_by_id(self.download_button_id).click()
