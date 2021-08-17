import os

from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.common.keys import Keys

from pages.basePage import BasePage
from chunks.stripePaymentForm import StripePaymentsForm

INSTALLING_MODAL_ID = 'delay-heading'
MONTHLY_AMOUNT_UNDER_MINIMUM_ERROR_CLASS = 'minimum-subscription-warning'
MONTHLY_1_99_RADIO_BUTTON_XPATH = '//input[@name="preset-monthly-subscription-amount" and @value="1.99"]'
MONTHLY_2_99_RADIO_BUTTON_XPATH = '//input[@name="preset-monthly-subscription-amount" and @value="2.99"]'
MONTHLY_3_99_RADIO_BUTTON_XPATH = '//input[@name="preset-monthly-subscription-amount" and @value="3.99"]'
MONTHLY_4_99_RADIO_BUTTON_XPATH = '//input[@name="preset-monthly-subscription-amount" and @value="4.99"]'
MONTHLY_9_99_RADIO_BUTTON_XPATH = '//input[@name="preset-monthly-subscription-amount" and @value="9.99"]'
MONTHLY_CUSTOM_RADIO_BUTTON_XPATH = '//input[@name="preset-monthly-subscription-amount" and @value="custom"]'
MONTHLY_CUSTOM_TEXT_BOX_XPATH = '//input[@name="custom-monthly-subscription-amount"]'
ONE_TIME_AMOUNT_UNDER_MINIMUM_ERROR_CLASS = 'minimum-donation-warning'
ONE_TIME_10_RADIO_BUTTON_XPATH = '//input[@name="preset-donation-amount" and @value="10"]'
ONE_TIME_15_RADIO_BUTTON_XPATH = '//input[@name="preset-donation-amount" and @value="15"]'
ONE_TIME_20_RADIO_BUTTON_XPATH = '//input[@name="preset-donation-amount" and @value="20"]'
ONE_TIME_35_RADIO_BUTTON_XPATH = '//input[@name="preset-donation-amount" and @value="35"]'
ONE_TIME_50_RADIO_BUTTON_XPATH = '//input[@name="preset-donation-amount" and @value="50"]'
ONE_TIME_CUSTOM_RADIO_BUTTON_XPATH = '//input[@name="preset-donation-amount" and @value="custom"]'
ONE_TIME_CUSTOM_TEXT_BOX_XPATH = '//input[@name="custom-donation-amount"]'
YEARLY_AMOUNT_UNDER_MINIMUM_ERROR_CLASS = 'minimum-yearly-warning'
YEARLY_10_RADIO_BUTTON_XPATH = '//input[@name="preset-yearly-subscription-amount" and @value="10"]'
YEARLY_15_RADIO_BUTTON_XPATH = '//input[@name="preset-yearly-subscription-amount" and @value="15"]'
YEARLY_20_RADIO_BUTTON_XPATH = '//input[@name="preset-yearly-subscription-amount" and @value="20"]'
YEARLY_35_RADIO_BUTTON_XPATH = '//input[@name="preset-yearly-subscription-amount" and @value="35"]'
YEARLY_50_RADIO_BUTTON_XPATH = '//input[@name="preset-yearly-subscription-amount" and @value="50"]'
YEARLY_CUSTOM_RADIO_BUTTON_XPATH = '//input[@name="preset-yearly-subscription-amount" and @value="custom"]'
YEARLY_CUSTOM_TEXT_BOX_XPATH = '//input[@name="custom-yearly-subscription-amount"]'
STRIPE_BUTTON_CLASS = 'stripe-button'
STRIPE_BUTTON_TEXT = 'Credit card'


