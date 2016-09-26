#!/bin/sh
apt-get update
apt-get install -y inotify-tools
pip intall j2cli
cd /usr/src
./CodeGenerator/generate_function_runner.sh
cd app
rm -rf node_modules
npm install
node server.js &
cd ../
while inotifywait -r /usr/sst_functions ./app --exclude ./app/node_modules -e create,modify,delete; do
	pkill node
	cd /usr/src
	./CodeGenerator/generate_function_runner.sh
	cd app
	node server.js &
	cd ../
done