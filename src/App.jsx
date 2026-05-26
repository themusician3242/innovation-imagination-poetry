import React, {useState, useEffect, useRef} from 'react';
import Hero from './p5/Hero.jsx';

function App({ style_variant = 'default'}) {
  return (
    <div id="app" data-variant={style_variant}>
      {/* Header */}
      <header>
        <h2>Desi Di Nardo</h2>
      </header>

      {/* Hero */}
      <Hero />

      <main>
      {/* Introduction */}
      <section data-section='introduction'>
        <h2>Introduction</h2>
      </section>

      {/* Literature Review */}
      <section data-section='literature-review'>
        <div className='glass-container'>

        </div>
      </section>

      {/* Methodology */}
      <section data-section="methodology">
        <h2>Methodology</h2>
      </section>

      {/* Results & Data */}
      <section data-section='results'>
        <h2>Results & Data</h2>
      </section>

      {/* Resources */}
      <section data-section='resources'>
        <h2>Resources</h2>
      </section>
      
      </main>

      {/* Footer */}
      <footer>
        <p>desidinardo.com | All rights reserved.</p>
        <div>
          {/* LinkedIn Logo */}
          {/* Website Logo */}
          {/* Contact Me Logo */}
        </div>
      </footer>
    </div>
  )
}

export default App;
