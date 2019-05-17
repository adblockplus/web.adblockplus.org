import time

from pages.basePage import BasePage
from pages.privacyPolicyPage import PrivacyPolicyPage


class AboutPage(BasePage):

    def __init__(self, driver):
        self.driver = driver

        self.download_button_id = 'install-button'
        self.privacy_policy_link_xpath = '//*[@title="Privacy Policy of Adblock Plus"]'

    def click_download_button(self):
        self.driver.find_element_by_id(self.download_button_id).click()

    def click_privacy_policy_link(self):
        self.driver.execute_script("arguments[0].scrollIntoView();",
                                   self.driver.find_element_by_xpath(self.privacy_policy_link_xpath))
        time.sleep(1)
        self.driver.find_element_by_xpath(self.privacy_policy_link_xpath).click()
        return PrivacyPolicyPage(self.driver)

