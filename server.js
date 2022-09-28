const path = require('path');
const { exec } = require("child_process");                                   
const express = require('express');                                                                  
const app = express();                                                                              
app.use(express.static('public'));                                                                                  
                                                                                                                    
app.get('/', (req, res) => {                                                                                        
    res.sendFile(path.join(__dirname, 'public/index.html'));                                                               
});

app.get('/set', (req, res) => {
    exec('DOWNLOADS=`xdg-user-dir DOWNLOAD`; feh --bg-max --no-fehbg "$DOWNLOADS"/wallpaper.png; sleep 5; rm "$DOWNLOADS"/wallpaper.png', (error, stdout, stderr) => {
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
    res.send("sex");
});
                                                                                                      
app.listen(6969, () => {                                                                                            
    console.log('Server running on port 6969');
});