import pytest

from selenium import webdriver
from selenium.webdriver.chrome.options import Options

from pages.genericDonationPage import GenericDonationPage

import data.dataStripe as td
import utils.global_functions as gf


# CAUTION: THESE TESTS SHOULD ONLY BE RUN IN STAGING, WITH TEST KEYS IN PLACE


@pytest.fixture
def driver():
    options = Options()
    gf.setup(options)

    driver = webdriver.Chrome(options=options)
    yield driver
    driver.close()


def test_monthly_donation_amount_under_minimum(driver):
    generic_donation_page = GenericDonationPage(driver)
    generic_donation_page.click_monthly_custom_button()
    generic_donation_page.enter_monthly_custom_value(td.MONTHLY_AMOUNT_UNDER_MINIMUM)

    assert generic_donation_page.get_monthly_amount_under_minimum_error_text ==\
           td.MONTHLY_AMOUNT_UNDER_MINIMUM_ERROR


def test_one_time_donation_amount_under_minimum(driver):
    generic_donation_page = GenericDonationPage(driver)
    generic_donation_page.click_one_time_custom_button()
    generic_donation_page.enter_one_time_custom_value(td.ONE_TIME_AMOUNT_UNDER_MINIMUM)

    assert generic_donation_page.get_one_time_amount_under_minimum_error_text ==\
           td.ONE_TIME_AMOUNT_UNDER_MINIMUM_ERROR


def test_yearly_donation_amount_under_minimum(driver):
    generic_donation_page = GenericDonationPage(driver)
    generic_donation_page.click_yearly_custom_button()
    generic_donation_page.enter_yearly_custom_value(td.YEARLY_AMOUNT_UNDER_MINIMUM)

    assert generic_donation_page.get_yearly_amount_under_minimum_error_text ==\
           td.YEARLY_AMOUNT_UNDER_MINIMUM_ERROR


@pytest.mark.parametrize('test_id,payment_value,submit_button_text', td.MONTHLY_CUSTOM_DONATION,
                         ids=[seq[0] for seq in td.MONTHLY_CUSTOM_DONATION])
def test_custom_monthly_donation_amount(driver, test_id, payment_value, submit_button_text):
    generic_donation_page = GenericDonationPage(driver)
    generic_donation_page.click_monthly_custom_button()
    generic_donation_page.enter_monthly_custom_value(payment_value)
    stripe_payments_form = generic_donation_page.click_stripe_button()
    stripe_payments_form.enter_email(td.TEST_EMAIL)
    stripe_payments_form.enter_card_number(td.TEST_CARD_NUMBER)
    stripe_payments_form.enter_card_exp(td.TEST_CARD_EXPIRY)
    stripe_payments_form.enter_card_cvc(td.TEST_CVC)
    stripe_payments_form.enter_zip(td.TEST_ZIP)

    assert stripe_payments_form.get_submit_button_text() == submit_button_text
    stripe_payments_form.click_submit_button()
    assert generic_donation_page.is_redirect_to_thank_you()


@pytest.mark.parametrize('test_id,payment_value,submit_button_text', td.ONE_TIME_CUSTOM_DONATION,
                         ids=[seq[0] for seq in td.ONE_TIME_CUSTOM_DONATION])
def test_custom_one_time_donation_amount(driver, test_id, payment_value, submit_button_text):
    generic_donation_page = GenericDonationPage(driver)
    generic_donation_page.click_one_time_custom_button()
    generic_donation_page.enter_one_time_custom_value(payment_value)
    stripe_payments_form = generic_donation_page.click_stripe_button()
    stripe_payments_form.enter_email(td.TEST_EMAIL)
    stripe_payments_form.enter_card_number(td.TEST_CARD_NUMBER)
    stripe_payments_form.enter_card_exp(td.TEST_CARD_EXPIRY)
    stripe_payments_form.enter_card_cvc(td.TEST_CVC)
    stripe_payments_form.enter_zip(td.TEST_ZIP)

    assert stripe_payments_form.get_submit_button_text() == submit_button_text
    stripe_payments_form.click_submit_button()
    assert generic_donation_page.is_redirect_to_thank_you()


