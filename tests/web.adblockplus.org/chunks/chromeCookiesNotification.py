from pages.basePage import BasePage
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec

I_AGREE_BUTTON_CHROME_XPATH = '//span[contains(text(),"I agree")]'
I_AGREE_BUTTON_YANDEX_XPATH = '//input[@value="I agree"]'


class ChromeCookiesNotification(BasePage):

    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 5)

    def click_i_agree_button_chrome(self):
        self.wait.until(ec.visibility_of_element_located((By.XPATH, I_AGREE_BUTTON_CHROME_XPATH)))
        self.driver.find_element_by_xpath(I_AGREE_BUTTON_CHROME_XPATH).click()

    def click_i_agree_button_yandex(self):
        self.wait.until(ec.visibility_of_element_located((By.XPATH, I_AGREE_BUTTON_YANDEX_XPATH)))
        self.driver.find_element_by_xpath(I_AGREE_BUTTON_YANDEX_XPATH).click()

