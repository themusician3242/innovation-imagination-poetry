import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import './../index.css';

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
  // Define the sketch in Instance Mode
  const sketch = (p) => {
    let timeOffset = 0;
    let shineOffset = 0;
    let glitterShineOffset = 0;
    let glitterParticles = [];
    
    // Performance Variables declared within instance scope
    let colorOffset, colorOffset2, transparencyOffset;

p.setup = () => {
      // 1. Read exact fluid container layout bounds
      const initialWidth = containerRef.current.getBoundingClientRect().width;
      const initialHeight = containerRef.current.getBoundingClientRect().height;

      const canvas = p.createCanvas(initialWidth, initialHeight);
      canvas.parent(containerRef.current);
      
      // 2. CRITICAL FIX: Force the canvas element to block/absolute 
      // This stops it from ever expanding or changing its own parent container dimensions.
      canvas.elt.style.position = 'relative';

      // Populate your glitter array (normalized coordinates so they scale nicely)
      for (let i = 0; i < 60; i++) {
        glitterParticles.push({
          x: p.random(1), 
          y: p.random(1),
          phaseShift: p.random(p.TWO_PI)
        });
      }
    };

    // 2. WINDOW RESIZE HANDSHAKE (Purely fluid mapping)
    p.windowResized = () => {
      if (containerRef.current) {
        // Reads the fluid layout changes safely without feedback loops
        const w = containerRef.current.getBoundingClientRect().width;
        const h = containerRef.current.getBoundingClientRect().height;
        
        p.resizeCanvas(w, h);
      }
    };

    p.draw = () => {
      p.clear();

      // Calculate dynamic values with proper 'p.' instance wrapper mapping
      colorOffset = p.map(p.sin(p.frameCount * 0.05), -1, 1, 30, 100);
      colorOffset2 = p.map(p.sin(p.frameCount * 0.02), -1, 1, 20, 60);
      transparencyOffset = p.map(p.sin(p.frameCount * 0.005), -1, 1, 10, 40);

      p.fill(15, 15, 20, 180 - transparencyOffset); 
      p.noStroke();
      p.rect(0, 0, p.width, p.height); 

      // Render the glitter array behind waves
      drawGlitter();

      // --- DYNAMIC SCALING WAVE INPUTS ---
      // Instead of hardcoding vertical values like '400', we multiply p.height 
      // by decimals to ensure waves scale perfectly up or down with the window size!
      drawPoeticWave(p.height * 0.16, p.color(75 + colorOffset2, 191, 32 + colorOffset), 0.01, p.height/12, timeOffset * 0.2, shineOffset * 1.0);  
      drawPoeticWave(p.height * 0.44, p.color(212 + colorOffset, 175, 55 + colorOffset2), 0.015, p.height/16, timeOffset * 1.2, shineOffset * 2.0);  
      drawPoeticWave(p.height * 0.55, p.color(148, 163 + colorOffset, 184 + colorOffset2), 0.010, p.height/10, timeOffset * 0.8, shineOffset * 1.5); 
      drawPoeticWave(p.height * 0.66, p.color(45 + colorOffset2, 212, 191 + colorOffset), 0.008, p.height/8, timeOffset * 0.5, shineOffset * 1.0);  
      drawPoeticWave(p.height * 0.88, p.color(75 + colorOffset2, 32, 191 + colorOffset), 0.005, p.height/8, timeOffset * 0.2, shineOffset * 1.0);  

      timeOffset -= 0.015; // Natural left-to-right drift
      shineOffset += 0.025; 
      glitterShineOffset += 0.04;
    };

    // Internal helper function scoped to the instance
    const drawPoeticWave = (baseY, baseColor, frequency, amplitude, currentPhase, currentShine) => {
      p.noFill();
      let r = p.red(baseColor);
      let g = p.green(baseColor);
      let b = p.blue(baseColor);

      for (let x = 0; x < p.width; x += 4) {
        let angle1 = (x * frequency) + currentPhase;
        let yOffset1 = p.sin(angle1) * amplitude;
        let nextX = x + 4;
        let angle2 = (nextX * frequency) + currentPhase;
        let yOffset2 = p.sin(angle2) * amplitude;

        let shineAngle = (x * 0.008) - currentShine; 
        let glowFactor = p.pow(p.map(p.sin(shineAngle), -1, 1, 0, 1), 4); 

        p.stroke(r, g, b, p.map(glowFactor, 0, 1, 35, 255));
        p.strokeWeight(p.map(glowFactor, 0, 1, 1.2, 5.5));
        p.line(x, baseY + yOffset1, nextX, baseY + yOffset2);
      }
    };

    function drawGlitter() {
      p.noStroke();
      for (let i = 0; i < glitterParticles.length; i++) {
        let particle = glitterParticles[i];

        let twinkleAngle = glitterShineOffset + particle.phaseShift;
        let twinkleIntensity = p.sin(twinkleAngle); 

        let alpha = p.map(twinkleIntensity, -1, 1, 20, 200);
        p.fill(255, 255, 255, alpha);

        let size = p.map(twinkleIntensity, -1, 1, 1.5, 3.5);
        
        // Multiply by current width/height to make positioning responsive
        p.circle(particle.x * p.width, particle.y * p.height, size);
      }
    }
  };

  // Initialize the p5 runtime instance
  const p5Instance = new p5(sketch);

  // Memory Cleanup: Wipe the canvas when React unmounts the component
  return () => {
    p5Instance.remove();
  };
}, []);

  return (
    /* Removed the unstyled outer div container so #hero directly mounts to your main grid */
    <div 
      id='hero' 
      ref={containerRef} 
    > 
      <div className="hero-container">
        <div>
          <h1>IGNITE</h1>
          <h3>Innovation & Imagination In Education: Poetry Pedagogy To Spark Engagement</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa sapiente velit accusantium corporis labore, laboriosam, quibusdam eos mollitia placeat aspernatur provident? Odio quaerat officia doloremque rem consequatur ab totam quia?
          </p>
        </div>
        <div>
          <div className='glass-container'>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;