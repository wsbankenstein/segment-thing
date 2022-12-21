#!/bin/sh

port=6969

node server.js &
if [ $? -ne 0 ]; then exit $?; fi
sleep 2

while true
do
    curl http://localhost:"$port"/clock --output image.png
    feh --no-fehbg --bg-max image.png
    # rm image.png
    sleep 60
done
