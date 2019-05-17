import time

from pages.basePage import BasePage
from chunks.cookieSettingsForm import CookieSettingsForm


class PrivacyPolicyPage(BasePage):

    def __init__(self, driver):
        self.driver = driver

        self.change_cookie_settings_link_xpath = '//*[@title="Edit cookie settings"]'

    def click_change_cookie_settings_link(self):
        self.driver.execute_script("arguments[0].scrollIntoView();",
                                   self.driver.find_element_by_xpath(self.change_cookie_settings_link_xpath))
        time.sleep(1)
        self.driver.find_element_by_xpath(self.change_cookie_settings_link_xpath).click()
        return CookieSettingsForm(self.driver)

