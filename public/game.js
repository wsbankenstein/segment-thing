const w = canvas.width, h = canvas.height;
const DISPLAYS = 11, STDLENGTH = 50, STDTHICKNESS = 10, STDONCOLOUR = '#FF0000', STDOFFCOLOUR = '#151515';

function rotatePoint(pointX, pointY, originX, originY, angle) {
    return {
        x: Math.cos(angle) * (pointX - originX) - Math.sin(angle) * (pointY - originY) + originX,
        y: Math.sin(angle) * (pointX - originX) + Math.cos(angle) * (pointY - originY) + originY
    };
}

function isInRotatedRectangle(px, py, rx, ry, rd /* rectangle direction */, rl /* rectangle length */, rw /* rectangle width */) {
    // Our "rectangle" is a line (polar coordinates) with thickness.
    let rx1 = rx, ry1 = ry - rw/2;
    // Get the cartesian coordinates of the unrotated rectangle,
    let rx2 = rx1 + rl, ry2 = ry + rw/2; 
    // then rotate the point around the top left corner of the rectangle by the inverse of the rectangle direction.
    let np = rotatePoint(px, py, rx1, ry1, -rd);
    // Now just do a regular point-in-rectangle check.
    // let rx2 = rx + Math.cos(rd) * rl, ry2 = ry + Math.sin(rd) * rl; // Get other line point in cartesian coordinates
    return rx1 < np.x && ry1 < np.y && rx2 > np.x && ry2 > np.y;
}

let win;

function saveImage() {
    var link = document.createElement("a");
    link.download = "wallpaper.png";
    link.href = canvas.toDataURL();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
    win = window.open("http://localhost:6969/set", "_blank");
    win.close();
}


