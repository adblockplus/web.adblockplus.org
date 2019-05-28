from pages.basePage import BasePage


class LandingPage(BasePage):

    def __init__(self, driver):
        self.driver = driver

        self.DOWNLOAD_BUTTON_ID = 'install-button'

    @property
    def get_download_button_link(self):
        return self.driver.find_element_by_id(self.DOWNLOAD_BUTTON_ID).get_attribute('href')

    @property
    def get_download_button_text(self):
        return self.driver.find_element_by_id(self.DOWNLOAD_BUTTON_ID).text

    def click_download_button(self):
        self.driver.find_element_by_id(self.DOWNLOAD_BUTTON_ID).click()
