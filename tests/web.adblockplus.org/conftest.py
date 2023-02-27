import os


def pytest_addoption(parser):
    parser.addoption('--landing_page_url', action='store',
                     default='https://adblockplus.org', help='URL address of the landing page.')
    parser.addoption('--generic_donation_page', action='store',
                     default='periodic-contribution',
                     help='Path of the generic donation page (e.g.: installed, donate, update.')


def pytest_configure(config):
    os.environ["landing_page_url"] = config.getoption('landing_page_url')
    os.environ["generic_donation_page"] = '/' + config.getoption('generic_donation_page')

