from pages.basePage import BasePage


class TopMenu(BasePage):

    def __init__ (self, driver):
        self.driver = driver

        self.locale_button_id = 'navbar-locale-menubar'
        self.locale_list_id = 'navbar-locale-menu'

    def click_locale_button(self):
        self.driver.find_element_by_id(self.locale_button_id).click()

    def set_language(self, lang_abbreviation):
        locale_list = self.driver.find_element_by_id(self.locale_list_id)
        items = locale_list.find_elements_by_tag_name('li')
        for item in items:
            text = item.text
            if '(' + lang_abbreviation + ')' in text:
                item.click()
                break
