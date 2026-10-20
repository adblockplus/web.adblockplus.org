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


import os
import mimetypes
import argparse

import jinja2

from cms.converters import converters
from cms.utils import process_page
from cms.sources import create_source

UNICODE_ENCODING = 'utf-8'

ERROR_TEMPLATE = '''
<html>
  <head>
    <title>{{status}}</title>
  </head>
  <body>
    <h1>{{status}}</h1>
    {% set code = status.split()|first|int %}
    {% if code == 404 %}
      <p>No page found for the address {{uri}}.</p>
    {% elif code == 500 %}
      <p>An error occurred while processing the request for {{uri}}:</p>
      <pre>{{error}}</pre>
    {% endif %}
  </body>
</html>'''

# Initialize the mimetypes modules manually for consistent behavior,
# ignoring local files and Windows Registry.
mimetypes.init([])

# Manually initializing mimetypes causes the SVG type to be missing on some
# systems, so we add it manually.
mimetypes.add_type('image/svg+xml', '.svg')


class DynamicServerHandler:
    """General-purpose WSGI server handler that generates pages on request.

    Parameters
    ----------
    host: str
        The host where the server will run.
    port: int
        The TCP port the server will run on.
    source_dir: str
        The path to the website contents.

    """

    def __init__(self, host, port, source_dir):
        self.host = host
        self.port = port
        self.source = create_source(source_dir)
        self.full_url = 'http://{0}:{1}'.format(host, port)

    def _get_data(self, path):
        """Read the data corresponding to a website path.

        Parameters
        ----------
        path: str
            The path to the page to get the data for.

        Returns
        -------
        str or bytes
            The data corresponding to the path we're trying to access.

        """
        if self.source.has_static(path):
            return self.source.read_static(path)

        page, data = self._get_page(path)

        if page and self._has_conflicts(page):
            raise Exception('The requested page conflicts with another page.')

        return data

    def _get_page(self, path):
        """Construct a page and return its contents.

        Parameters
        ----------
        path: str
            The path of the page we want to construct.

        Returns
        -------
        (page_name, page_contents): (str, str)

        """
        path = path.strip('/')
        if path == '':
            locale, page = self.source.read_config().get('general',
                                                         'defaultlocale'), ''
        elif '/' in path:
            locale, page = path.split('/', 1)
        else:
            locale, page = path, ''

        default_page = self.source.read_config().get('general', 'defaultpage')
        possible_pages = [page, '/'.join([page, default_page]).lstrip('/')]

        for page_format in converters.keys():
            for p in possible_pages:
                if self.source.has_page(p, page_format):
                    return p, process_page(self.source, locale, p, page_format,
                                           self.full_url)

        if self.source.has_localizable_file(locale, page):
            return page, self.source.read_localizable_file(locale, page)

        return None, None

    def _has_conflicts(self, page):
        """Check if a page has conflicts.

        A page has conflicts if there are other pages with the same name.

        Parameters
        ----------
        page: str
            The path of the page we're checking for conflicts.

        Returns
        -------
        bool
            True - if the page has conflicts
            False - otherwise

        """
        pages = [p for p, _ in self.source.list_pages()]
        pages.extend(self.source.list_localizable_files())

        if pages.count(page) > 1:
            return True
        if any(p.startswith(page + '/') or page.startswith(p + '/') for p in
               pages):
            return True
        return False

    def get_error_page(self, start_response, status, **kw):
        """Create and display an error page.

        Parameters
        ----------
        start_response: function
            It will be called before constructing the error page, to setup
            things like the status of the response and the headers.
        status: str
            The status of the response we're sending the error page with.
            Needs to have the following format:
                "<status_code> <status_message>"
        kw: dict
            Any additional arguments that will be passed onto the `stream`
            method of a `jinja2 Template`.

        Returns
        -------
        generator of utf8 strings
            Fragments of the corresponding error HTML template.

        """
        env = jinja2.Environment(autoescape=True)
        page_template = env.from_string(ERROR_TEMPLATE)
        mime = 'text/html; encoding={}'.format(UNICODE_ENCODING)

        start_response(status, [('Content-Type', mime)])

        for fragment in page_template.stream(status=status, **kw):
            yield fragment.encode(UNICODE_ENCODING)

    def __call__(self, environ, start_response):
        """Execute the handler, according to the WSGI standards.

        Parameters
        ---------
        environ: dict
            The environment under which the page is requested.
            The requested page must be under the `PATH_INFO` key.
        start_response: function
            Used to initiate a response. Must take two arguments, in this
            order:
                - Response status, in the format "<code> <message>".
                - Response headers, as a list of tuples.

        Returns
        -------
        list of str
            With the data for a specific page.

        """
        path = environ.get('PATH_INFO')

        data = self._get_data(path)

        if data is None:
            return self.get_error_page(start_response, '404 Not Found',
                                       uri=path)

        mime = mimetypes.guess_type(path)[0] or 'text/html'

        if isinstance(data, str):
            data = data.encode(UNICODE_ENCODING)
            mime = '{0}; charset={1}'.format(mime, UNICODE_ENCODING)

        start_response('200 OK', [('Content-Type', mime)])
        return [data]


