from pages.basePage import BasePage
from chunks.cookieSettingsForm import CookieSettingsForm


class CookiesPrompt(BasePage):

    def __init__(self, driver):
        self.driver = driver

        self.ok_got_it_button_xpath = '//*[@title="Dismiss cookie notification"]'
        self.edit_cookie_settings_button_xpath = '//*[@title="Edit cookie settings"]'

    def is_prompt_visible(self):
        ok_got_it_button = self.driver.find_element_by_xpath(self.ok_got_it_button_xpath)

        if ok_got_it_button.is_displayed():
            return True
        else:
            return False

    def click_ok_got_it_button(self):
        self.driver.find_element_by_xpath(self.ok_got_it_button_xpath).click()

    def click_edit_cookie_settings_button(self):
        self.driver.find_element_by_xpath(self.edit_cookie_settings_button_xpath).click()
        return CookieSettingsForm(self.driver)

