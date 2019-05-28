from pages.basePage import BasePage
from pages.aboutPage import AboutPage
import utils.global_functions as gf


class TopMenu(BasePage):

    def __init__(self, driver):
        self.driver = driver

        self.LOCALE_BUTTON_ID = 'navbar-locale-menubar'
        self.LOCALE_LIST_ID = 'navbar-locale-menu'
        self.MENU_ITEMS_BAR_ID = 'navbar-menu'

    def click_locale_button(self):
        self.driver.find_element_by_id(self.LOCALE_BUTTON_ID).click()

    def set_language(self, lang_abbreviation):
        gf.click_menu_item(self.driver, self.LOCALE_LIST_ID, lang_abbreviation)

    def click_about_menu_item(self):
        gf.click_menu_item(self.driver, self.MENU_ITEMS_BAR_ID, 'About')
        return AboutPage(self.driver)

