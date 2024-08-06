import './Home.css';
import Fader from '../components/Fader'
import ChooChoo from '../components/ChooChoo'
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
	<div className="App">
	  <header className="App-header">
		<Fader text="Jake Polacek">
		  <a className="App-link" href="JakePolacekResume2024.pdf">
			Goodbye.
		  </a>
		</Fader>
		<Link to="/TubeGame">
		  <ChooChoo className="choochoo" src="tube-train.png" />
		</Link>
	  </header>
	</div>
  );
}

export default Home;
