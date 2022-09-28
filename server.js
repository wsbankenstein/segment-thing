// The following constants are to be modified by the user.
// Yes, you need an open port for this.
// This allows one machine to broadcast the clock across a network, or even across the Internet!
// (it's not a bug, it's a feature)
const port = 6969;
// In order to be able to use Firefox while this is running, you need to use a different profile.
// To open the Firefox profile wizard, terminate all instances of Firefox and run `firefox -P`.
// Create a new profile.
// Do not restore tabs on startup as that would cause new tabs to open on startup,
// eventually crashing the headless browser.
// You can test the profile in non-headless mode with `firefox -P profilename`.
// Also, you need Firefox version 55 or newer.
// If you want to use a different browser, 
// make sure it has a headless mode and find out how to run it,
// then change the line below.
const browserCmd = `firefox --headless -P headless http://localhost:${port}`;
// You may, of course, choose to set your background with a tool different from feh.
// Make sure to delete the file afterwards.
const wallpaperCmd = 'DOWNLOADS=`xdg-user-dir DOWNLOAD`; feh --bg-max --no-fehbg "$DOWNLOADS"/wallpaper.png; sleep 5; rm "$DOWNLOADS"/wallpaper.png';

const path = require('path');
const { exec } = require('child_process');                                   
const express = require('express');                                                                  
const app = express();                                                                              
app.use(express.static('public'));                                                                                  
                                                                                                                    
app.get('/', (req, res) => {                                                                                        
    res.sendFile(path.join(__dirname, 'public/index.html'));                                                               
});

app.get('/set', (req, res) => {
    exec(wallpaperCmd, (error, stdout, stderr) => {
        console.log(`command: ${wallpaperCmd}`);
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
    res.send("this tab should close itself now");
});

app.listen(port, () => {                                                                                            
    console.log(`Server running on port ${port}`);
});

exec(browserCmd, (error, stdout, stderr) => {
    console.log(`command: ${browserCmd}`);
    if (error) {                                                                                                
        console.log(`error: ${error.message}`);                                                                 
        return;                                                                                                 
    }                                                                                                           
    if (stderr) {                                                                                               
        console.log(`stderr: ${stderr}`);                                                                       
        return;                                                                                                 
    }                                                                                                           
    console.log(`stdout: ${stdout}`); 
});
