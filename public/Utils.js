const canvas = document.getElementById('canvas-id');
const ctx = canvas.getContext('2d');
const refitCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "#FF0000";
    ctx.strokeStyle = "#FF0000";
}
refitCanvas();
window.addEventListener('resize', refitCanvas);

// document.body.style.backgroundColor = "white";
ctx.fillStyle = "#FF0000";
ctx.strokeStyle = "#FF0000";
let keyStates = new Map(); // !!undefined == false
let mouseX = 0;
let mouseY = 0;

function isKeyPressed(key) { return keyStates.get(key); }

window.addEventListener('keydown', ev => {keyDown(ev); keyStates.set(ev.key, true)});
window.addEventListener('keyup', ev => {keyUp(ev); keyStates.set(ev.key, false)});
window.addEventListener('mousedown', ev => mouseDown(ev));
window.addEventListener('mouseup', ev => mouseUp(ev));
window.addEventListener('mousemove', ev => {mouseX = ev.x; mouseY = ev.y;});
