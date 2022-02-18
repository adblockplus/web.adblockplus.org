# Setup and start apache2 vhost
ln -s $PWD /var/www/localhost
ln -s $PWD/localhost.conf /etc/apache2/sites-available/localhost.conf
a2ensite localhost
service apache2 start

# Build static resources
npm install
npm run min

# Build static website
python2 -m cms.bin.generate_static_pages . public