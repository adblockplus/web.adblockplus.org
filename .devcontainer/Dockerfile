FROM debian

# Shared setup
RUN apt-get update -yqq
RUN apt-get install -yqq ca-certificates curl gnupg git
RUN mkdir -p /etc/apt/keyrings

# Setup apache2 and "localhost" vhost
RUN apt-get install -yqq apache2 libapache2-mod-geoip
RUN a2enmod macro ssl rewrite headers geoip
RUN openssl req -x509 -nodes -days 365 \
    -subj  "/C=US/ST=TX/O=Adblock Inc/CN=support@adblock.org" \
    -newkey rsa:2048 -keyout /etc/ssl/private/apache-selfsigned.key \
    -out /etc/ssl/certs/apache-selfsigned.crt;

# Setup node
ENV NODE_MAJOR=18
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get install -yqq nodejs npm

# Setup python and venv
RUN apt-get install -yqq python3-full
ENV PYTHON_VENV=/usr/local/python_venv
RUN python3 -m venv $PYTHON_VENV

# Setup cms
RUN git clone https://gitlab.com/eyeo/websites/cms.git /usr/local/cms
RUN $PYTHON_VENV/bin/pip install -r /usr/local/cms/requirements.txt
ENV PYTHONPATH="/usr/local/cms:$PYTHONPATH"