import React, { Component } from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import submarinerVideo from './assets/submariner.mp4'

// class Landing extends Component {
//   render() {
//     return (
//       <div className="Landing">
//         <video loop={true} autoPlay={true} muted={true} preload={"auto"} className="landing-video" playsInline={true}>
//             <source src={submarinerVideo} type="video/mp4" />
//         </video>
//       </div>
//     );
//   }
// }

function Landing () {
  return (
    <div className="Landing">
      <video loop={true} autoPlay={true} muted={true} preload={"auto"} className="landing-video" playsInline={true}>
          <source src={submarinerVideo} type="video/mp4" />
      </video>
      <div className="Title">
        <h1>SUBMARINER</h1>
        <h3>The reference among divers' watches</h3>
      </div>
    </div>
  );
}

export default Landing;
