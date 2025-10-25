let fft;
let sound;
let amplitude;
let images = [];
let imageNames =  "assets/UFO 5.png", "assets/UFO 4.png", "assets/UFO 3.png", "assets/UFO 2.png", "assets/UFO 1.png",
  "assets/blackhole1.png", "assets/blackhole2.png", "assets/blackhole3.png", "assets/blackhole4.png",
  "assets/blackhole5.png", "assets/blackhole6.png", "assets/blackhole7.png"


let colors = ["#9ff5f1", "#acf2ef", "#ccdedd", "#9fabaa", "#5f6968", "#07ada0", "#43a39c", "#498783", "#5bc9c2", "#e6f2f1"];

function preload() {
  sound = loadSound("assetts/Ode to Joy 01 222.mp3");
  
  for (let i = 0; i < imageNames.length; i++) {
    images.push(loadImage(imageNames[i]));
  }
}

function setup() {
  createCanvas(windowWidth, 600);
  
  fft = new p5.FFT();
  amplitude = new p5.Amplitude();
  
  sound.amp(0.5);
  sound.loop();
}

function draw() {
  background(random(colors));
  let level = amplitude.getLevel();
  
  let spectrum = fft.analyze(); 
  noStroke();
  fill(random(20, 195));
  
  for(let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h);
  }
  
  let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(20);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, 0, height);
    vertex(x, y);
    
      if (y > 350) {
    let randomImg = random(images);
    let imgX = random(width - 100);
    let imgY = random(height - 100);
    image(randomImg, imgX, imgY, 100, 100);
  }
}
  
  endShape();
  

}

