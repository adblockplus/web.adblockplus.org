import pytest

from selenium import webdriver
from selenium.webdriver.chrome.options import Options

from pages.landingPage import LandingPage
from data.dataDownloadButton import TEST_DATA


@pytest.fixture
def driver(request):
    options = Options()
    options.add_argument('--no-sandbox')
    options.add_argument('--window-size=1420,1080')
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')

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
