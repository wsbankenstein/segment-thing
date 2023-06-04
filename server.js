// Yes, you need an open port for this.
// This allows one machine to broadcast the clock across a network, or even across the Internet!
// (it's not a bug, it's a feature)
const PORT = 6969;

const path = require('path');
const express = require('express');                                                                  
const app = express();                                                                              
const bodyParser = require('body-parser');
const parser = bodyParser.json();
const fs = require('fs');
const { createCanvas } = require('canvas');
const { timeToWords } = require('./clockUtils.js');
const { Segment, Display, letterToSegments, textToSegments } = require('./public/segment.js');

app.use(express.static('public'));                                                                                  
                                                                                                                    
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

function renderClock(hours = new Date(Date.now()).getHours(), minutes = new Date(Date.now()).getMinutes(), returnAs = 'raw') {
    const w = 3840, h = 2160;
    const DISPLAYS = 11, ROWS = 6, STDLENGTH = w / (DISPLAYS * 2.8), STDTHICKNESS = STDLENGTH / 5, STDONCOLOUR = '#FF0000', STDOFFCOLOUR = '#151515';

    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = "lighten";

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w, h);

    let displayMap = [];
    let DISPLAYSIZE = STDLENGTH * 2 + STDTHICKNESS * 3;
    for (let i = 0; i < ROWS; i++) {
        displayMap[i] = [];
        for (let j = 0; j < DISPLAYS; j++) {
            displayMap[i][j] = new Display(STDTHICKNESS * 2 + j * (STDLENGTH * 2 + STDTHICKNESS * 4), STDTHICKNESS * (i+2) + DISPLAYSIZE * i, STDLENGTH, STDTHICKNESS);
        }
    }

    let centered = "conditional";

    let t = timeToWords(hours, minutes);
    console.log(t);
    displayMap.map(ds => ds.map(d => d.segments.map(s => s.set(false)))); // please never do this again
    if (t.m.split(" ").length > 1) { // ДВАДЕСЕТ И ПЕТ
        let minutesWords = t.m.split(" ");
        let hs = t.h + " " + t.sep;
        if (hs.length <= DISPLAYS) {
            let height = 3, s = Math.floor((ROWS - height) / 2);
            textToSegments(hs, displayMap[s], centered);
            textToSegments(minutesWords.slice(0, 2).join(" "), displayMap[s+1], centered);
            textToSegments(minutesWords.slice(2).join(" "), displayMap[s+2], centered);
        } else if ((t.sep + " " + minutesWords[0]).length <= DISPLAYS) {
            let height = 3, s = Math.floor((ROWS - height) / 2);
            textToSegments(t.h, displayMap[s], centered);
            textToSegments(t.sep + " " + minutesWords[0], displayMap[s+1], centered);
            textToSegments(minutesWords.slice(1).join(" "), displayMap[s+2], centered);
        } else {
            let height = 4, s = Math.floor((ROWS - height) / 2);
            textToSegments(t.h, displayMap[s], centered);
            textToSegments(t.sep, displayMap[s+1], centered);
            textToSegments(minutesWords.slice(0, 2).join(" "), displayMap[s+2], centered);
            textToSegments(minutesWords.slice(2).join(" "), displayMap[s+3], centered);
        }
    } else if (t.sep == "") { // ЧАСА
        if ((t.h + " " + t.m).length <= DISPLAYS) {
            let height = 1, s = Math.floor((ROWS - height) / 2);
            textToSegments(t.h + " " + t.m, displayMap[s], centered);
        } else {
            let height = 2, s = Math.floor((ROWS - height) / 2);
            textToSegments(t.h, displayMap[s], centered);
            textToSegments(t.m, displayMap[s+1], centered);
        }
    } else if (t.string.length <= DISPLAYS) {
        let height = 1, s = Math.floor((ROWS - height) / 2);
        textToSegments(t.string, displayMap[s], centered);
    } else {
        let hs = t.h + " " + t.sep;
        let sm = t.sep + " " + t.m;
        if (hs.length > DISPLAYS && sm.length > DISPLAYS) {
            let height = 3, s = Math.floor((ROWS - height) / 2);
            textToSegments(t.h, displayMap[s], centered);
            textToSegments(t.sep, displayMap[s+1], centered);
            textToSegments(t.m, displayMap[s+2], centered);
        } else if (hs.length > DISPLAYS) {
            let height = 2, s = Math.floor((ROWS - height) / 2);
            textToSegments(t.h, displayMap[s], centered);
            textToSegments(sm, displayMap[s+1], centered);
        } else {
            let height = 2, s = Math.floor((ROWS - height) / 2);
            textToSegments(hs, displayMap[s], centered);
            textToSegments(t.m, displayMap[s+1], centered);
        }
    }

    displayMap.map(displays => displays.map(d => d.draw(ctx)));

    switch (returnAs) {
        case 'raw':
            const buffer = canvas.toBuffer('image/png');
            fs.writeFileSync('image.png', buffer);
            return buffer;
        case 'imageData':
            return ctx.getImageData(0, 0, w, h).data;
    }
}

app.get('/clock', (req, res) => {
    res.send(renderClock());
});

app.all('/clock/now', parser, (req, res) => {
    res.send(renderClock(req.body.h, req.body.m, 'imageData'));
});

app.listen(PORT, () => {                                                                                            
    console.log(`Server running on port ${PORT}`);
});
