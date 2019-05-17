import pytest

from selenium import webdriver
from selenium.webdriver.chrome.options import Options

from pages.landingPage import LandingPage
from data.dataDownloadButton import TEST_DATA

import utils.global_functions


@pytest.fixture
def driver(request):
    options = Options()
    utils.global_functions.setup(options)

    if hasattr(request, 'param'):
        options.add_argument('--user-agent=' + request.param)
    driver = webdriver.Chrome(options=options)
    yield driver
    driver.close()


@pytest.mark.parametrize('id,button_text,link,driver', TEST_DATA,
                         ids=[seq[0] for seq in TEST_DATA], indirect=['driver'])
def test_check_download_button(id, driver, button_text, link):
    landing_page = LandingPage(driver)
    landing_page.go_home()
    assert landing_page.get_download_button_text == button_text
    assert landing_page.get_download_button_link == link
