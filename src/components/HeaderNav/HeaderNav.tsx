import { Link } from "react-router-dom";
import { FaHome, FaMapMarkerAlt, FaQrcode } from 'react-icons/fa';

export function HeaderNav() {
    return (
        <nav className="flex gap-6">
            <Link to="/" className="flex">
                <FaHome />
                Home
            </Link>
            <Link to="/scan" className="flex">
                <FaQrcode />
                Scan
            </Link>
            <Link to="/postion" className="flex">
                <FaMapMarkerAlt />
                Position
            </Link>
        </nav>
    )
}
