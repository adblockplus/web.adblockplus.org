def ignore_browsers(page):
    browsers = [
        "opera",
        "firefox",
        "yandex-browser",
        "android",
        "safari",
        "edge",
        "chrome",
        "internet-explorer",
    ]
    if page in browsers:
        return "index"
    else:
        return page
