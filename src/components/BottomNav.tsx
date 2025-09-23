import { Link } from "react-router-dom";
import { FaHome, FaMapMarkerAlt, FaQrcode } from 'react-icons/fa';

export default function BottomNav() {
  return (
   <nav className="bottom-nav">

      <Link to="/" className="nav-link">
        <FaHome />
      </Link>

      <Link to="/scan" className="nav-link">
        <FaQrcode />
      </Link>

      <Link to="/position" className="nav-link">
        <FaMapMarkerAlt />
      </Link>
    </nav>

  );
}