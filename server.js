// The following constants are to be modified by the user.
// Yes, you need an open port for this.
// This allows one machine to broadcast the clock across a network, or even across the Internet!
// (it's not a bug, it's a feature)
const port = 6969;
// You may, of course, choose to set your background with a tool different from feh.
// Make sure to delete the file afterwards.
const wallpaperCmd = 'DOWNLOADS=`xdg-user-dir DOWNLOAD`; feh --bg-max --no-fehbg "$DOWNLOADS"/wallpaper.png; sleep 5; rm -v "$DOWNLOADS"/wallpaper*.png';

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
