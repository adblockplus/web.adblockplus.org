from pages.basePage import BasePage
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec

I_AGREE_BUTTON_CHROME_CSS = 'button[jsname*=higCR]'
I_AGREE_BUTTON_YANDEX_CSS = 'input.button[value*="I agree"]'


class ChromeCookiesNotification(BasePage):

    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 5)

    def click_i_agree_button_chrome(self):
        try:
            self.wait.until(ec.visibility_of_element_located((By.CSS_SELECTOR, I_AGREE_BUTTON_CHROME_CSS)))
            self.driver.find_element_by_css_selector(I_AGREE_BUTTON_CHROME_CSS).click()
        except TimeoutException:
            print('Element not found. Moving on to verifying if web store page is displayed.')

    def click_i_agree_button_yandex(self):
        try:
            self.wait.until(ec.visibility_of_element_located((By.CSS_SELECTOR, I_AGREE_BUTTON_YANDEX_CSS)))
            self.driver.find_element_by_css_selector(I_AGREE_BUTTON_YANDEX_CSS).click()
        except TimeoutException:
            print('Element not found. Moving on to verifying if web store page is displayed.')

