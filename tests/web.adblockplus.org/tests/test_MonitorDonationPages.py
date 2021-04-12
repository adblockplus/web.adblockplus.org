import pytest

from selenium import webdriver
from selenium.webdriver.chrome.options import Options

from pages.genericDonationPage import DonatePage

from data.dataDonationPages import TEST_DATA

import utils.global_functions as gf


@pytest.fixture
def driver():
    options = Options()
    gf.setup(options)

    driver = webdriver.Chrome(options=options)
    yield driver
    driver.close()


@pytest.mark.parametrize('page,url', TEST_DATA)
def test_monitor_donation_page(driver, page, url):
    donate_page = DonatePage(driver)
    donate_page.go_to_url(url)

    assert donate_page.is_stripe_button_visible()

