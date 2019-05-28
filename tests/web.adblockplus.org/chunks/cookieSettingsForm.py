from pages.basePage import BasePage


class CookieSettingsForm(BasePage):

    def __init__(self, driver):
        self.driver = driver

        self.SAVE_PREFERENCES_BUTTON_XPATH = '//*[@title="Save cookie preferences"]'
        self.NECESSARY_COOKIES_TOGGLE_SELECTOR = 'div.cookies-settings-form > fieldset:nth-child(1) > div.column.one-fourth.text-end > label > input[type="checkbox"]'
        self.TRACKING_COOKIES_TOGGLE_SELECTOR = 'div.cookies-settings-form > fieldset:nth-child(2) > div.column.one-fourth.text-end > label > input'
        self.AB_TESTING_COOKIES_TOGGLE_SELECTOR = 'div.cookies-settings-form > fieldset:nth-child(3) > div.column.one-fourth.text-end > label > input'
        self.TRACKING_COOKIES_TOGGLE_BUTTON_SELECTOR = 'div.cookies-settings-form > fieldset:nth-child(2) > div.column.one-fourth.text-end > label > span'
        self.AB_TESTING_COOKIES_TOGGLE_BUTTON_SELECTOR = 'div.cookies-settings-form > fieldset:nth-child(3) > div.column.one-fourth.text-end > label > span'

    def is_necessary_cookies_toggle_enabled(self):
        return self.driver.find_element_by_css_selector(self.NECESSARY_COOKIES_TOGGLE_SELECTOR).is_selected()

    def is_tracking_cookies_toggle_enabled(self):
        return self.driver.find_element_by_css_selector(self.TRACKING_COOKIES_TOGGLE_SELECTOR).is_selected()

    def is_ab_testing_cookies_toggle_enabled(self):
        return self.driver.find_element_by_css_selector(self.AB_TESTING_COOKIES_TOGGLE_SELECTOR).is_selected()

    def click_tracking_cookies_toggle(self):
        self.driver.find_element_by_css_selector(self.TRACKING_COOKIES_TOGGLE_BUTTON_SELECTOR).click()

    def click_ab_testing_cookies_toggle(self):
        self.driver.find_element_by_css_selector(self.AB_TESTING_COOKIES_TOGGLE_BUTTON_SELECTOR).click()

    def click_save_preferences_button(self):
        self.driver.find_element_by_xpath(self.SAVE_PREFERENCES_BUTTON_XPATH).click()

