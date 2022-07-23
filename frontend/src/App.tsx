import React from 'react';
import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import WatchIcon from '@mui/icons-material/Watch';
// import submarinerVideo from '../assets/submariner.mp4'
// import submarinerVideo from './submariner.mp4'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <video src="../assets/submariner.mp4" type="video/mp4" autoplay="" playsinline="" loop={true} preload="auto" class="landing-video"/> */}
        <video autoPlay loop preload="auto" className="landing-video" playsInline>
          {/* <source src={"../assets/submariner.mp4"} type="video/mp4" /> */}
          {/* <source src={submarinerVideo} type="video/mp4" /> */}
        </video>
        {/* <svg data-testid="WatchIcon"></svg> */}
        {/* <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p> */}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
