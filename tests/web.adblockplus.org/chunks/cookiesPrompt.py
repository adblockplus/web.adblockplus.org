from pages.basePage import BasePage
from chunks.cookieSettingsForm import CookieSettingsForm


class CookiesPrompt(BasePage):

    def __init__(self, driver):
        self.driver = driver

        self.OK_GOT_IT_BUTTON_XPATH = '//*[@title="Dismiss cookie notification"]'
        self.EDIT_COOKIE_SETTINGS_BUTTON_XPATH = '//*[@title="Edit cookie settings"]'

    def is_prompt_visible(self):
        ok_got_it_button = self.driver.find_element_by_xpath(self.OK_GOT_IT_BUTTON_XPATH)

        if ok_got_it_button.is_displayed():
            return True
        else:
            return False

    def click_ok_got_it_button(self):
        self.driver.find_element_by_xpath(self.OK_GOT_IT_BUTTON_XPATH).click()

    def click_edit_cookie_settings_button(self):
        self.driver.find_element_by_xpath(self.EDIT_COOKIE_SETTINGS_BUTTON_XPATH).click()
        return CookieSettingsForm(self.driver)

