@echo off



cd front/build
start index.html
cd ../../


cd back
json-server --watch db.json --delay 500