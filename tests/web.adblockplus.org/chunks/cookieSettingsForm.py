from pages.basePage import BasePage


class CookieSettingsForm(BasePage):

    def __init__(self, driver):
        self.driver = driver

        self.save_preferences_button_xpath = '//*[@title="Save cookie preferences"]'
        self.necessary_cookies_toggle_selector = 'div.cookies-settings-form > fieldset:nth-child(1) > div.column.one-fourth.text-end > label > input[type="checkbox"]'
        self.tracking_cookies_toggle_selector = 'div.cookies-settings-form > fieldset:nth-child(2) > div.column.one-fourth.text-end > label > input'
        self.ab_testing_cookies_toggle_selector = 'div.cookies-settings-form > fieldset:nth-child(3) > div.column.one-fourth.text-end > label > input'
        self.tracking_cookies_toggle_button_selector = 'div.cookies-settings-form > fieldset:nth-child(2) > div.column.one-fourth.text-end > label > span'
        self.ab_testing_cookies_toggle_button_selector = 'div.cookies-settings-form > fieldset:nth-child(3) > div.column.one-fourth.text-end > label > span'

    def is_necessary_cookies_toggle_enabled(self):
        return self.driver.find_element_by_css_selector(self.necessary_cookies_toggle_selector).is_selected()

    def is_tracking_cookies_toggle_enabled(self):
        return self.driver.find_element_by_css_selector(self.tracking_cookies_toggle_selector).is_selected()

    def is_ab_testing_cookies_toggle_enabled(self):
        return self.driver.find_element_by_css_selector(self.ab_testing_cookies_toggle_selector).is_selected()

    def click_tracking_cookies_toggle(self):
        self.driver.find_element_by_css_selector(self.tracking_cookies_toggle_button_selector).click()

    def click_ab_testing_cookies_toggle(self):
        self.driver.find_element_by_css_selector(self.ab_testing_cookies_toggle_button_selector).click()

    def click_save_preferences_button(self):
        self.driver.find_element_by_xpath(self.save_preferences_button_xpath).click()

