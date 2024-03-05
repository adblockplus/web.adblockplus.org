import os
import time


def setup(options):
    options.add_argument('--no-sandbox')
    options.add_argument('--window-size=1420,1080')
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    options.add_argument("--disable-dev-shm-usage");


def click_menu_item(driver, list_item_id, item_name):
    menu_items_list = driver.find_element_by_id(list_item_id)
    items = menu_items_list.find_elements_by_tag_name('li')

    for item in items:
        text = item.text
        if item_name in text:
            item.click()
            break


def wait_for_file_in_downloads(text_in_file_name, timeout=20):
    current_dir = os.getcwd()
    elapsed_time = 0
    while True:
        file_list = os.listdir(current_dir)
        for file_name in file_list:
            if text_in_file_name in file_name:
                os.remove(file_name)
                return True
        time.sleep(0.5)
        elapsed_time += 0.5
        if elapsed_time >= timeout:
            return False

