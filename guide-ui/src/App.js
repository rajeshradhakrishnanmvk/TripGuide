// JavaScript (React)
import React from 'react'; // Import React
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import react-router-dom components
import TripComponent from './TripComponent'; // Import your data component
import MapComponent from './MapComponent'; // Import your map component


const App = () => {
  return (
    <Router> {/* Router component */}
      <header> {/* Header */}
        <h1>One Day Trip Planner</h1>
      </header>
      <div style={{ display: 'flex' }}> {/* Main content */}
        <nav style={{ marginRight: '1rem' }}> {/* Left menu */}
          <ul>
            <li><Link to="/trip">Plan</Link></li>
            <li><Link to="/map">Map</Link></li>
          </ul>
        </nav>
        <main> {/* Body */}
      <Routes> {/* Routes component */}
        <Route path="/trip" element={<TripComponent />} /> {/* Route for /data */}
        <Route path="/map" element={<MapComponent />} /> {/* Route for /map */}
      </Routes>
        </main>
      </div>
      <footer> {/* Footer */}
        <p>© 2022 One Day Trip Planner</p>
      </footer>
    </Router> // End of the router component
  );
};

export default App; // Export the App component