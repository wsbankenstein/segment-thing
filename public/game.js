const w = canvas.width, h = canvas.height;

const DISPLAYS = 11, ROWS = 6, STDLENGTH = w / (DISPLAYS * 2.8), STDTHICKNESS = STDLENGTH / 5, STDONCOLOUR = '#FF0000', STDOFFCOLOUR = '#151515';

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

function draw() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w, h);

    displayMap.map(displays => displays.map(d => d.draw(ctx)));
    
    window.requestAnimationFrame(draw);
}

function mouseDown() {
    displayMap.map(displays => {
        displays.map(d => {
            d.segments.map(s => {
                if (isInRotatedRectangle(mouseX, mouseY, s.x, s.y, s.direction, s.length, s.thickness)) {
                    s.toggle();
                }
            });
        });
    });
}

window.requestAnimationFrame(draw);
