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

            new Segment(x + segmentThickness / 3, y + segmentLength + segmentThickness / 6, Math.PI * 1.75, segmentLength * Math.sqrt(2) - segmentThickness + 1),
            new Segment(x + segmentLength + segmentThickness * 4 / 3, y + segmentLength + segmentThickness / 6, Math.PI * 1.75, segmentLength * Math.sqrt(2) - segmentThickness + 1),
            new Segment(x + segmentThickness / 3, y + segmentLength * 2 + segmentThickness * 7 / 6, Math.PI * 1.75, segmentLength * Math.sqrt(2) - segmentThickness + 1),
            new Segment(x + segmentLength + segmentThickness * 4 / 3, y + segmentLength * 2 + segmentThickness * 7 / 6, Math.PI * 1.75, segmentLength * Math.sqrt(2) - segmentThickness + 1),

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

module.exports = { rotatePoint, isInRotatedRectangle, Segment, Display }
