import Card from '../components/Card';
import BackArrow from '../components/BackArrow';
import { LuCheck } from 'react-icons/lu';

const ConfirmationDelivery: React.FC = () => {
  const currentTime = new Date().toLocaleTimeString('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className='p-5 max-w-2xl mx-auto'>
      <div className='text-center mb-8 p-5 bg-secondary text-dark rounded-2xl'>
        <h1 className='text-4xl font-bold mb-3 flex items-center justify-center gap-3'>
          Bekräftelse Leverans
        </h1>
      </div>

      <div className='flex justify-center mb-8'>
        <div className='w-40 h-40 bg-success rounded-full flex items-center justify-center'>
          <LuCheck className='text-text-light' size={80} strokeWidth={3} />
        </div>
      </div>

      <h2 className='text-2xl font-bold text-center text-dark mb-8'>Lyckad leverans!</h2>

      <div className='mb-6'>
        <Card
          variant='package'
          fordonId='XYZ123'
          paketId='12345'
          destination='Stockholm'
          vikt='2 kg'
          info={{ tid: currentTime }}
        />
      </div>

      <div className='mb-6'>
        <Card
          variant='transport'
          fordonId='XYZ123'
          info={{ stad: 'Stockholm', tid: currentTime, adress: 'Centralenheten' }}
        />
      </div>

      <div className='scale-125 flex gap-4 justify-center mt-8 flex-wrap'>
        <BackArrow />
      </div>
    </div>
  );
};

export default ConfirmationDelivery;