def parse_arguments():
    """Set up and parse the arguments required by the script.

    Returns
    -------
    argparse.Namespace
        With the script arguments, as parsed.

    """
    parser = argparse.ArgumentParser(
        description='CMS development server created to test pages locally and '
                    'on-the-fly.',
    )

    parser.add_argument('path', default=os.curdir, nargs='?',
                        help='Path to the website we intend to run. If not '
                             'provided, defaults, to the current directory.')
    parser.add_argument('--host', default='localhost',
                        help='Address of the host the server will listen on. '
                             'Defaults to "localhost".')
    parser.add_argument('--port', default=5000, type=int,
                        help='TCP port the server will listen on. Default '
                             '5000.')
    parser.add_argument('--no_reload', action='store_true')

    return parser.parse_args()


def run_werkzeug_server(handler, **kw):
    """Set up a server that uses `werkzeug`.

    Parameters
    ----------
    handler: DynamicServerHandler
        Defines the parameters and methods required to handle requests.

    Raises
    ------
    ImportError
        If the package `werkzeug` is not installed

    """
    from werkzeug.serving import run_simple
    import logging

    def run(*args, **kwargs):
        # The werkzeug logger must be configured before the
        # root logger. Also we must prevent it from propagating
        # messages, otherwise messages are logged twice.
        logger = logging.getLogger('werkzeug')
        logger.propagate = False
        logger.setLevel(logging.INFO)
        logger.addHandler(logging.StreamHandler())

        run_simple(threaded=True, *args, **kwargs)

    run(handler.host, handler.port, handler, **kw)


def run_builtins_server(handler, **kw):
    """Configure a server that only uses builtin packages.

    Parameters
    ----------
    handler: DynamicServerHandler
        Defines the parameters and methods required to handle requests.

    """
    from socketserver import ThreadingMixIn
    from wsgiref.simple_server import WSGIServer, make_server

    class ThreadedWSGIServer(ThreadingMixIn, WSGIServer):
        daemon_threads = True

    def run(host, port, app, **kwargs):
        def wrapper(environ, start_response):
            try:
                return app(environ, start_response)
            except Exception as e:
                return handler.get_error_page(
                    start_response, '500 Internal Server Error',
                    uri=environ.get('PATH_INFO'), error=e,
                )

        server = make_server(host, port, wrapper, ThreadedWSGIServer)
        print(' * Running on {0}:{1}'.format(*server.server_address))
        server.serve_forever()

    run(handler.host, handler.port, handler, **kw)


def main():
    args = parse_arguments()
    handler = DynamicServerHandler(args.host, args.port, args.path)

    try:
        # Keep the debugger for tracebacks, but disable evalex: it mounts an
        # interactive Python console at /console, guarded only by a derivable PIN.
        run_werkzeug_server(handler, use_reloader=not args.no_reload,
                            use_debugger=True, use_evalex=False)
    except ImportError:
        run_builtins_server(handler)


if __name__ == '__main__':
    main()
