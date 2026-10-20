# This file is part of the Adblock Plus web scripts,
# Copyright (C) 2006-present eyeo GmbH
#
# Adblock Plus is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License version 3 as
# published by the Free Software Foundation.
#
# Adblock Plus is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Adblock Plus.  If not, see <http://www.gnu.org/licenses/>.

import contextlib
import os
import signal
import socket
import subprocess
import sys
import time
import zipfile
from io import BytesIO
import urllib.request
import urllib.error
import urllib.parse

import pytest

# Repo root: cms/tests/utils.py -> cms/tests -> cms -> root.
_REPO_ROOT = os.path.dirname(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def get_dir_contents(path):
    # TODO: This function is duplicated in test_page_outputs.py.
    dirdata = {}
    for dirpath, dirnames, filenames in os.walk(path):
        for output_file in filenames:
            filepath = os.path.join(dirpath, output_file)
            with open(filepath) as f:
                locale = os.path.split(os.path.split(filepath)[0])[1]
                dirdata[os.path.join(locale, output_file)] = f.read().strip()
    return dirdata


@contextlib.contextmanager
def run_test_server(site_path, new_env=None):
    """Run test server, yield its URL. Terminate server on next iteration.

    This function is intended be used in a pytest fixture.

    Parameters
    ----------
    site_path: str
        The path to the website's source code.
    new_env: dict
        The environment under which the server will be run. If `None`, this
        will be inherited from the main process.

    Returns
    -------
    str
        The url where the server runs.

    """
    # Bind an ephemeral port and pass it explicitly rather than relying on the
    # server's default (5000), which on macOS is taken by the AirPlay Receiver
    # and would make these tests unrunnable locally.
    port = _get_free_port()
    # `sys.executable` rather than bare `python`, so the subprocess uses the same
    # interpreter as the test run instead of whatever is first on PATH.
    args = [sys.executable, '-m', 'cms.bin.test_server', '--no_reload',
            '--port', str(port), site_path]
    # Werkzeug is a dependency of flask which we are using for the mock api
    # however there is an issue with Werkzeug that prevents it from properly
    # handling the SIGTERM sent by p.kill() or terminate()
    # Issue: https://github.com/pallets/werkzeug/issues/58
    # cwd, so `-m cms.bin.test_server` resolves no matter where pytest was run
    # from. `site_path` is always absolute, so it is unaffected.
    p = subprocess.Popen(args, stdout=subprocess.PIPE, preexec_fn=os.setsid,
                         env=new_env, cwd=_REPO_ROOT)

    try:
        _wait_for_server(port)
        yield 'http://localhost:{}/'.format(port)
    finally:
        os.killpg(os.getpgid(p.pid), signal.SIGINT)


def _get_free_port():
    """Return a port number that is currently free on localhost."""
    with contextlib.closing(socket.socket()) as s:
        s.bind(('localhost', 0))
        return s.getsockname()[1]


def _wait_for_server(port):
    """Test the server started by `run_test_server` and fail after 2s.

    Expects the server to be active at `http://localhost:{port}/`.

    Raises
    ------
    Exception
        If the server is not running after retry-ing for 2 seconds.
        This will be the exception raised by `urllib2.urlopen`.

    """
    start_time = time.time()

    while True:
        try:
            urllib.request.urlopen('http://localhost:{}/'.format(port))
            break
        except Exception:
            time.sleep(.1)
            if time.time() - start_time > 2:
                raise


def create_in_memory_zip(file_names, file_data):
    """Create a BytesIO object with the contents of a zip file.

    Parameters
    ----------
    file_names: iterable
        Of file names. Should be the full paths of the file inside the zip.
    file_data: iterable
        The data to be contained of the files.

    Returns
    -------
    BytesIO
        The resulting in-memory zip file.

    """
    memory_zip = BytesIO()

    with zipfile.ZipFile(memory_zip, 'w') as zf:
        for idx in range(len(file_names)):
            zf.writestr(file_names[idx], file_data[idx], zipfile.ZIP_DEFLATED)

    memory_zip.seek(0)
    return memory_zip


def exception_test(func, exception, exp_msg, *args, **kw):
    """Test if a function raises the correct exception.

    Parameters
    ----------
    func: function
        The function we're testing.
    exception: classobj
        The exception we expect to be raised.
    exp_msg: str
        The message we expect the exception to contain.

    """
    with pytest.raises(exception) as err:
        func(*args, **kw)

    assert exp_msg in str(err.value)
