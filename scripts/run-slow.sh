npm run min
python2 -m cms.bin.generate_static_pages . public
service apache2 start