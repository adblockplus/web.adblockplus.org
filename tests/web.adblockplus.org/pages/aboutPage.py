import time

from pages.basePage import BasePage
from pages.privacyPolicyPage import PrivacyPolicyPage


class AboutPage(BasePage):

    def __init__(self, driver):
        self.driver = driver

        self.DOWNLOAD_BUTTON_ID = 'install-button'
        self.PRIVACY_POLICY_LINK_XPATH = '//*[@title="Privacy Policy of Adblock Plus"]'

    def click_download_button(self):
        self.driver.find_element_by_id(self.DOWNLOAD_BUTTON_ID).click()

    def click_privacy_policy_link(self):
        self.driver.execute_script("arguments[0].scrollIntoView();",
                                   self.driver.find_element_by_xpath(self.PRIVACY_POLICY_LINK_XPATH))
        time.sleep(1)
        self.driver.find_element_by_xpath(self.PRIVACY_POLICY_LINK_XPATH).click()
        return PrivacyPolicyPage(self.driver)

