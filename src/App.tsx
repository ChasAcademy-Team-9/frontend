<<<<<<< HEAD
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Position from "./routes/Position";
import Scan from "./routes/Scan";
import BottomNav from "./components/BottomNav";
=======
import { FaBeer } from 'react-icons/fa';
import { PrimaryButton } from './components/PrimaryButton/PrimaryButton';
import { SecondaryButton } from './components/SecondaryButton/SecondaryButton';
>>>>>>> development

function App() {
  return (
 <Router>
      <div id="root">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/position" element={<Position/>} />
          <Route path="/scan" element={<Scan/>} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}
export default App;
