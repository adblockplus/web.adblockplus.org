# adblockplus.org web content #

The web content of the adblockplus.org domain is generated automatically from
the files in this repository.

## Testing your changes ##

You can easily test your changes to these files locally. What you need:

* Python 2.7
* [Flask](http://flask.pocoo.org/), [Jinja2](http://jinja.pocoo.org/) and
  [Markdown](https://pypi.python.org/pypi/Markdown) modules (can be installed by
  running `easy_install Flask Jinja2 Markdown` from the command line)
* A current copy of the
  [sitescripts repository](https://hg.adblockplus.org/sitescripts/) (can be
  downloaded from the web or cloned via
  `hg clone https://hg.adblockplus.org/sitescripts/`)

Run the following command from the directory of the sitescripts repository:

    python -m sitescripts.cms.bin.test_server www_directory

Here `www_directory` should be replaced by the directory of this repository.
This will start a local web server on port 5000, e.g. you can open the about
page as [http://localhost:5000/en/about](http://localhost:5000/en/about).

## Configuration ##

Repository configuration is stored in the `settings.ini` file. The following
sections can be defined:

* `[general]`: following settings should be listed here:
  * `defaultlocale`: The fallback locale, to be used whenever no localized
    page/strings can be found for a locale.
  * `defaultpage`: the default page which is displayed by the server if the URL
    doesn't contain a page name. Note that while the test server will consider
    that setting automatically, the real server might need to be configured
    accordingly.
* `[langnames]`: defines the language names correspoding to particular language
  codes.
* `[rtl]`: any language codes listed here are treated as right-to-left languages.
  The values of the settings are ignored.
* `[locale_overrides]`: every entry defines that a page should use a different
  locale file, not the one matching its name (to be used when multiple pages
  share localization data).

## Locales ##

The language-specific data is stored in the `locales` directory. Each language
(identified by its locale code) is given a subdirectory here. The `json` files
contain localizable strings using the following format:

    {
      "stringid": {
        "message": "Translated string",
        "description": "Optional string description"
      },
      ...
    }

Any other files are considered localizable files and will be available on the
server unchanged. This is useful for images for example: a language-dependent
image can be placed into the `locales/en` directory and a German version
of the same image into the `locales/de` directory. E.g. the file
`locales/en/foo.png` will be available on the server under the URL `/en/foo.png`.

## Pages ##

The pages are defined in the `pages` directory. The file extension defines the
format in which a page is specified and won't be visible on the web server.
The page name is prepended by the locale code in the URL, e.g. `pages/foo.md`
can be available under the URLs `/en/foo` and `/de/foo` (the English and German
versions respectively). Regardless of the format, a page can define a number of
settings using the following format:

    setting = value

Note that the settings have to placed at the beginning of the file, before the
actual content.  The following settings can be changed:

* `template`: This defines the template to be used for this page (without the
  file extension). By default the `default` template is used for all pages.
* `title`: The locale string to be used as page title. By default the `title`
  string is used.
* `noheading`: Setting this to any value will make sure no heading is displayed.
  By default a `<h1>` tag with the page title is added above the content.
* `notoc`: Setting this to any value will prevent a table of contents from being
  generated. By default a table of contents is always generated if the page
  contains any headers with an `id` attribute.

The following tag inserts an include file into the page (can be in a different
format):

    <? include foo ?>

Include files should be placed into the `includes` directory of the repository.
In the case above the contents of `includes/foo.md` or `includes/foo.tmpl` will
be inserted (whichever is present).

### Markdown format (md) ###

This format should normally be used, it allows the pages to be defined using the
[Markdown](http://daringfireball.net/projects/markdown/syntax) syntax. Raw HTML
tags are allowed and can be used where Markdown syntax isn't sufficient. The
[Attribute Lists](http://pythonhosted.org/Markdown/extensions/attr_list.html)
extension is active and allows specifying custom attributes for the generated
HTML tags.

Localizable strings are retrieved from the locale file with the name matching
the page name. The following syntax can be used: `$foo$` inserts a string named
`foo` from the locale (no HTML code or Markdown syntax allowed in the string).
The syntax `$foo(foopage, http://example.com/)$` will work similarly but will
look for `<a>...</a>` blocks in the string: the first will be turned into a link
to the page `foopage`, the second will become a link to `http://example.com/`.

Any content between `<head>` and `</head>` tags will be inserted into the head
of the generated web page, this is meant for styles, scripts and the like.
Other pages should be linked by using their name as link target (relative links),
these links will be resolved to point to the most appropriate page language.
Embedding localizable images works the same, use the image name as image source.

### Raw HTML format (raw) ###

This format is similar to the Markdown format but uses regular HTML syntax.
No processing is performed beyond inserting localized strings and resolving
links to pages and images. This format is mainly meant for legacy content.

### Jinja2 format (tmpl) ###

Complicated pages can be defined using the
[Jinja2 template format](http://jinja.pocoo.org/docs/templates/). Automatic
escaping is active so by default values inserted into the page cannot contain
any HTML code. Any content between `<head>` and `</head>` tags will be inserted
into the head of the generated web page, everything else defined the content of
the page.

The following variables can be used:

* `page`: The page name
* `config`: Contents of the `settings.ini` file in this repository (a
  [configparser object](http://docs.python.org/2/library/configparser.html))
* `locale`: Locale code of the page language
* `available_locales`: Locale codes of all languages available for this page

Following custom filters can be used:

* `translate(string, locale=None)`: retrieves a string from a locale file.
  Unless a locale is specified the locale file matching the page name is used.
* `linkify(url)`: generates an `<a href="...">` tag for the URL. If the URL is
  a page name it will be converted into a link to the most appropriate page
  language.
* `toclist(html)`: extracts a list of headings from HTML code, this can be used
  to generate a table of contents.

## Static files ##

Any files located in the `static` directory will be available on the server
unchanged. The file `static/css/foo.css` will be available under the URL
`/css/foo.css`.

## Templates ##

The templates specified in the `templates` directory specify the overall
structure that is common for all pages. These templates should have the file
extension `tmpl` and use the [Jinja2 template format](http://jinja.pocoo.org/docs/templates/).
The differences to pages using the same format are:

* No special treatment of the `<head>` tag.
* Additional variables `head` and `body` are defined with the HTML code that
  should be added to the head and content of the page respectively.

By default, `default.tmpl` will be used for all pages. If other templates are
defined, the pages need to choose them explicitly using the `template` setting.
