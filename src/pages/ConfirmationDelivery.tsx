import Card from '../components/Card';
import BackArrow from '../components/BackArrow';
import { LuCheck } from 'react-icons/lu';

const ConfirmationDelivery: React.FC = () => {
  const currentTime = new Date().toLocaleTimeString('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='bg-secondary text-dark p-4'>
        <div className='flex items-center justify-between'>
          <BackArrow />
          <h1 className='text-3xl font-bold flex-1 text-center'>
            Bekräftelse Leverans
          </h1>
          <div className='w-8'></div>
        </div>
      </div>

      <div className='flex justify-center py-6'>
        <div className='w-32 h-32 bg-success rounded-full flex items-center justify-center'>
          <LuCheck className='text-text-light' size={64} strokeWidth={3} />
        </div>
      </div>

      <h2 className='text-2xl font-bold text-center text-dark mb-6 px-4'>
        Lyckad leverans!
      </h2>

      <div className='px-4 pb-6 space-y-4'>
        <Card
          variant='package'
          fordonId='XYZ123'
          paketId='12345'
          destination='Stockholm'
          vikt='2 kg'
          info={{ tid: currentTime }}
        /> 
        <Card
          variant='transport'
          fordonId='XYZ123'
          info={{ stad: 'Stockholm', tid: currentTime, adress: 'Centralenheten' }}
        />
      </div>
    </div>
  );
};

export default ConfirmationDelivery;