class Segment {
    constructor(x, y, direction, length = STDLENGTH, thickness = STDTHICKNESS, onColour = STDONCOLOUR, offColour = STDOFFCOLOUR) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.length = length;
        this.thickness = thickness;
        this.onColour = onColour;
        this.offColour = offColour;
        this.on = false;
    }
    toggle() {
        this.on = !this.on;
    }
    set(v) {
        this.on = !!v;
    }
    draw() {
        ctx.strokeStyle = this.on ? this.onColour : this.offColour;
        // ctx.globalAlpha = this.on ? 0.8 : 0.2;
        ctx.lineWidth = this.thickness;
        // The segment itself
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + Math.cos(this.direction) * this.length, this.y + Math.sin(this.direction) * this.length);
        ctx.stroke();
        // Segment decorations
        // Triangles with sides equal to this.thickness
        ctx.beginPath();
        ctx.moveTo(this.x - Math.cos(this.direction) * this.thickness / 2, this.y - Math.sin(this.direction) * this.thickness / 2);
        ctx.lineTo(this.x + Math.cos(this.direction + Math.PI*3/2) * this.thickness / 2, this.y + Math.sin(this.direction + Math.PI*3/2) * this.thickness / 2);
        ctx.lineTo(this.x + Math.cos(this.direction + Math.PI*1/2) * this.thickness / 2, this.y + Math.sin(this.direction + Math.PI*1/2) * this.thickness / 2);
        ctx.closePath();
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fill();

        ctx.beginPath();
        let nx = this.x + Math.cos(this.direction) * this.length, ny = this.y + Math.sin(this.direction) * this.length;
        ctx.moveTo(nx + Math.cos(this.direction) * this.thickness / 2, ny + Math.sin(this.direction) * this.thickness / 2);
        ctx.lineTo(nx - Math.cos(this.direction + Math.PI*3/2) * this.thickness / 2, ny - Math.sin(this.direction + Math.PI*3/2) * this.thickness / 2);
        ctx.lineTo(nx - Math.cos(this.direction + Math.PI*1/2) * this.thickness / 2, ny - Math.sin(this.direction + Math.PI*1/2) * this.thickness / 2);
        ctx.closePath();
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fill();
    }
}
class Display {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.segments = [
            // With gaps
            // new Segment(x, y, 0, STDLENGTH),
            // new Segment(x + STDLENGTH * 1.2 + STDTHICKNESS, y, 0, STDLENGTH),
            // new Segment(x, y + STDLENGTH * 1.2 + STDTHICKNESS, 0, STDLENGTH),
            // new Segment(x + STDLENGTH * 1.2 + STDTHICKNESS, y + STDLENGTH * 1.2 + STDTHICKNESS, 0, STDLENGTH),
            // new Segment(x, y + STDLENGTH * 2.4 + STDTHICKNESS * 2, 0, STDLENGTH),
            // new Segment(x + STDLENGTH * 1.2 + STDTHICKNESS, y + STDLENGTH * 2.4 + STDTHICKNESS * 2, 0, STDLENGTH),

            // new Segment(x - STDTHICKNESS, y + STDTHICKNESS, Math.PI * 0.5, STDLENGTH),
            // new Segment(x + STDLENGTH * 1.2, y + STDTHICKNESS, Math.PI * 0.5, STDLENGTH),
            // new Segment(x + STDLENGTH * 2.4 + STDTHICKNESS, y + STDTHICKNESS, Math.PI * 0.5, STDLENGTH),
            // new Segment(x - STDTHICKNESS, y + STDLENGTH * 1.2 + STDTHICKNESS * 2, Math.PI * 0.5, STDLENGTH),
            // new Segment(x + STDLENGTH * 1.2, y + STDLENGTH * 1.2 + STDTHICKNESS * 2, Math.PI * 0.5, STDLENGTH),
            // new Segment(x + STDLENGTH * 2.4 + STDTHICKNESS, y + STDLENGTH * 1.2 + STDTHICKNESS * 2, Math.PI * 0.5, STDLENGTH),

            // new Segment(x, y + STDLENGTH * 1.2, Math.PI * 1.75, STDLENGTH * Math.sqrt(2)),
            // new Segment(x + STDLENGTH * 1.2 + STDTHICKNESS, y + STDLENGTH * 1.2, Math.PI * 1.75, STDLENGTH * Math.sqrt(2)),
            // new Segment(x, y + STDLENGTH * 2.4 + STDTHICKNESS, Math.PI * 1.75, STDLENGTH * Math.sqrt(2)),
            // new Segment(x + STDLENGTH * 1.2 + STDTHICKNESS, y + STDLENGTH * 2.4 + STDTHICKNESS, Math.PI * 1.75, STDLENGTH * Math.sqrt(2)),
           
            // Gapless with decorations
            new Segment(x, y, 0, STDLENGTH),
            new Segment(x + STDLENGTH + STDTHICKNESS, y, 0, STDLENGTH),
            new Segment(x, y + STDLENGTH + STDTHICKNESS, 0, STDLENGTH),
            new Segment(x + STDLENGTH + STDTHICKNESS, y + STDLENGTH + STDTHICKNESS, 0, STDLENGTH),
            new Segment(x, y + STDLENGTH * 2 + STDTHICKNESS * 2, 0, STDLENGTH),
            new Segment(x + STDLENGTH + STDTHICKNESS, y + STDLENGTH * 2 + STDTHICKNESS * 2, 0, STDLENGTH),

            new Segment(x - STDTHICKNESS / 2, y + STDTHICKNESS / 2, Math.PI * 0.5, STDLENGTH),
            new Segment(x + STDLENGTH + STDTHICKNESS / 2, y + STDTHICKNESS / 2, Math.PI * 0.5, STDLENGTH),
            new Segment(x + STDLENGTH * 2 + STDTHICKNESS * 1.5, y + STDTHICKNESS / 2, Math.PI * 0.5, STDLENGTH),
            new Segment(x - STDTHICKNESS / 2, y + STDLENGTH + STDTHICKNESS * 1.5, Math.PI * 0.5, STDLENGTH),
            new Segment(x + STDLENGTH + STDTHICKNESS / 2, y + STDLENGTH + STDTHICKNESS * 1.5, Math.PI * 0.5, STDLENGTH),
            new Segment(x + STDLENGTH * 2 + STDTHICKNESS * 1.5, y + STDLENGTH + STDTHICKNESS * 1.5, Math.PI * 0.5, STDLENGTH),

            new Segment(x + STDTHICKNESS / 3, y + STDLENGTH + STDTHICKNESS / 6, Math.PI * 1.75, STDLENGTH * Math.sqrt(2) - STDTHICKNESS + 1),
            new Segment(x + STDLENGTH + STDTHICKNESS * 4 / 3, y + STDLENGTH + STDTHICKNESS / 6, Math.PI * 1.75, STDLENGTH * Math.sqrt(2) - STDTHICKNESS + 1),
            new Segment(x + STDTHICKNESS / 3, y + STDLENGTH * 2 + STDTHICKNESS * 7 / 6, Math.PI * 1.75, STDLENGTH * Math.sqrt(2) - STDTHICKNESS + 1),
            new Segment(x + STDLENGTH + STDTHICKNESS * 4 / 3, y + STDLENGTH * 2 + STDTHICKNESS * 7 / 6, Math.PI * 1.75, STDLENGTH * Math.sqrt(2) - STDTHICKNESS + 1),

            // Without gaps
            // new Segment(x, y, 0, STDLENGTH),
            // new Segment(x + STDLENGTH, y, 0, STDLENGTH),
            // new Segment(x, y + STDLENGTH, 0, STDLENGTH),
            // new Segment(x + STDLENGTH, y + STDLENGTH, 0, STDLENGTH),
            // new Segment(x, y + STDLENGTH * 2, 0, STDLENGTH),
            // new Segment(x + STDLENGTH, y + STDLENGTH * 2, 0, STDLENGTH),

            // new Segment(x, y, Math.PI * 0.5, STDLENGTH),
            // new Segment(x + STDLENGTH, y, Math.PI * 0.5, STDLENGTH),
            // new Segment(x + STDLENGTH * 2, y, Math.PI * 0.5, STDLENGTH),
            // new Segment(x, y + STDLENGTH, Math.PI * 0.5, STDLENGTH),
            // new Segment(x + STDLENGTH, y + STDLENGTH, Math.PI * 0.5, STDLENGTH),
            // new Segment(x + STDLENGTH * 2, y + STDLENGTH, Math.PI * 0.5, STDLENGTH),

            // new Segment(x, y + STDLENGTH, Math.PI * 1.75, STDLENGTH * Math.sqrt(2)),
            // new Segment(x + STDLENGTH, y + STDLENGTH, Math.PI * 1.75, STDLENGTH * Math.sqrt(2)),
            // new Segment(x, y + STDLENGTH * 2, Math.PI * 1.75, STDLENGTH * Math.sqrt(2)),
            // new Segment(x + STDLENGTH, y + STDLENGTH * 2, Math.PI * 1.75, STDLENGTH * Math.sqrt(2)),
        ];
    }
    draw() {
        this.segments.map(s => s.draw());
    }
}

