#!/bin/env sh
node server.js &
if [ $? -eq 0 ]; then
    sleep 2
    # In order to be able to use Firefox while this is running, you need to use a different profile.
    # To open the Firefox profile wizard, terminate all instances of Firefox and run `firefox -P`.
    # Create a new profile.
    # Do not restore tabs on startup as that would cause new tabs to open on startup,
    # eventually crashing the headless browser.
    # You can test the profile in non-headless mode with `firefox -P profilename`.
    # Also, you need Firefox version 55 or newer.
    # If you want to use a different browser, 
    # make sure it has a headless mode and find out how to run it,
    # then change the line below.
    firefox --headless -P headless http://localhost:6969
else
    exit 1
fi