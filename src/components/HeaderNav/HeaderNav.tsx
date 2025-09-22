import { FaHome, FaMapMarkerAlt, FaQrcode } from 'react-icons/fa';
import { NavItem } from "./NavItem";

export function HeaderNav() {
    return (
        <nav className="flex gap-6 justify-center bg-secondary rounded p-1">
            <NavItem to="/">
                <FaHome />
                Home
            </NavItem>
            <NavItem to="/scan">
                <FaQrcode />
                Scan
            </NavItem>
            <NavItem to="/postion">
                <FaMapMarkerAlt />
                Position
            </NavItem>
        </nav>
    )
}
