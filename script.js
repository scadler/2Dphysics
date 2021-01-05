const canvas = document.getElementById("plane");
const context = canvas.getContext("2d");
bodyA = {
    m: 3,
    xy: [10,50],
    v: 3,
    r: 0,
    theta: 5/3 * Math.PI
}
bodyB = {
    m: 15,
    xy: [300,120],
    v: 2,
    r: 0,
    theta: 2/5 * Math.PI
}
bodyA.r = 10*Math.sqrt(bodyA.m/(2*Math.PI))
bodyB.r = 10*Math.sqrt(bodyB.m/(2*Math.PI))
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
//add code later to check if in the next move a body will be out of the canvas, not just if it is currently
//use this to make better bounce detection and make it harder for body to permenatly exit the canvas
function boundaries(body){
    if( body.xy[0] + body.r > canvas.width || body.xy[0] < body.r){
        body.theta = Math.PI - body.theta
    }
    else if(body.xy[1] + body.r > canvas.height || body.xy[1] < body.r){
        body.theta = 2*Math.PI - body.theta
    }
}
function collision(a,b){
    var radius = a.r + b.r;
    var xCor = a.xy[0] - b.xy[0];
    var yCor = a.xy[1] - b.xy[1];
    if(radius > Math.sqrt( ( xCor*xCor ) + (yCor*yCor) )){
        var KE = ( 1/2 * a.m * a.v * a.v ) + ( 1 / 2 * b.m * b.v * b.v )
        console.log(KE)
    }
}
function placeInCanvas(body){
    if( body.xy[0] + body.r > canvas.width || body.xy[0] < body.r || body.xy[1] + body.r > canvas.height || body.xy[1] < body.r){
        if(body.xy[0] + body.r > canvas.width){
            body.xy[0] = canvas.width - body.r
        }
        else if(body.xy[0] < body.r){
            body.xy[0] = body.r
        }
        else if(body.xy[1] + body.r > canvas.height){
            body.xy[1] = canvas.height - body.r
        }else{
            body.xy[1] = body.r
        }
    }
}
function render(){
    drawRect(0,0,canvas.width,canvas.height,"#000000")
    drawCircle(bodyA.xy[0], bodyA.xy[1], bodyA.r, "#FF0000")
    drawCircle(bodyB.xy[0], bodyB.xy[1], bodyB.r, "#0000FF")
}
function update(body){
    updatePos(body)
    boundaries(body)
    placeInCanvas(body)
    collision(bodyA,bodyB)
}
function system(){
    render();
    update(bodyA);
    update(bodyB);
}
setInterval(system,10);