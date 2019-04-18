class BasePage:

    def __init__(self, driver):
        self.driver = driver

        self.driver.implicitly_wait(5)
        self.timeout = 30

    def go_home(self):
        self.driver.get('http://adblockplus.org/')