from pages.basePage import BasePage
from pages.aboutPage import AboutPage
import utils.global_functions


class TopMenu(BasePage):

    def __init__(self, driver):
        self.driver = driver

        self.locale_button_id = 'navbar-locale-menubar'
        self.locale_list_id = 'navbar-locale-menu'
        self.menu_items_bar_id = 'navbar-menu'

    def click_locale_button(self):
        self.driver.find_element_by_id(self.locale_button_id).click()

    def set_language(self, lang_abbreviation):
        utils.global_functions.click_menu_item(self.driver, self.locale_list_id, lang_abbreviation)

    def click_about_menu_item(self):
        utils.global_functions.click_menu_item(self.driver, self.menu_items_bar_id, 'About')
        return AboutPage(self.driver)