let displayMap = [];
let DISPLAYSIZE = STDLENGTH * 2 + STDTHICKNESS * 3;
for (let i = 0; i < 5; i++) {
    displayMap[i] = [];
    for (let j = 0; j < DISPLAYS; j++) {
        displayMap[i].push(new Display(STDTHICKNESS * 2 + j * (STDLENGTH * 2 + STDTHICKNESS * 4), STDTHICKNESS * (i+2) + DISPLAYSIZE * i));
    }
}

function update() {
    let date = new Date(Date.now());
    let t = timeToWords(date);
    let currentDisplayRow = 0;
    displayMap.map(ds => ds.map(d => d.segments.map(s => s.set(false)))); // please never do this again
    textToSegments(t.h, displayMap[currentDisplayRow]);
    let totalLength = t.h.length + 1 + t.sep.length;
    textToSegments(t.sep, displayMap[currentDisplayRow].length >= totalLength ? displayMap[currentDisplayRow++].slice(t.h.length + 1) : displayMap[(currentDisplayRow += 2) - 1]); // please never do this again
    totalLength += 1 + t.m.length;
    if (t.m.length <= displayMap[currentDisplayRow].length) textToSegments(t.m, displayMap[currentDisplayRow].length >= totalLength ? displayMap[currentDisplayRow++].slice(t.h.length + 1 + t.sep.length + 1) : displayMap[++currentDisplayRow]);
    else if (t.m.split(" ").length > 1 && t.m.split(" ")[0].length < displayMap[currentDisplayRow].length) {
        textToSegments(t.m.split(" ")[0], displayMap[currentDisplayRow++]);
        textToSegments(t.m.split(" ").slice(1).join(" "), displayMap[currentDisplayRow++]);
    }
}

function draw() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w, h);

    displayMap.map(displays => displays.map(d => d.draw()));

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

setInterval(update, 10);

setInterval(saveImage, 60 * 1000);
setTimeout(saveImage, 1000);