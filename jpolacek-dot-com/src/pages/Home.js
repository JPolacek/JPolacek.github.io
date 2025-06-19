import "./Home.css";
import Fader from "../components/Fader";
import ChooChoo from "../components/ChooChoo";
import React from "react";

// <p>
// Here for{" "}
// <a className="App-link" href="Jake_Polacek_Resume.pdf">
//   <span>business</span>
// </a>
// <br />
// Or games? &darr;
// </p>

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <Fader text="Jake Polacek" />
        <ChooChoo className="choochoo" src="tube-train.png" />
      </header>
    </div>
  );
}

export default Home;
