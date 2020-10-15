from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.support.ui import WebDriverWait


class BasePage:

    def __init__(self, driver):
        self.driver = driver

        self.driver.implicitly_wait(5)
        self.timeout = 30

    def go_home(self):
        self.driver.get('http://adblockplus.org/')

    def is_redirect_to_url(self, url):
        wait = WebDriverWait(self.driver, 10)
        return wait.until(ec.url_to_be(url))

