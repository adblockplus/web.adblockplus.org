import pytest

from selenium import webdriver
from selenium.webdriver.chrome.options import Options

from pages.landingPage import LandingPage
from chunks.topMenu import TopMenu
from chunks.cookiesPrompt import CookiesPrompt

import utils.global_functions as gf


@pytest.fixture(scope="function")
def driver():
    options = Options()
    gf.setup(options)

    driver = webdriver.Chrome(options=options)
    yield driver
    driver.close()


def test_verify_prompt_displayed_when_not_agreeing(driver):
    landing_page = LandingPage(driver)
    landing_page.go_home()

    top_menu = TopMenu(driver)
    top_menu.click_about_menu_item()
    cookies_prompt = CookiesPrompt(driver)
    assert cookies_prompt.is_prompt_visible()


def test_verify_prompt_not_displayed_when_agreeing(driver):
    landing_page = LandingPage(driver)
    landing_page.go_home()

    cookies_prompt = CookiesPrompt(driver)
    cookies_prompt.click_ok_got_it_button()
    top_menu = TopMenu(driver)
    top_menu.click_about_menu_item()
    assert not cookies_prompt.is_prompt_visible()


def test_verify_all_options_selected_by_default(driver):
    landing_page = LandingPage(driver)
    landing_page.go_home()

    cookies_prompt = CookiesPrompt(driver)
    cookie_settings_form = cookies_prompt.click_edit_cookie_settings_button()
    assert cookie_settings_form.is_necessary_cookies_toggle_enabled()
    assert cookie_settings_form.is_tracking_cookies_toggle_enabled()
    assert cookie_settings_form.is_ab_testing_cookies_toggle_enabled()


def test_disable_tracking_verify_saved(driver):
    landing_page = LandingPage(driver)
    landing_page.go_home()

    cookies_prompt = CookiesPrompt(driver)
    cookie_settings_form = cookies_prompt.click_edit_cookie_settings_button()
    cookie_settings_form.click_tracking_cookies_toggle()
    cookie_settings_form.click_save_preferences_button()

    top_menu = TopMenu(driver)
    about_page = top_menu.click_about_menu_item()
    privacy_policy_page = about_page.click_privacy_policy_link()
    privacy_policy_page.click_change_cookie_settings_link()
    assert not cookie_settings_form.is_tracking_cookies_toggle_enabled()


def test_disable_ab_testing_verify_saved(driver):
    landing_page = LandingPage(driver)
    landing_page.go_home()

    cookies_prompt = CookiesPrompt(driver)
    cookie_settings_form = cookies_prompt.click_edit_cookie_settings_button()
    cookie_settings_form.click_ab_testing_cookies_toggle()
    cookie_settings_form.click_save_preferences_button()

    top_menu = TopMenu(driver)
    about_page = top_menu.click_about_menu_item()
    privacy_policy_page = about_page.click_privacy_policy_link()
    privacy_policy_page.click_change_cookie_settings_link()
    assert not cookie_settings_form.is_ab_testing_cookies_toggle_enabled()


def test_verify_tracking_toggle_affects_ab_when_ab_enabled(driver):
    landing_page = LandingPage(driver)
    landing_page.go_home()

    cookies_prompt = CookiesPrompt(driver)
    cookie_settings_form = cookies_prompt.click_edit_cookie_settings_button()
    cookie_settings_form.click_tracking_cookies_toggle()
    assert not cookie_settings_form.is_ab_testing_cookies_toggle_enabled()
    cookie_settings_form.click_tracking_cookies_toggle()
    assert cookie_settings_form.is_ab_testing_cookies_toggle_enabled()


def test_verify_tracking_toggle_does_not_affect_ab_when_ab_disabled(driver):
    landing_page = LandingPage(driver)
    landing_page.go_home()

    cookies_prompt = CookiesPrompt(driver)
    cookie_settings_form = cookies_prompt.click_edit_cookie_settings_button()
    cookie_settings_form.click_ab_testing_cookies_toggle()
    cookie_settings_form.click_tracking_cookies_toggle()
    assert not cookie_settings_form.is_ab_testing_cookies_toggle_enabled()
    cookie_settings_form.click_tracking_cookies_toggle()
    assert not cookie_settings_form.is_ab_testing_cookies_toggle_enabled()

