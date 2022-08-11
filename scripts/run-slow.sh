echo ">>> build"
npm run min
echo ">>> generate static pages"
python3 -m cms.bin.generate_static_pages . public
echo ">>> start apache"
service apache2 start
echo ">>> all done"
