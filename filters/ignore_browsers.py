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

def ignore_browsers(page):
    if page in browsers:
        return "index"
    else:
        return page
