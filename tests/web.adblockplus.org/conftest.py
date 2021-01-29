import os


def pytest_addoption(parser):
    parser.addoption('--landing_page_url', action='store',
                     default='http://adblockplus.org/', help='URL address of the landing page.')


def pytest_configure(config):
    os.environ["landing_page_url"] = config.getoption('landing_page_url')

