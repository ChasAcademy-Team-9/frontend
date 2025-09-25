import { Link } from "react-router-dom";
import { FaHome, FaMapMarkerAlt, FaQrcode } from 'react-icons/fa';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#f6edd9] border-t border-[#3c4a3e] flex justify-around py-4 text-center">
      <Link to="/" className="flex flex-col items-center font-semibold text-[#719677] no-underline transition duration-300 hover:text-[#3c4a3e]">
        <FaHome className="text-[2rem] p-2 transition duration-300 will-change-[filter] hover:drop-shadow-[0_0_2em_#334536aa]" />
      </Link>

      <Link to="/scan" className="flex flex-col items-center font-semibold text-[#719677] no-underline transition duration-300 hover:text-[#3c4a3e]">
        <FaQrcode className="text-[2rem] p-2 transition duration-300 will-change-[filter] hover:drop-shadow-[0_0_2em_#334536aa]" />
      </Link>

      <Link to="/position" className="flex flex-col items-center font-semibold text-[#719677] no-underline transition duration-300 hover:text-[#3c4a3e]">
        <FaMapMarkerAlt className="text-[2rem] p-2 transition duration-300 will-change-[filter] hover:drop-shadow-[0_0_2em_#334536aa]" />
      </Link>
    </nav>
  );
}