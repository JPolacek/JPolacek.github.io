import TubeGame from './pages/TubeGame'
import Home from './pages/Home'
import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/TubeGame" element={<TubeGame />} />
      </Routes>
    </Router>
  );
}

export default App;
