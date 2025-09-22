import { Link } from "react-router-dom";
import { FaHome, FaMapMarkerAlt, FaQrcode } from 'react-icons/fa';

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

function NavItem({ to, children }: { to: string; children: React.ReactNode }){
    return (
        <Link to={ to } className="flex gap-1 items-center bg-primary text-text-light py-1 px-3 rounded">
            { children }
        </Link>
    )
}
