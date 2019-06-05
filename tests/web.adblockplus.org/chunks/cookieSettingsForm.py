from pages.basePage import BasePage

SAVE_PREFERENCES_BUTTON_XPATH = '//*[@title="Save cookie preferences"]'
NECESSARY_COOKIES_TOGGLE_SELECTOR = 'div.cookies-settings-form > fieldset:nth-child(1) > div.column.one-fourth.text-end > label > input[type="checkbox"]'
TRACKING_COOKIES_TOGGLE_SELECTOR = 'div.cookies-settings-form > fieldset:nth-child(2) > div.column.one-fourth.text-end > label > input'
AB_TESTING_COOKIES_TOGGLE_SELECTOR = 'div.cookies-settings-form > fieldset:nth-child(3) > div.column.one-fourth.text-end > label > input'
TRACKING_COOKIES_TOGGLE_BUTTON_SELECTOR = 'div.cookies-settings-form > fieldset:nth-child(2) > div.column.one-fourth.text-end > label > span'
AB_TESTING_COOKIES_TOGGLE_BUTTON_SELECTOR = 'div.cookies-settings-form > fieldset:nth-child(3) > div.column.one-fourth.text-end > label > span'


class CookieSettingsForm(BasePage):

    def __init__(self, driver):
        self.driver = driver

    def is_necessary_cookies_toggle_enabled(self):
        return self.driver.find_element_by_css_selector(NECESSARY_COOKIES_TOGGLE_SELECTOR).is_selected()

    def is_tracking_cookies_toggle_enabled(self):
        return self.driver.find_element_by_css_selector(TRACKING_COOKIES_TOGGLE_SELECTOR).is_selected()

    def is_ab_testing_cookies_toggle_enabled(self):
        return self.driver.find_element_by_css_selector(AB_TESTING_COOKIES_TOGGLE_SELECTOR).is_selected()

    def click_tracking_cookies_toggle(self):
        self.driver.find_element_by_css_selector(TRACKING_COOKIES_TOGGLE_BUTTON_SELECTOR).click()

    def click_ab_testing_cookies_toggle(self):
        self.driver.find_element_by_css_selector(AB_TESTING_COOKIES_TOGGLE_BUTTON_SELECTOR).click()

    def click_save_preferences_button(self):
        self.driver.find_element_by_xpath(SAVE_PREFERENCES_BUTTON_XPATH).click()

