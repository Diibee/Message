// This sketch creates a grid of text repeating the word "BREATHE".
// Each letter is represented as a "particle" object. The text shrinks and moves towards the mouse when the mouse is near.
const particles = []
const txt = "DIBE"
const clr = "white"

let txtindex = 0
let font;

// Control the resolution and text scale
let res;
let scale;

// Control margin and spacing between letters
let margin;
let xSpacing;
let ySpacing;
let maxDist;

// Control speed of text movement
const speed = 0.003

function reset() {
	scale = res / 400;
	margin = 40*scale;
	xSpacing = 10*scale;
	ySpacing = 13*scale;
	maxDist = 100*scale;
}

function setup() {
  res =	Math.min(windowWidth, windowHeight);
	reset();
	
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
	textFont("Space Mono");
  
	// Iterate over grid positions, minus some margins
	for (let y = margin; y <= height - margin; y += ySpacing) {
    for (let x = margin; x <= width - margin; x += xSpacing) {
      particles.push({
				x, 
				y, 
				clr,
				origX: x,
				origY: y,
				targetX: x, 
				targetY: y,
				txt: txt[txtindex]
			})
			
      txtindex = (txtindex +  1) % txt.length;
    }
  }
	
	describe("A meditative grid of text that repeats 'breathe'. The grid warps to provide more spacing for letters centered around the mouse position.")
}

function draw() {
  background(0);

	// For each letter...
  for (let particle of particles) {
		// Calculate target XY based on distance from mouse
    const d = dist(particle.origX, particle.origY, mouseX, mouseY)
		
    const distortionX = map(d, 0, maxDist, mouseX, particle.origX, true)
    const distortionY = map(d, 0, maxDist, mouseY, particle.origY, true)
        
    particle.targetX = distortionX;
    particle.targetY = distortionY;

		// Move towards the target XY based on the speed variable
    const dx = (particle.targetX - particle.x)*speed
    const dy = (particle.targetY - particle.y)*speed
    particle.x = particle.x + dx    
    particle.y = particle.y + dy
    
		// Set the text size based on distance from mouse
    textSize(map(d, 0, maxDist, 2*scale, 16*scale, true))
		
		// Draw letter :)
    fill(particle.clr);
    text(particle.txt, particle.x, particle.y)
  }
}