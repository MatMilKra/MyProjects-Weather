import { Weather } from './components/Weather';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { useState, createContext } from "react"
import { Navbar } from './components/navbar';

export const AppContext = createContext()

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [myobject, setMyobject] = useState({});
  const [correct, setCorrect] = useState(true);
  return (
    <div className="App">
      <AppContext.Provider value={{
        latitude, setLatitude,
        longitude, setLongitude,
        myobject, setMyobject,
        correct, setCorrect,
      }}>


        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<div>Please fill the fields above</div>} />
            <Route path="/weather" element={<Weather />} />
          </Routes>
        </Router>
      </AppContext.Provider>

    </div>
  );
}

export default App;
