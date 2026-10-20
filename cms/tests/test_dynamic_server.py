import pytest
import os
import requests

from cms.tests.test_page_outputs import dynamic_expected_outputs
from cms.tests.utils import run_test_server


@pytest.fixture(scope='function')
def dynamic_server_werkzeug(temp_site):
    """Test server run using the `werkzeug` module."""
    with run_test_server(str(temp_site)) as ts:
        yield ts


@pytest.fixture(scope='function')
def dynamic_server_builtins(temp_site, tmpdir):
    """Test server run using builtin modules."""
    # Creating an invalid `werkzeug` module and add it to the head of the
    # PYTHONPATH. This would cause the import of `werkzeug` to fail when
    # running the test server and force it to use the builtin modules.
    werkzeug_dir = tmpdir.mkdir('werkzeug')
    werkzeug_dir.join('__init__.py').write('raise ImportError')
    new_env = dict(os.environ)
    new_env['PYTHONPATH'] = os.pathsep.join([str(tmpdir),
                                             os.getenv('PYTHONPATH', '')])

    with run_test_server(str(temp_site), new_env) as ts:
        yield ts


@pytest.mark.slowtest
def test_dynamic_werkzeug_good_page(dynamic_server_werkzeug):
    filename, expected_output = dynamic_expected_outputs[0]
    response = requests.get(dynamic_server_werkzeug + filename)

    assert expected_output in response.text


@pytest.mark.slowtest
def test_dynamic_werkzeug_not_found(dynamic_server_werkzeug):
    filename = 'en/no-page-here'
    exp_msg = 'Not Found'
    response = requests.get(dynamic_server_werkzeug + filename)

    assert response.status_code == 404
    assert exp_msg in response.text


@pytest.mark.slowtest
def test_dynamic_werkzeug_no_traversal(dynamic_server_werkzeug, temp_site):
    # Canary just outside the site root, rather than something like /etc/passwd
    # whose depth from the pytest tmpdir varies.
    canary = os.path.join(os.path.dirname(temp_site), 'traversal-canary.txt')
    with open(canary, 'w') as f:
        f.write('TRAVERSAL-CANARY')

    # Percent-encoded rather than literal `..`, which requests normalises away
    # client-side. Two levels: out of static/, then out of the site root.
    filename = '%2e%2e%2f' * 2 + 'traversal-canary.txt'
    response = requests.get(dynamic_server_werkzeug + filename)

    assert 'TRAVERSAL-CANARY' not in response.text


@pytest.mark.slowtest
def test_dynamic_werkzeug_no_eval_console(dynamic_server_werkzeug):
    # Werkzeug's DebuggedApplication serves its eval console at /console when
    # evalex is on. Asserting on the body, not the status: the request falls
    # through to the site either way, so both cases return 200.
    response = requests.get(dynamic_server_werkzeug + 'console')

    assert 'Interactive Console' not in response.text
    assert 'Console Locked' not in response.text


@pytest.mark.slowtest
def test_dynamic_builtins_good_page(dynamic_server_builtins):
    filename, expected_output = dynamic_expected_outputs[0]
    response = requests.get(dynamic_server_builtins + filename)

    assert expected_output in response.text


@pytest.mark.slowtest
def test_dynamic_builtins_not_found(dynamic_server_builtins):
    filename = 'en/no-page-here'
    exp_msg = 'Not Found'
    response = requests.get(dynamic_server_builtins + filename)

    assert response.status_code == 404
    assert exp_msg in response.text