class GenericDonationPage(BasePage):

    def __init__(self, driver):
        self.driver = driver
        self._generic_donation_page_url = 'PLACEHOLDER'  # Will be replaced at run time based on ENV parameters
        self._thank_you_page_url = 'PLACEHOLDER'  # Will be replaced at run time based on ENV parameters
        self.wait = WebDriverWait(driver, 15)
        self._set_page_urls()
        self.driver.get(self._generic_donation_page_url)

        # self.wait.until(ec.visibility_of_element_located((By.CLASS_NAME, STRIPE_BUTTON_CLASS)))

    def _set_page_urls(self):
        self._generic_donation_page_url = str(os.getenv('landing_page_url'))\
                                    + str(os.getenv('generic_donation_page'))
        self._thank_you_page_url = str(os.getenv('landing_page_url')) + '/payment-complete'

    def click_monthly_custom_button(self):
        self.driver.find_element_by_xpath(MONTHLY_CUSTOM_RADIO_BUTTON_XPATH).send_keys(Keys.SPACE)

    def click_one_time_custom_button(self):
        self.driver.find_element_by_xpath(ONE_TIME_CUSTOM_RADIO_BUTTON_XPATH).send_keys(Keys.SPACE)

    def click_yearly_custom_button(self):
        self.driver.find_element_by_xpath(YEARLY_CUSTOM_RADIO_BUTTON_XPATH).send_keys(Keys.SPACE)

    def click_radio_button(self, button_xpath):
        self.driver.find_element_by_xpath(button_xpath).send_keys(Keys.SPACE)

    def click_stripe_button(self):
        self.wait.until(ec.invisibility_of_element((By.ID, INSTALLING_MODAL_ID)))
        self.wait.until(ec.text_to_be_present_in_element((By.CLASS_NAME, STRIPE_BUTTON_CLASS), STRIPE_BUTTON_TEXT))
        self.wait.until(ec.element_to_be_clickable((By.CLASS_NAME, STRIPE_BUTTON_CLASS)))
        self.driver.find_element_by_class_name(STRIPE_BUTTON_CLASS).click()
        return StripePaymentsForm(self.driver)

    def is_stripe_button_visible(self):
        return self.wait.until(ec.text_to_be_present_in_element(
            (By.CLASS_NAME, STRIPE_BUTTON_CLASS), STRIPE_BUTTON_TEXT))

    def enter_monthly_custom_value(self, custom_value):
        card_cvc_textbox = self.driver.find_element_by_xpath(MONTHLY_CUSTOM_TEXT_BOX_XPATH)
        card_cvc_textbox.send_keys(custom_value)

    def enter_one_time_custom_value(self, custom_value):
        card_cvc_textbox = self.driver.find_element_by_xpath(ONE_TIME_CUSTOM_TEXT_BOX_XPATH)
        card_cvc_textbox.send_keys(custom_value)

    def enter_yearly_custom_value(self, custom_value):
        card_cvc_textbox = self.driver.find_element_by_xpath(YEARLY_CUSTOM_TEXT_BOX_XPATH)
        card_cvc_textbox.send_keys(custom_value)

    @property
    def get_all_monthly_buttons(self):
        return {
            'Monthly 1.99': MONTHLY_1_99_RADIO_BUTTON_XPATH,
            'Monthly 2.99': MONTHLY_2_99_RADIO_BUTTON_XPATH,
            'Monthly 3.99': MONTHLY_3_99_RADIO_BUTTON_XPATH,
            'Monthly 4.99': MONTHLY_4_99_RADIO_BUTTON_XPATH,
            'Monthly 9.99': MONTHLY_9_99_RADIO_BUTTON_XPATH,
        }

    @property
    def get_all_one_time_buttons(self):
        return {
            'One time 10': ONE_TIME_10_RADIO_BUTTON_XPATH,
            'One time 15': ONE_TIME_15_RADIO_BUTTON_XPATH,
            'One time 20': ONE_TIME_20_RADIO_BUTTON_XPATH,
            'One time 35': ONE_TIME_35_RADIO_BUTTON_XPATH,
            'One time 50': ONE_TIME_50_RADIO_BUTTON_XPATH,
        }

    @property
    def get_all_yearly_buttons(self):
        return {
            'Yearly 10': YEARLY_10_RADIO_BUTTON_XPATH,
            'Yearly 15': YEARLY_15_RADIO_BUTTON_XPATH,
            'Yearly 20': YEARLY_20_RADIO_BUTTON_XPATH,
            'Yearly 35': YEARLY_35_RADIO_BUTTON_XPATH,
            'Yearly 50': YEARLY_50_RADIO_BUTTON_XPATH,
        }

    @property
    def get_monthly_amount_under_minimum_error_text(self):
        self.wait.until(ec.visibility_of_element_located((By.CLASS_NAME,
                                                          MONTHLY_AMOUNT_UNDER_MINIMUM_ERROR_CLASS)))
        return self.driver.find_element_by_class_name(MONTHLY_AMOUNT_UNDER_MINIMUM_ERROR_CLASS).text

    @property
    def get_one_time_amount_under_minimum_error_text(self):
        self.wait.until(ec.visibility_of_element_located((By.CLASS_NAME,
                                                          ONE_TIME_AMOUNT_UNDER_MINIMUM_ERROR_CLASS)))
        return self.driver.find_element_by_class_name(ONE_TIME_AMOUNT_UNDER_MINIMUM_ERROR_CLASS).text

    @property
    def get_yearly_amount_under_minimum_error_text(self):
        self.wait.until(ec.visibility_of_element_located((By.CLASS_NAME,
                                                          YEARLY_AMOUNT_UNDER_MINIMUM_ERROR_CLASS)))
        return self.driver.find_element_by_class_name(YEARLY_AMOUNT_UNDER_MINIMUM_ERROR_CLASS).text

    def is_redirect_to_thank_you(self):
        return self.wait.until(ec.url_matches(self._thank_you_page_url))

