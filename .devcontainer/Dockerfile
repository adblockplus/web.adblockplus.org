FROM debian

RUN apt-get update -yqq
RUN apt-get install -yqq git wget python3 python3-pip apache2 libapache2-mod-geoip

# Configure apache2 to test .htaccess
RUN a2enmod macro
RUN a2enmod ssl
RUN a2enmod rewrite
RUN a2enmod headers
RUN a2enmod geoip
RUN openssl req -x509 -nodes -days 365 \
    -subj  "/C=US/ST=TX/O=Adblock Inc/CN=support@adblock.org" \
    -newkey rsa:2048 -keyout /etc/ssl/private/apache-selfsigned.key \
    -out /etc/ssl/certs/apache-selfsigned.crt;

# Install node LTS
RUN wget https://deb.nodesource.com/setup_16.x
RUN bash setup_16.x
RUN rm setup_16.x
RUN apt-get install -yqq nodejs

# Install eyeo/cms
RUN git clone -b migration-to-python3 --single-branch https://gitlab.com/eyeo/websites/cms.git /srv/cms
RUN python3 -m pip install -r /srv/cms/requirements.txt
ENV PYTHONPATH="/srv/cms:$PYTHONPATH"