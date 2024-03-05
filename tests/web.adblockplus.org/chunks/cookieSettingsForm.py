from pages.basePage import BasePage

SAVE_PREFERENCES_BUTTON_XPATH = '//*[@title="Save cookie preferences"]'
NECESSARY_COOKIES_TOGGLE_SELECTOR = "//input[@type='checkbox'][1]"
TRACKING_COOKIES_TOGGLE_SELECTOR = "//input[@type='checkbox'][@class='tracking-cookies']"
AB_TESTING_COOKIES_TOGGLE_SELECTOR = "//input[@type='checkbox'][@class='testing-cookies']"
TRACKING_COOKIES_TOGGLE_BUTTON_SELECTOR = "//input[@type='checkbox'][@class='tracking-cookies']//following::span[1]"
AB_TESTING_COOKIES_TOGGLE_BUTTON_SELECTOR = "//input[@type='checkbox'][@class='testing-cookies']//following::span[1]"


class CookieSettingsForm(BasePage):

    def __init__(self, driver):
        self.driver = driver

    def is_necessary_cookies_toggle_enabled(self):
        return self.driver.find_element_by_xpath(NECESSARY_COOKIES_TOGGLE_SELECTOR).is_selected()

    def is_tracking_cookies_toggle_enabled(self):
        return self.driver.find_element_by_xpath(TRACKING_COOKIES_TOGGLE_SELECTOR).is_selected()

    def is_ab_testing_cookies_toggle_enabled(self):
        return self.driver.find_element_by_xpath(AB_TESTING_COOKIES_TOGGLE_SELECTOR).is_selected()

    def click_tracking_cookies_toggle(self):
        self.driver.find_element_by_xpath(TRACKING_COOKIES_TOGGLE_BUTTON_SELECTOR).click()

    def click_ab_testing_cookies_toggle(self):
        self.driver.find_element_by_xpath(AB_TESTING_COOKIES_TOGGLE_BUTTON_SELECTOR).click()

    def click_save_preferences_button(self):
        self.driver.find_element_by_xpath(SAVE_PREFERENCES_BUTTON_XPATH).click()

