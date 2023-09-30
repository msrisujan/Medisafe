import React from 'react';
// import {Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import webGLFluidEnhanced from 'webgl-fluid-enhanced';
import { useScramble } from 'use-scramble';
import { Navigate } from 'react-router-dom';
import '../App.css';


function App({loggedIn,isDoctor,isPatient,isConnectedToPeraWallet,handleConnectWalletClick,handleDisconnectWalletClick}) {
  const canvasRef = useRef(null);





  useEffect(() => {
    webGLFluidEnhanced.simulation(canvasRef.current, {
      SIM_RESOLUTION: 128, // Resolution of the simulation grid
  DYE_RESOLUTION: 1024, // Resolution of the dye grid
  CAPTURE_RESOLUTION: 512, // Resolution of captured frames
  DENSITY_DISSIPATION: 1, // Rate at which density dissipates
  VELOCITY_DISSIPATION: 0.5, // Rate at which velocity dissipates
  PRESSURE: 0.1, // Pressure value used in the simulation
  PRESSURE_ITERATIONS: 20, // Number of pressure iterations
  CURL: 2, // Curl value used in the simulation
  INITIAL: false, // Enables splats on initial load
  SPLAT_AMOUNT: 2, // Number of initial splats (Random number between n and n * 5)
  SPLAT_RADIUS: 0.05, // Radius of the splats
  SPLAT_FORCE: 6000, // Force applied by the splats
  SPLAT_KEY: '', // Keyboard key to spawn new splats (empty to disable)
  SHADING: true, // Enables shading in the visualization
  COLORFUL: true, // Enables rapid changing of colors
  COLOR_UPDATE_SPEED: 10, // Speed of color update
  // COLOR_PALETTE: [], // Custom color palette (empty by default, uses hex colors)
  HOVER: true, // Enables interaction on hover
  TRANSPARENT: false, // Makes the canvas transparent if true
  BRIGHTNESS: 0.3, // Color brightness (Recommend lower than 1.0 if BLOOM is true)
  BLOOM: false, // Enables bloom effect
  BLOOM_ITERATIONS: 8, // Number of bloom effect iterations
  BLOOM_RESOLUTION: 256, // Resolution of the bloom effect
  BLOOM_INTENSITY: 0.8, // Intensity of the bloom effect
  BLOOM_THRESHOLD: 0.6, // Threshold for the bloom effect
  BLOOM_SOFT_KNEE: 0.7, // Soft knee value for the bloom effect
  SUNRAYS: true, // Enables sunrays effect
  SUNRAYS_RESOLUTION: 196, // Resolution of the sunrays effect
  SUNRAYS_WEIGHT: 1, // Weight of the sunrays effect
  COLOR_PALETTE: ['#12C0CF','#16D9EB','#33DEED','#50E3F0','#6EE7F2', '#8BECF5', '#A8F1F7']

    });
  }, []); 


  const { ref:refright } = useScramble({
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    range: [65,125],
    speed: 1,
    tick: 1,
    step: 5,
    scramble: 5,
    seed: 2,
    chance: 1,
    overdrive: false,
    overflow: false,
  });

  const { ref:refleft } = useScramble({
    text: "Lorem Ipsum is sim dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    range: [65,125],
    speed: 1,
    tick: 1,
    step: 5,
    scramble: 5,
    seed: 2,
    chance: 1,
    overdrive: false,
    overflow: false,
  });

  
  return (
    <div className="App">
       
      {/* Navbar */}
      <section id="bg">
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', position: 'fixed',left: '0', top: '0' }} />
      <nav className="navbar">
        <div className="navbar-left">
          <img src="logo.png" alt="Logo" className="logo" />
          <span className="navbar-text">Medisafe</span>
        </div>
        <div className="navbar-right">
        <button
          onClick={
            isConnectedToPeraWallet ? handleDisconnectWalletClick : handleConnectWalletClick
          } className='navbar-button'>
          {isConnectedToPeraWallet ? "Disconnect" : "Connect to Pera Wallet"}
        </button>
        </div>
      </nav>

      

      {
        loggedIn ? <Navigate to="/signup" /> : null
      }
      {
        isDoctor ? <Navigate to="/doctorprofile" /> : null
      }
      {
        isPatient ? <Navigate to="/patientprofile" /> : null
      }
     

      <section className="animated-section">
      <div className="background-image"></div>
      <div className="content2">
      <svg width="669" height="92" viewBox="0 0 669 92" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className='svgstroke' d="M77.48 40.08L59.56 72.08H41.64L23.72 40.08V90H0.68V0.399994H25L50.6 47.76L76.2 0.399994H100.52V90H77.48V40.08ZM186.97 90H115.93V0.399994H186.97V18.32H138.97V35.6H176.73V53.52H138.97V72.08H186.97V90ZM247.1 0.399994C256.743 0.399994 264.039 2.91733 268.988 7.952C274.023 12.9013 276.54 20.1973 276.54 29.84V60.56C276.54 70.2027 274.023 77.5413 268.988 82.576C264.039 87.5253 256.743 90 247.1 90H197.18V0.399994H247.1ZM253.5 29.84C253.5 22.16 249.66 18.32 241.98 18.32H220.22V72.08H241.98C249.66 72.08 253.5 68.24 253.5 60.56V29.84ZM331.545 90H285.465V72.08H296.985V18.32H285.465V0.399994H331.545V18.32H320.025V72.08H331.545V90ZM340.367 71.44C363.748 72.72 379.578 73.36 387.855 73.36C389.818 73.36 391.354 72.8053 392.463 71.696C393.658 70.5013 394.255 68.9227 394.255 66.96V55.44H364.815C355.855 55.44 349.327 53.4347 345.231 49.424C341.22 45.328 339.215 38.8 339.215 29.84V26C339.215 17.04 341.22 10.5547 345.231 6.544C349.327 2.448 355.855 0.399994 364.815 0.399994H409.743V18.32H369.935C364.815 18.32 362.255 20.88 362.255 26V28.56C362.255 33.68 364.815 36.24 369.935 36.24H392.975C401.338 36.24 407.482 38.2027 411.407 42.128C415.332 46.0533 417.295 52.1973 417.295 60.56V66.96C417.295 75.3227 415.332 81.4667 411.407 85.392C407.482 89.3173 401.338 91.28 392.975 91.28C388.623 91.28 384.015 91.1947 379.151 91.024L367.375 90.512C358.671 90.0853 349.668 89.488 340.367 88.72V71.44ZM442.305 90H417.345L451.265 0.399994H476.865L510.785 90H485.825L480.065 74H448.065L442.305 90ZM453.825 57.36H474.305L464.065 27.28L453.825 57.36ZM540.22 90H517.18V0.399994H588.22V18.32H540.22V39.44H577.98V57.36H540.22V90ZM668.22 90H597.18V0.399994H668.22V18.32H620.22V35.6H657.98V53.52H620.22V72.08H668.22V90Z" fill="#32D7DB"/>
      </svg>
        <p className="description">Your trusted healthcare solution.</p>
      </div>
    </section>

      {/* Second Section */}
      <div className="section">
        <div className="section-left">
          <img src="image1.jpg" alt="Images 1" className="section-image" />
        </div>
        <div className="section-right">
          <h2 className='abt-heading'>Content Title</h2>
          <p ref = {refright} />
        </div>
      </div>

      {/* Third Section */}
      <div className="section">
        <div className="section-left">
          <h2>Content Title</h2>
          <p ref = {refleft} />
        </div>
        <div className="section-right">
          <img src="image2.jpg" alt="Images 2" className="section-image" />
        </div>
      </div>

      <footer id="footer">
      <div class="down">
        <i class="social-icon fa-brands fa-facebook fa-2x"></i>
        <i class="social-icon fa-brands fa-square-x-twitter fa-2x"></i> 
        <i class="social-icon fa-brands fa-instagram fa-2x"></i>
        <i class="social-icon fa-regular fa-envelope fa-2x"></i>
        <p>© Copyright Medisafe</p>
      </div>
    </footer>
    </section>
    </div>
  );
}

export default App;