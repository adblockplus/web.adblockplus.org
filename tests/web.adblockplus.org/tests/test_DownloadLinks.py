import pytest

from selenium import webdriver
from selenium.webdriver.chrome.options import Options

from pages.landingPage import LandingPage
from data.dataDownloadButton import TEST_DATA

import utils.global_functions as gf


@pytest.fixture
def driver(request):
    options = Options()
    gf.setup(options)

    if hasattr(request, 'param'):
        options.add_argument('--user-agent=' + request.param)
    driver = webdriver.Chrome(options=options)
    yield driver
    driver.close()


@pytest.mark.parametrize('id,button_text,link,driver,download_url', TEST_DATA,
                         ids=[seq[0] for seq in TEST_DATA], indirect=['driver'])
def test_check_download_links(id, driver, button_text, link, download_url):
    landing_page = LandingPage(driver)
    landing_page.go_home()
    assert landing_page.get_download_button_text.strip() == button_text
    assert landing_page.get_download_button_link == link
    landing_page.click_download_button()

    if 'internet_explorer' in id or 'safari' in id:
        assert gf.wait_for_file_in_downloads(download_url)
    else:
        assert landing_page.is_redirect_to_url(download_url)

