import pytest

from selenium import webdriver
from selenium.webdriver.chrome.options import Options

from pages.landingPage import LandingPage
from chunks.topMenu import TopMenu

from data.dataLanguages import TEST_DATA

import utils.global_functions as gf


@pytest.fixture
def driver():
    options = Options()
    gf.setup(options)

    driver = webdriver.Chrome(options=options)
    yield driver
    driver.close()


@pytest.mark.parametrize('language,button_text', TEST_DATA)
def test_change_languages(driver, language, button_text):
    landing_page = LandingPage(driver)
    landing_page.go_home()

    top_menu = TopMenu(driver)
    top_menu.click_locale_button()
    top_menu.set_language(language)
    assert button_text in landing_page.get_download_button_text
