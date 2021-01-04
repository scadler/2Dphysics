const canvas = document.getElementById("plane");
const context = canvas.getContext("2d");
bodyA = {
    m: 3,
    xy: [40,300],
    v: 3,
    r: 0,
    theta: 5/3 * Math.PI
}
bodyA.r = 10*Math.sqrt(bodyA.m/(2*Math.PI))
function drawRect(x, y, w, h, color){
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}
function drawCircle(x, y, r, color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
}
function updatePos(body){
    body.xy[0] += body.v * ( Math.cos ( body.theta ) )
    body.xy[1] -= body.v * ( Math.sin ( body.theta ) )
}
//add code later to check if in the next move it will be out of the canvas, not just if it is now
//use this to make better bounce detection and make it harder for body to permenatly exit the canvas
function boundaries(body){
    if( body.xy[0] + body.r > canvas.width || body.xy[0] < body.r){
        body.theta = Math.PI - body.theta
    }
    else if(body.xy[1] + body.r > canvas.height || body.xy[1] < body.r){
        body.theta = 2*Math.PI - body.theta
    }
}
function render(){
    drawRect(0,0,canvas.width,canvas.height,"#000000")
    drawCircle(bodyA.xy[0], bodyA.xy[1], bodyA.r, "#FF0000")
}
function update(){
    updatePos(bodyA)
    boundaries(bodyA)
}
function system(){
    render();
    update();
}
setInterval(system,10);