@pytest.mark.parametrize('test_id,payment_value,submit_button_text', td.YEARLY_CUSTOM_DONATION,
                         ids=[seq[0] for seq in td.YEARLY_CUSTOM_DONATION])
def test_custom_yearly_donation_amount(driver, test_id, payment_value, submit_button_text):
    generic_donation_page = GenericDonationPage(driver)
    generic_donation_page.click_yearly_custom_button()
    generic_donation_page.enter_yearly_custom_value(payment_value)
    stripe_payments_form = generic_donation_page.click_stripe_button()
    stripe_payments_form.enter_email(td.TEST_EMAIL)
    stripe_payments_form.enter_card_number(td.TEST_CARD_NUMBER)
    stripe_payments_form.enter_card_exp(td.TEST_CARD_EXPIRY)
    stripe_payments_form.enter_card_cvc(td.TEST_CVC)
    stripe_payments_form.enter_zip(td.TEST_ZIP)

    assert stripe_payments_form.get_submit_button_text() == submit_button_text
    stripe_payments_form.click_submit_button()
    assert generic_donation_page.is_redirect_to_thank_you()


@pytest.mark.parametrize('payment_option,submit_button_text', td.ONE_TIME_PAYMENT_OPTIONS,
                         ids=[seq[0] for seq in td.ONE_TIME_PAYMENT_OPTIONS])
def test_fixed_one_time_donation_amounts(driver, payment_option, submit_button_text):
    generic_donation_page = GenericDonationPage(driver)
    generic_donation_page.click_radio_button(generic_donation_page.get_all_one_time_buttons[payment_option])
    stripe_payments_form = generic_donation_page.click_stripe_button()
    stripe_payments_form.enter_email(td.TEST_EMAIL)
    stripe_payments_form.enter_card_number(td.TEST_CARD_NUMBER)
    stripe_payments_form.enter_card_exp(td.TEST_CARD_EXPIRY)
    stripe_payments_form.enter_card_cvc(td.TEST_CVC)
    stripe_payments_form.enter_zip(td.TEST_ZIP)

    assert stripe_payments_form.get_submit_button_text() == submit_button_text
    stripe_payments_form.click_submit_button()
    assert generic_donation_page.is_redirect_to_thank_you()


@pytest.mark.parametrize('payment_option,submit_button_text', td.MONTHLY_PAYMENT_OPTIONS,
                         ids=[seq[0] for seq in td.MONTHLY_PAYMENT_OPTIONS])
def test_fixed_monthly_donation_amounts(driver, payment_option, submit_button_text):
    generic_donation_page = GenericDonationPage(driver)
    generic_donation_page.click_radio_button(generic_donation_page.get_all_monthly_buttons[payment_option])
    stripe_payments_form = generic_donation_page.click_stripe_button()
    stripe_payments_form.enter_email(td.TEST_EMAIL)
    stripe_payments_form.enter_card_number(td.TEST_CARD_NUMBER)
    stripe_payments_form.enter_card_exp(td.TEST_CARD_EXPIRY)
    stripe_payments_form.enter_card_cvc(td.TEST_CVC)
    stripe_payments_form.enter_zip(td.TEST_ZIP)

    assert stripe_payments_form.get_submit_button_text() == submit_button_text
    stripe_payments_form.click_submit_button()
    assert generic_donation_page.is_redirect_to_thank_you()


@pytest.mark.parametrize('payment_option,submit_button_text', td.YEARLY_PAYMENT_OPTIONS,
                         ids=[seq[0] for seq in td.YEARLY_PAYMENT_OPTIONS])
