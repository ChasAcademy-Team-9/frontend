import { Link } from "react-router-dom";
import { FaHome, FaMapMarkerAlt, FaQrcode } from 'react-icons/fa';

export function HeaderNav() {
    return (
        <nav className="flex gap-6 justify-center bg-secondary rounded p-1">
            <Link to="/" className="flex gap-1 items-center bg-primary text-text-light py-1 px-3 rounded">
                <FaHome />
                Home
            </Link>
            <Link to="/scan" className="flex gap-1 items-center bg-primary text-text-light py-1 px-3 rounded">
                <FaQrcode />
                Scan
            </Link>
            <Link to="/postion" className="flex gap-1 items-center bg-primary text-text-light py-1 px-3 rounded">
                <FaMapMarkerAlt />
                Position
            </Link>
        </nav>
    )
}
