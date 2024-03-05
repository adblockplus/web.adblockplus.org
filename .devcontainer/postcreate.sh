ln -s $PWD /var/www/localhost
ln -s $PWD/localhost.conf /etc/apache2/sites-available/localhost.conf
a2ensite localhost
npm install