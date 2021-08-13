import pytest

from selenium import webdriver
from selenium.webdriver.chrome.options import Options

from pages.basePage import BasePage

from data.dataRedirects import TEST_DATA_ABPO
from data.dataRedirects import TEST_DATA_DIFFERENT_DOMAIN

import utils.global_functions as gf


@pytest.fixture
def driver():
    options = Options()
    gf.setup(options)

    driver = webdriver.Chrome(options=options)
    yield driver
    driver.close()


@pytest.mark.parametrize('test_url,redirect_url', TEST_DATA_ABPO)
def test_redirects_abpo_domain(driver, test_url, redirect_url):
    base_page = BasePage(driver)
    base_page.go_to_url(base_page.get_landing_page_url() + test_url)

    assert base_page.get_current_url() == base_page.get_landing_page_url() + redirect_url


@pytest.mark.parametrize('test_url,redirect_url', TEST_DATA_DIFFERENT_DOMAIN)
def test_redirects_different_domain(driver, test_url, redirect_url):
    base_page = BasePage(driver)
    base_page.go_to_url(base_page.get_landing_page_url() + test_url)

    assert base_page.get_current_url() == redirect_url
