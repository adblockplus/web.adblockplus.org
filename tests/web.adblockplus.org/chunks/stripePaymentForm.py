from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec

from pages.basePage import BasePage

EMAIL_TEXTBOX_ID = 'stripe-card-email'
CARD_NUMBER_TEXTBOX_NAME = "cardnumber"
CARD_EXP_TEXTBOX_NAME = 'exp-date'
CARD_CVC_TEXTBOX_NAME = 'cvc'
ZIP_TEXTBOX_NAME = 'postal'
SUBMIT_BUTTON_ID = 'stripe-card-submit-label'
STRIPE_IFRAME_ID = 0
CARD_ERRORS_LABEL_ID = 'stripe-card-error'


class StripePaymentsForm(BasePage):

    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(self.driver, 10)
        self.wait.until(ec.visibility_of_element_located((By.ID, SUBMIT_BUTTON_ID)))

    def click_submit_button(self):
        self.driver.find_element_by_id(SUBMIT_BUTTON_ID).click()

    def enter_email(self, email):
        email_textbox = self.driver.find_element_by_id(EMAIL_TEXTBOX_ID)
        email_textbox.click()
        email_textbox.send_keys(email)

    def enter_card_number(self, card_number):
        self.driver.switch_to.frame(STRIPE_IFRAME_ID)
        self.wait.until(ec.visibility_of_element_located((By.NAME, CARD_NUMBER_TEXTBOX_NAME)))
        card_number_textbox = self.driver.find_element_by_name(CARD_NUMBER_TEXTBOX_NAME)
        card_number_textbox.click()
        card_number_textbox.send_keys(card_number)
        self.driver.switch_to.default_content()

    def enter_card_exp(self, card_exp):
        self.driver.switch_to.frame(STRIPE_IFRAME_ID)
        self.wait.until(ec.visibility_of_element_located((By.NAME, CARD_EXP_TEXTBOX_NAME)))
        card_exp_textbox = self.driver.find_element_by_name(CARD_EXP_TEXTBOX_NAME)
        card_exp_textbox.click()
        card_exp_textbox.send_keys(card_exp)
        self.driver.switch_to.default_content()

    def enter_card_cvc(self, card_cvc):
        self.driver.switch_to.frame(STRIPE_IFRAME_ID)
        self.wait.until(ec.visibility_of_element_located((By.NAME, CARD_CVC_TEXTBOX_NAME)))
        card_cvc_textbox = self.driver.find_element_by_name(CARD_CVC_TEXTBOX_NAME)
        card_cvc_textbox.click()
        card_cvc_textbox.send_keys(card_cvc)
        self.driver.switch_to.default_content()

    def enter_zip(self, zip_code):
        self.driver.switch_to.frame(STRIPE_IFRAME_ID)
        if len(self.driver.find_elements(By.NAME, ZIP_TEXTBOX_NAME)) > 0:
            zip_code_textbox = self.driver.find_element_by_name(ZIP_TEXTBOX_NAME)
            zip_code_textbox.click()
            zip_code_textbox.send_keys(zip_code)
            if 'complete' not in zip_code_textbox.get_attribute("class"):
                zip_code_textbox.send_keys('5')
        self.driver.switch_to.default_content()

    def get_card_errors_label_text(self):
        self.wait.until(ec.visibility_of_element_located((By.ID, CARD_ERRORS_LABEL_ID)))
        return self.driver.find_element_by_id(CARD_ERRORS_LABEL_ID).text

    def get_submit_button_text(self):
        return self.driver.find_element_by_id(SUBMIT_BUTTON_ID).text

