# Start apache using localhost.conf
ln -s $PWD /var/www/localhost
ln -s $PWD/localhost.conf /etc/apache2/sites-available/localhost.conf
a2ensite localhost
service apache2 start

# Build via npm
npm install
npm run build

# Build via cms
echo "Building website pages..."
$PYTHON_VENV/bin/python -m cms.bin.generate_static_pages . public