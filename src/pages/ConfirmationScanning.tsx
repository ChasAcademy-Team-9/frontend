import Card from '../components/Card';
import { useLocation } from 'react-router-dom';
import BackArrow from '../components/BackArrow';
import { PrimaryButton } from '../components/PrimaryButton';
import { LuCheck } from 'react-icons/lu';

const ConfirmationScanning: React.FC = () => {
  const location = useLocation();
  const scannedCode = location.state?.scannedCode;
  const currentTime = new Date().toLocaleTimeString('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className='p-5 max-w-2xl mx-auto'>
      <div className='text-center mb-8 p-5 bg-secondary text-dark rounded'>
        <h1 className='text-4xl font-bold mb-3 flex items-center justify-center gap-3'>
          Confirmation Scanning
        </h1>
      </div>

      <div className='flex justify-center mb-8'>
        <div className='w-40 h-40 bg-success rounded-full flex items-center justify-center'>
          <LuCheck className='text-text-light b' size={80} strokeWidth={3} />
        </div>
      </div>

      <h2 className='text-2xl font-bold text-center mb-8'>Lyckad skanning!</h2>
      {scannedCode && (
        <div className='mb-6 p-4 bg-green-100 border-2 border-green-400 rounded-lg w-full max-w-xs mx-auto'>
          <p className='font-semibold text-green-800 text-sm mb-1'>Skannad kod:</p>
          <p className='text-green-900 break-all'>{scannedCode}</p>
        </div>
      )}

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

      <div className='flex gap-4 justify-center mt-8 flex-wrap'>
        <BackArrow />
        <PrimaryButton
          text='Starta transport'
          onClick={() => {
            alert('Starta transport!');
          }}
        />
      </div>
    </div>
  );
};

export default ConfirmationScanning;
