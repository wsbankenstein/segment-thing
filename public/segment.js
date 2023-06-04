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

class Segment {
    constructor(x, y, direction, length = 10, thickness = length / 5, onColour = '#ff0000', offColour = '#151515') {
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
    draw(ctx) {
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
    constructor(x, y, segmentLength, segmentThickness) {
        this.x = x;
        this.y = y;
        this.segmentLength = segmentLength;
        this.segmentThickness = segmentThickness;
        this.segments = [
            // With gaps
            // new Segment(x, y, 0, segmentLength),
            // new Segment(x + segmentLength * 1.2 + segmentThickness, y, 0, segmentLength),
            // new Segment(x, y + segmentLength * 1.2 + segmentThickness, 0, segmentLength),
            // new Segment(x + segmentLength * 1.2 + segmentThickness, y + segmentLength * 1.2 + segmentThickness, 0, segmentLength),
            // new Segment(x, y + segmentLength * 2.4 + segmentThickness * 2, 0, segmentLength),
            // new Segment(x + segmentLength * 1.2 + segmentThickness, y + segmentLength * 2.4 + segmentThickness * 2, 0, segmentLength),

            // new Segment(x - segmentThickness, y + segmentThickness, Math.PI * 0.5, segmentLength),
            // new Segment(x + segmentLength * 1.2, y + segmentThickness, Math.PI * 0.5, segmentLength),
            // new Segment(x + segmentLength * 2.4 + segmentThickness, y + segmentThickness, Math.PI * 0.5, segmentLength),
            // new Segment(x - segmentThickness, y + segmentLength * 1.2 + segmentThickness * 2, Math.PI * 0.5, segmentLength),
            // new Segment(x + segmentLength * 1.2, y + segmentLength * 1.2 + segmentThickness * 2, Math.PI * 0.5, segmentLength),
            // new Segment(x + segmentLength * 2.4 + segmentThickness, y + segmentLength * 1.2 + segmentThickness * 2, Math.PI * 0.5, segmentLength),

            // new Segment(x, y + segmentLength * 1.2, Math.PI * 1.75, segmentLength * Math.sqrt(2)),
            // new Segment(x + segmentLength * 1.2 + segmentThickness, y + segmentLength * 1.2, Math.PI * 1.75, segmentLength * Math.sqrt(2)),
            // new Segment(x, y + segmentLength * 2.4 + segmentThickness, Math.PI * 1.75, segmentLength * Math.sqrt(2)),
            // new Segment(x + segmentLength * 1.2 + segmentThickness, y + segmentLength * 2.4 + segmentThickness, Math.PI * 1.75, segmentLength * Math.sqrt(2)),
           
            // Gapless with decorations
            new Segment(x, y, 0, segmentLength),
            new Segment(x + segmentLength + segmentThickness, y, 0, segmentLength),
            new Segment(x, y + segmentLength + segmentThickness, 0, segmentLength),
            new Segment(x + segmentLength + segmentThickness, y + segmentLength + segmentThickness, 0, segmentLength),
            new Segment(x, y + segmentLength * 2 + segmentThickness * 2, 0, segmentLength),
            new Segment(x + segmentLength + segmentThickness, y + segmentLength * 2 + segmentThickness * 2, 0, segmentLength),

            new Segment(x - segmentThickness / 2, y + segmentThickness / 2, Math.PI * 0.5, segmentLength),
            new Segment(x + segmentLength + segmentThickness / 2, y + segmentThickness / 2, Math.PI * 0.5, segmentLength),
            new Segment(x + segmentLength * 2 + segmentThickness * 1.5, y + segmentThickness / 2, Math.PI * 0.5, segmentLength),
            new Segment(x - segmentThickness / 2, y + segmentLength + segmentThickness * 1.5, Math.PI * 0.5, segmentLength),
            new Segment(x + segmentLength + segmentThickness / 2, y + segmentLength + segmentThickness * 1.5, Math.PI * 0.5, segmentLength),
            new Segment(x + segmentLength * 2 + segmentThickness * 1.5, y + segmentLength + segmentThickness * 1.5, Math.PI * 0.5, segmentLength),

            new Segment(x + segmentThickness / 3, y + segmentLength + segmentThickness / 6, Math.PI * 1.75, segmentLength * Math.sqrt(2) - segmentThickness),
            new Segment(x + segmentLength + segmentThickness * 4 / 3, y + segmentLength + segmentThickness / 6, Math.PI * 1.75, segmentLength * Math.sqrt(2) - segmentThickness),
            new Segment(x + segmentThickness / 3, y + segmentLength * 2 + segmentThickness * 7 / 6, Math.PI * 1.75, segmentLength * Math.sqrt(2) - segmentThickness),
            new Segment(x + segmentLength + segmentThickness * 4 / 3, y + segmentLength * 2 + segmentThickness * 7 / 6, Math.PI * 1.75, segmentLength * Math.sqrt(2) - segmentThickness),

            // Without gaps
            // new Segment(x, y, 0, segmentLength),
            // new Segment(x + segmentLength, y, 0, segmentLength),
            // new Segment(x, y + segmentLength, 0, segmentLength),
            // new Segment(x + segmentLength, y + segmentLength, 0, segmentLength),
            // new Segment(x, y + segmentLength * 2, 0, segmentLength),
            // new Segment(x + segmentLength, y + segmentLength * 2, 0, segmentLength),

            // new Segment(x, y, Math.PI * 0.5, segmentLength),
            // new Segment(x + segmentLength, y, Math.PI * 0.5, segmentLength),
            // new Segment(x + segmentLength * 2, y, Math.PI * 0.5, segmentLength),
            // new Segment(x, y + segmentLength, Math.PI * 0.5, segmentLength),
            // new Segment(x + segmentLength, y + segmentLength, Math.PI * 0.5, segmentLength),
            // new Segment(x + segmentLength * 2, y + segmentLength, Math.PI * 0.5, segmentLength),

            // new Segment(x, y + segmentLength, Math.PI * 1.75, segmentLength * Math.sqrt(2)),
            // new Segment(x + segmentLength, y + segmentLength, Math.PI * 1.75, segmentLength * Math.sqrt(2)),
            // new Segment(x, y + segmentLength * 2, Math.PI * 1.75, segmentLength * Math.sqrt(2)),
            // new Segment(x + segmentLength, y + segmentLength * 2, Math.PI * 1.75, segmentLength * Math.sqrt(2)),
        ];
    }
    draw(ctx) {
        this.segments.map(s => s.draw(ctx));
    }
}

function letterToSegments(letter, display) {
    let s = display.segments;
    s.map(a => a.set(false));
    let a = [];
    switch(letter) {
        case "А": // cyrillic
        case "A": // latin
            a = [0, 1, 2, 3, 6, 9, 8, 11];
            break;
        case "Б":
            a = [0, 1, 6, 9, 2, 3, 11, 4, 5];
            break;
        case "В":
        case "B":
            a = [0, 6, 9, 7, 4, 5, 11, 2, 3];
            break;
        case "Г":
            a = [0, 1, 6, 9];
            break;
        case "Д":
        case "D":
            a = [0, 1, 6, 9, 4, 15, 8];
            break;
        case "Е":
        case "E":
            a = [0, 1, 2, 4, 5, 6, 9];
            break;
        case "Ж":
            a = [6, 9, 7, 10, 8, 11, 2, 3];
            break;
        case "З":
            a = [0, 1, 8, 3, 2, 11, 5, 4];
            break;
        case "И":
            a = [6, 9, 14, 13, 8, 11];
            break;
        case "Й":
            a = [10, 15, 11, 1];
            break;
        case "К":
        case "K":
            a = [6, 9, 2, 13, 3, 11];
            break;
        case "Л":
            a = [14, 13, 8, 11];
            break;
        case "М":
            a = [7, 8, 9, 11, 12, 13];
            break;
        case "Н":
        case "H":
            a = [6, 9, 2, 3, 8, 11];
            break;
        case "О":
        case "O":
            a = [0, 1, 6, 9, 4, 5, 8, 11];
            break;
        case "П":
            a = [6, 9, 0, 1, 8, 11];
            break;
        case "Р":
        case "P":
            a = [6, 9, 0, 1, 8, 3, 2];
            break;
        case "С":
        case "C":
            a = [0, 1, 6, 9, 4, 5];
            break;
        case "Т":
        case "T":
            a = [0, 1, 7, 10];
            break;
        case "У":
        case "Y":
            a = [6, 2, 3, 8, 11, 5, 4];
            break;
        case "Ф":
            a = [13, 12, 14, 15, 7, 2, 3, 10];
            break;
        case "Х":
        case "X":
            a = [7, 10, 14, 13];
            break;
        case "Ц":
            a = [6, 7, 2, 3, 11];
            break;
        case "Ч":
            a = [6, 2, 3, 8, 11];
            break;
        case "Ш":
            a = [6, 9, 4, 5, 7, 10, 8, 11];
            break;
        case "Щ":
            a = [6, 7, 8, 2, 3, 11];
            break;
        case "Ъ":
            a = [0, 7, 10, 5, 11];
            break;
        // не ми пука за ь
        // UPDATE (21/XII/22): вече ми пука за ь!
        case "Ь":
            a = [3, 5, 7, 10, 11];
        case "Ю":
            a = [6, 9, 2, 3, 7, 10, 1, 8, 11, 5];
            break;
        case "Я":
            a = [7, 1, 8, 11, 3, 14, 10];
            break;
        case " ":
            case "":
            break;
        case "-":
            a = [2, 3];
            break;
        case "+":
            a = [2, 3, 7, 10];
            break;
        case "/":
            a = [13, 14];
            break;
        case "_":
            a = [4, 5];
            break;
        case "⁰":
        case "°":
            a = [0, 2, 6, 7];
            break;
        case "1":
            a = [4, 5, 7, 10, 12];
            break;
        case "2":
            a = [0, 1, 2, 3, 4, 5, 8, 9];
            break;
        case "3":
            a = [0, 1, 3, 4, 5, 8, 11];
            break;
        case "4":
            a = [2, 3, 6, 8, 11];
            break;
        case "5":
            a = [0, 1, 2, 3, 4, 5, 6, 11];
            break;
        case "6":
            a = [0, 1, 2, 3, 4, 5, 6, 9, 11];
            break;
        case "7":
            a = [0, 1, 10, 13];
            break;
        case "8":
            a = [0, 1, 2, 3, 4, 5, 6, 8, 9, 11];
            break;
        case "9":
            a = [0, 1, 2, 3, 4, 5, 6, 8, 11];
            break;
        case "0":
            a = [0, 1, 4, 5, 6, 8, 9, 11];
            break;
        case "F":
            a = [0, 1, 2, 6, 9];
            break;
        case "G":
            a = [0, 1, 3, 4, 6, 9, 15];
            break;
        case "I":
            a = [0, 1, 4, 5, 7, 10];
            break;
        case "J":
            a = [0, 1, 4, 7, 9, 10];
            break;
        case "L":
            a = [4, 5, 6, 9];
            break;
        case "M":
            a = [0, 1, 6, 7, 8, 9, 10, 11];
            break;
        case "N":
            a = [0, 1, 6, 8, 9, 11];
            break;
        case "Q":
            a = [0, 1, 4, 5, 6, 8, 9, 15];
            break;
        case "R":
            a = [0, 1, 2, 3, 6, 9, 11, 13];
            break;
        case "S":
            a = [0, 1, 2, 3, 4, 5, 6, 11];
            break;
        case "U":
            a = [4, 5, 6, 8, 9, 11];
            break;
        case "V":
            a = [6, 9, 13, 14];
            break;
        case "W":
            a = [4, 5, 6, 8, 9, 10, 11];
            break;
        case "Z":
            a = [0, 1, 4, 5, 13, 14];
            break;
        default:
            a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
            console.error("Unsupported character in string");
            break;
    }
    for (let i of a) s[i].set(true);
}

function textToSegments(string, displayArray, centered) {
    if (displayArray.length < string.length) return console.error("String too long for display array");
    if (typeof centered == "string") centered = string.length % 2 == displayArray.length % 2;
    if (centered) {
        if (string.length == displayArray.length) textToSegments(string, displayArray, false);
        else {
            let d = Math.floor((displayArray.length - string.length) / 2);
            for (let i = Math.floor(string.length / 2); i <= string.length; i++) {
                letterToSegments(string[i], displayArray[d + i]);
                letterToSegments(string[string.length - i], displayArray[d + string.length - i]);
            }
        }
    } else {
        for (let i in string) {
            letterToSegments(string[i], displayArray[i]);
        }
    }
}

if (typeof module != "undefined") module.exports = { Segment, Display, rotatePoint, isInRotatedRectangle, letterToSegments, textToSegments };
