import Card from '../components/Card';
import BackArrow from '../components/BackArrow';
import { PrimaryButton } from '../components/PrimaryButton';
import { LuCheck } from 'react-icons/lu';

const ConfirmationRapport: React.FC = () => {
  const currentTime = new Date().toLocaleTimeString('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const currentDate = new Date().toLocaleDateString('sv-SE');

  return (
    <div className='p-5 max-w-2xl mx-auto'>
      <div className='text-center mb-8 p-5 bg-secondary text-text-dark rounded-2xl'>
        <h1 className='text-4xl font-bold mb-3 flex items-center justify-center gap-3'>
          <LuCheck className='text-success' size={36} />
          Rapport Skickad
        </h1>
      </div>

      <div className='bg-secondary/80 p-5 rounded-2xl mb-6 bordered-2xl'>
        <h2 className='text-xl font-semibold text-text-dark mb-4 mt-0'>
          Rapportdetaljer
        </h2>
        <div className='flex justify-between items-center py-2'>
          <span className='font-semibold text-text-dark'>Skickad:</span>
          <span className='text-text-dark'>
            {currentDate} kl. {currentTime}
          </span>
        </div>
        <div className='flex justify-between items-center py-2 border-b border-[var(--color-border)]'>
          <span className='font-semibold text-text-dark '>Status:</span>
          <span className='text-success font-semibold'>Bekräftad</span>
        </div>
        <div className='flex justify-between items-center py-2'>
          <span className='font-semibold text-text-dark'>Rapport-ID:</span>
          <span className='text-text-dark'>
            RPT-{Date.now().toString().slice(-6)}
          </span>
        </div>
      </div>

      <div className='bg-secondary/80 p-5 mb-6 rounded-2xl'>
        <h2 className='text-xl text-text-dark font-semibold mb-4'>
          Packetinformation
        </h2>
        <Card
          variant='package'
          fordonId='XYZ123'
          paketId='12345'
          destination='Stockholm'
          vikt='5 kg'
          info={{ tid: currentTime }}
        />
      </div>

      <div className='bg-secondary/80 p-5 mb-6 rounded-2xl'>
        <h2 className='text-xl font-semibold text-text-dark mb-3 mt-0'>
          Nästa steg
        </h2>
        <ul>
          <li className='text-text-dark flex items-center gap-2'>
            <LuCheck className='text-success' size={16} />
            Rapporten har sparats i systemet
          </li>
          <li className='text-text-dark flex items-center gap-2'>
            <LuCheck className='text-success' size={16} />
            En kopia har skickats till huvudkontoret
          </li>
          <li className='text-text-dark flex items-center gap-2'>
            <LuCheck className='text-success' size={16} />
            Du kan nu fortsätta med nästa transport
          </li>
        </ul>
      </div>

      <div className='flex gap-4 justify-center mt-8 flex-wrap'>
        <BackArrow />
        <PrimaryButton
          text='Skriv ut Bekräftelse'
          onClick={() => window.print()}
        />
      </div>
    </div>
  );
};

export default ConfirmationRapport;
