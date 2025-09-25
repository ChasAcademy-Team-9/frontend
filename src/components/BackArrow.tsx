import { LuArrowLeft } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

function BackArrow() {
  const navigate = useNavigate();

  return (
    <button
      type='button'
      onClick={() => navigate(-1)}
      aria-label='Gå tillbaka'
      className='hover:scale-105 active:scale-95 transition-all ease-in-out'
    >
      <LuArrowLeft />
    </button>
  );
}

export default BackArrow;
