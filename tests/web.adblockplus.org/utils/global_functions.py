def setup(options):
    options.add_argument('--no-sandbox')
    options.add_argument('--window-size=1420,1080')
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')


def click_menu_item(driver, list_item_id, item_name):
    menu_items_list = driver.find_element_by_id(list_item_id)
    items = menu_items_list.find_elements_by_tag_name('li')

    for item in items:
        text = item.text
        if item_name in text:
            item.click()
            break

