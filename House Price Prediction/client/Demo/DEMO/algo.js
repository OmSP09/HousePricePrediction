const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
let cInfo, mInfo, title;

class LinReg {
  
  constructor() {
    this.w      = 0;
    this.b      = 0;
    this.meanX  = 0;
    this.meanY  = 0;
    this.points = []
  }
  
  addPoint( x, y ) {
    this.points.push({ x, y })
  }
  
  train() {
    let xSum = this.points.reduce( (t, p) => (t + p.x), 0 );
    let ySum = this.points.reduce( (t, p) => (t + p.y), 0 );
    this.meanX = xSum / this.points.length;
    this.meanY = ySum / this.points.length;
    
    let numerator = 0;
    let denominator = 0;
    
    this.points.forEach(({ x, y }) => {
      numerator += (x - this.meanX) * (y - this.meanY);
      denominator += (x - this.meanX) ** 2;
    });
    
    this.b = numerator / denominator;
    this.w = this.meanY - (this.b * this.meanX);
  }
  
  run( X ) {
    return ( this.b * X ) + this.w;
  }
  
}

const model = new LinReg();

function onMouseMove({ clientX, clientY }) {
  let rect = canvas.getBoundingClientRect();
  let x = Math.floor(clientX - rect.left);
  let y = Math.floor(canvas.height - (clientY - rect.top));
  cInfo.innerHTML = `x = ${x}, y = ${y}`;
}

function onClick({ clientX, clientY }) {
  title.remove();
  let rect = canvas.getBoundingClientRect();
  // Because the Y axis starts at the top of the canvas and increases as you go down,
  // you must calculate Y as if it started from the bottom->top as (canvas.height-y)
  let x = clientX - rect.left;
  let y = canvas.height - (clientY - rect.top);
  model.addPoint( x, y );
  model.train();
  if ( model.points.length > 1 ) {
    mInfo.innerHTML = `W = ${model.w} <br/> B = ${model.b}`;
  }
  draw();
}

function draw() {
  let size = canvas.height;
  let gridSpacing = 25;
  let gridLength = 0;
  ctx.clearRect(0, 0, size, size);
  
  //Draw grid
  while ( gridLength <= size ) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'grey';
    ctx.beginPath();
    
    //horizontal line
    ctx.moveTo(gridLength, 0);
    ctx.lineTo(gridLength, size);
    
    //vertical line
    ctx.moveTo(0, size-gridLength);
    ctx.lineTo(size, size-gridLength);
    
    ctx.stroke(); 
    gridLength += gridSpacing;
  }
  
  //Draw points
  model.points.forEach(({ x, y }) => {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    //undo y calculations for visualization
    let iY = size-y;
    ctx.arc(x, iY, 5, 0, 2 * Math.PI, true);
    ctx.stroke();
    ctx.fill();
  })
  
  //Draw Prediction Line
  if ( model.points.length > 1 ) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';
    startY = model.run(0);
    endY = model.run(size);
    ctx.beginPath();
    ctx.moveTo(0, size-startY);
    ctx.lineTo(size, size-endY);
    ctx.stroke();
  } 
}

function setCanvasSize() {
  const h = window.innerHeight;
  const cSize = h * 0.7;
  canvas.height = cSize;
  canvas.width = cSize;
  canvas.style.marginTop = `${(h-cSize)/2}px`;
  draw();
}

canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('click', onClick);
window.onresize = setCanvasSize;

window.onload = () => {
  cInfo = document.getElementById('coordinateInfo');
  title = document.getElementById('title');
  mInfo = document.getElementById('modelInfo');
  cInfo.innerHTML = 'x = 0, y = 0';
  mInfo.innerHTML = 'W = 0 <br/> B = 0';
  setCanvasSize();
  document.body.prepend( canvas );
}

