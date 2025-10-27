import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';
import { Link } from 'react-router-dom';

function HeaderNavigation() {
  return (
    <nav className='flex justify-between items-center gap-4 p-4 '>
      <Link to='/'>
        <h2 className='text-2xl font-bold text-primary'>Chas 9</h2>
      </Link>
      <div className='flex justify-center items-center gap-2'>
        <Link to='/sign-up'>
          <PrimaryButton text='Registrera' />
        </Link>
        <Link to='/login'>
          <SecondaryButton text='Logga in' />
        </Link>
      </div>
    </nav>
  );
}

export default HeaderNavigation;
