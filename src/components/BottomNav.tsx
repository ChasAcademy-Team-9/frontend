import { Link } from 'react-router-dom';
import { FaHome, FaMapMarkerAlt, FaQrcode } from 'react-icons/fa';

export default function BottomNav() {
  return (
    <nav className='fixed bottom-0 left-0 w-full bg-background border-t border-primary flex justify-around items-center text-center py-4'>
      <Link to='/' className='text-2xl hover:text-primary'>
        <FaHome />
      </Link>
      <Link to='/scan' className='text-2xl hover:text-primary'>
        <FaQrcode />
      </Link>
      <Link to='/position' className='text-2xl hover:text-primary'>
        <FaMapMarkerAlt />
      </Link>
    </nav>
  );
}
