let weatherJSON 
let minTemp = Infinity
let maxTemp = -Infinity
let images = {}
let dx
function preload() {
  weatherJSON = loadJSON("https://api.weather.gov/gridpoints/OKX/33,37/forecast")  
}

function setup() {
  createCanvas(600, 400);
  dx = width/(weatherJSON.properties.periods.length+2)
  
  // const fit = (img) => {
  //   img.resize(dx,0)
  //   redraw()
  // }
  
  for( const p of weatherJSON.properties.periods ) {
    minTemp = min(p.temperature, minTemp)
    maxTemp = max(p.temperature, maxTemp)
    // if( ! (p.icon in images) ) {
    //   images[p.icon] = loadImage(p.icon, fit) 
    // }    
  }
  noLoop()
}

function draw() {
  background(220);
  let px = dx // dx * (i+1), where i = 0
  let py = map( weatherJSON.properties.periods[0].temperature, minTemp, maxTemp, 0.8*height, 0.2*height)
  for( let i = 1; i < weatherJSON.properties.periods.length; i++ ) {
    let cx = dx * (i+1)
    let cy = map( weatherJSON.properties.periods[i].temperature, minTemp, maxTemp, 0.8*height, 0.2*height)
    line(px,py,cx,cy)
    px = cx
    py = cy
    // if( weatherJSON.properties.periods[i].icon in images ) {
    //   image(images[weatherJSON.properties.periods[i].icon],dx*(i+1),height/2)   
    // }    
  }
  
  // console.log(images)
  
  axes() 
  
  //Title of graph
  
  
  labels()
}

function keyPressed() {
  redraw()
}

function axes() {
  //y-axis
  line(dx, height*0.1, dx, height*0.9)
  
  //x-axis
  line(height*0.1, width-240, height*1.4, width-240)
}

//Labeling the x and y axes
function labels() {
  
  //Label of x-axis
  textAlign(CENTER,CENTER)
  //textStyle(BOLD)
  text("Day", width/2, height*0.95)
  
  //Label of Graph
  textAlign(CENTER,CENTER)
  //textStyle(BOLD)
  text("Forcast Temperature", width/2, height*0.1)
  
  //Label of y-axis
  textAlign(CENTER,CENTER)
  translate(25, 200)
  rotate(PI*1.5)
  //textStyle(BOLD)
  text("Temperature (In Fahrenheit)", 0, 0)
}
