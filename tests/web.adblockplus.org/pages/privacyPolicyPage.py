import time

from pages.basePage import BasePage
from chunks.cookieSettingsForm import CookieSettingsForm

CHANGE_COOKIE_SETTINGS_LINK_XPATH = '//*[@title="Edit cookie settings"]'


class PrivacyPolicyPage(BasePage):

    def __init__(self, driver):
        self.driver = driver

    def click_change_cookie_settings_link(self):
        self.driver.execute_script("arguments[0].scrollIntoView();",
                                   self.driver.find_element_by_xpath(CHANGE_COOKIE_SETTINGS_LINK_XPATH))
        time.sleep(1)
        self.driver.find_element_by_xpath(CHANGE_COOKIE_SETTINGS_LINK_XPATH).click()
        return CookieSettingsForm(self.driver)