def test_fixed_yearly_donation_amounts(driver, payment_option, submit_button_text):
    generic_donation_page = GenericDonationPage(driver)
    generic_donation_page.click_radio_button(generic_donation_page.get_all_yearly_buttons[payment_option])
    stripe_payments_form = generic_donation_page.click_stripe_button()
    stripe_payments_form.enter_email(td.TEST_EMAIL)
    stripe_payments_form.enter_card_number(td.TEST_CARD_NUMBER)
    stripe_payments_form.enter_card_exp(td.TEST_CARD_EXPIRY)
    stripe_payments_form.enter_card_cvc(td.TEST_CVC)
    stripe_payments_form.enter_zip(td.TEST_ZIP)

    assert stripe_payments_form.get_submit_button_text() == submit_button_text
    stripe_payments_form.click_submit_button()
    assert generic_donation_page.is_redirect_to_thank_you()


@pytest.mark.parametrize('test_id,card_number', td.US_CARD_TYPES,
                         ids=[seq[0] for seq in td.US_CARD_TYPES])
def test_us_credit_card_types(driver, test_id, card_number):
    generic_donation_page = GenericDonationPage(driver)
    stripe_payments_form = generic_donation_page.click_stripe_button()
    stripe_payments_form.enter_email(td.TEST_EMAIL)
    stripe_payments_form.enter_card_number(card_number)
    stripe_payments_form.enter_card_exp(td.TEST_CARD_EXPIRY)
    stripe_payments_form.enter_card_cvc(td.TEST_CVC)
    stripe_payments_form.enter_zip(td.TEST_ZIP)
    stripe_payments_form.click_submit_button()

    assert generic_donation_page.is_redirect_to_thank_you()


@pytest.mark.parametrize('test_id,card_number', td.INTERNATIONAL_CARDS,
                         ids=[seq[0] for seq in td.INTERNATIONAL_CARDS])
def test_international_card_types(driver, test_id, card_number):
    generic_donation_page = GenericDonationPage(driver)
    stripe_payments_form = generic_donation_page.click_stripe_button()
    stripe_payments_form.enter_email(td.TEST_EMAIL)
    stripe_payments_form.enter_card_number(card_number)
    stripe_payments_form.enter_card_exp(td.TEST_CARD_EXPIRY)
    stripe_payments_form.enter_card_cvc(td.TEST_CVC)
    stripe_payments_form.enter_zip(td.TEST_ZIP)
    stripe_payments_form.click_submit_button()

    assert generic_donation_page.is_redirect_to_thank_you()


@pytest.mark.parametrize('test_id,card_number,response', td.SPECIFIC_RESPONSES_CARDS_NEGATIVE,
                         ids=[seq[0] for seq in td.SPECIFIC_RESPONSES_CARDS_NEGATIVE])
def test_specific_responses_negative(driver, test_id, card_number, response):
    generic_donation_page = GenericDonationPage(driver)
    stripe_payments_form = generic_donation_page.click_stripe_button()
    stripe_payments_form.enter_email(td.TEST_EMAIL)
    stripe_payments_form.enter_card_number(card_number)
    stripe_payments_form.enter_card_exp(td.TEST_CARD_EXPIRY)
    stripe_payments_form.enter_card_cvc(td.TEST_CVC)
    stripe_payments_form.enter_zip(td.TEST_ZIP)
    stripe_payments_form.click_submit_button()

    assert stripe_payments_form.get_card_errors_label_text() == response


@pytest.mark.parametrize('test_id,card_number', td.SPECIFIC_RESPONSES_CARDS_POSITIVE,
                         ids=[seq[0] for seq in td.SPECIFIC_RESPONSES_CARDS_POSITIVE])
def test_specific_responses_positive(driver, test_id, card_number):
    generic_donation_page = GenericDonationPage(driver)
    stripe_payments_form = generic_donation_page.click_stripe_button()
    stripe_payments_form.enter_email(td.TEST_EMAIL)
    stripe_payments_form.enter_card_number(card_number)
    stripe_payments_form.enter_card_exp(td.TEST_CARD_EXPIRY)
    stripe_payments_form.enter_card_cvc(td.TEST_CVC)
    stripe_payments_form.enter_zip(td.TEST_ZIP)
    stripe_payments_form.click_submit_button()

    assert generic_donation_page.is_redirect_to_thank_you()

