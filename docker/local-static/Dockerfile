# Local static-build image.
#
# Generates the static site the same way CI does and serves the output with
# nginx, so you can eyeball the *built* files in isolation. It reproduces none
# of the Firebase Hosting layer beyond a cleanUrls approximation — no redirects,
# no i18n per-country settings.js selection, no custom headers, and none of the
# Cloud Run endpoints (robots/url/redirect/data + locale fallback). For faithful
# routing use the MR deploy-preview channel. See README "Building the production
# site locally".

# ---- Build stage: generate the static site ----
FROM python:3.12-slim-bookworm AS build
WORKDIR /app

# Runtime build deps only (jinja2/markdown/markupsafe/werkzeug) — no dev/test tooling.
COPY requirements.txt ./
RUN python -m pip install --no-cache-dir -r requirements.txt

# The generator reads the whole source tree (pages/, templates/, includes/,
# locales/, static/, macros/, filters/, globals/, settings.ini, cms/).
COPY . .

# The same sequence the CI build_firebase jobs run, minus set-siteurl: generate,
# add .html extensions, copy the default locale to the web root, smoke-check.
# Uses the settings.ini siteurl (production — https://adblockplus.org — by default).
# The default-locale copy is what Firebase relies on to serve a canonical page
# when the visitor's language has no translation; without it the served tree is
# structurally different from every deployed build. "en" mirrors `defaultlocale`
# in settings.ini (DEFAULT_LOCALE in .gitlab-ci.yml).
RUN python -m cms.bin.generate_static_pages "$PWD" services/firebase/public \
 && python services/firebase/utils/html_extender.py services/firebase/public \
 && cp -a services/firebase/public/en/. services/firebase/public/. \
 && python scripts/check_build.py services/firebase/public

# ---- Serve stage: static files only ----
FROM nginx:alpine AS serve
COPY docker/local-static/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/services/firebase/public /usr/share/nginx/html
EXPOSE 80
