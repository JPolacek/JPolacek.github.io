import './App.css';
import Fader from './components/Fader'
import ChooChoo from './components/ChooChoo'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Fader text="Jake Polacek">
          <a className="App-link" href="JakePolacekResume2024.pdf">
            Goodbye.
          </a>
          <ChooChoo className="choochoo" src="tube-train.png"/>
        </Fader>
      </header>
    </div>
  );
}

export default App;
