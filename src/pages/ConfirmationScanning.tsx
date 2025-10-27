import Card from '../components/Card';
import { useLocation } from 'react-router-dom';
import BackArrow from '../components/BackArrow';
import { LuCheck } from 'react-icons/lu';

const ConfirmationScanning: React.FC = () => {
  const location = useLocation();
  const scannedCode = location.state?.scannedCode;
  const currentTime = new Date().toLocaleTimeString('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='relative bg-secondary text-dark p-4 flex items-center'>
        <div className='mr-6'>
          <BackArrow />
        </div>
        <h1 className='text-3xl font-bold text-center flex-1'>
          Confirmation Scanning
        </h1>
      </div>

      <div className='flex justify-center py-6'>
        <div className='w-32 h-32 bg-success rounded-full flex items-center justify-center'>
          <LuCheck className='text-text-light' size={64} strokeWidth={3} />
        </div>
      </div>

      <h2 className='text-2xl font-bold text-center mb-6 px-4'>Lyckad skanning!</h2>

      {scannedCode && (
        <div className='mx-4 mb-6 p-3 bg-green-100 border-2 border-green-400 rounded-lg'>
          <p className='font-semibold text-green-800 text-sm mb-1'>Skannad kod:</p>
          <p className='text-green-900 break-all'>{scannedCode}</p>
        </div>
      )}

      <div className='px-4 mb-4'>
        <Card
          variant='package'
          fordonId='XYZ123'
          paketId='12345'
          destination='Stockholm'
          vikt='2 kg'
          info={{ tid: currentTime }}
        />
      </div>

      <div className='px-4 mb-6'>
        <Card
          variant='transport'
          fordonId='XYZ123'
          info={{ stad: 'Stockholm', tid: currentTime, adress: 'Centralenheten' }}
        />
      </div>
    </div>
  );
};

export default ConfirmationScanning;