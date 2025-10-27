import { FaBomb, FaBox, FaHourglass, FaReceipt, FaTruck } from 'react-icons/fa';
import BackArrow from '../../components/BackArrow';
import { PrimaryButton } from '../../components/PrimaryButton';
import Card from '../../components/Card';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HeaderNavigation from '../../components/HeaderNavigation';

export function Sender() {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([] as ApiPackage[]);

  useEffect(() => {
    async function loadPackages() {
      const response = await fetch(
        'https://team9testwebapp-h3b5c7gqgbeqhxgp.swedencentral-01.azurewebsites.net/api/packages'
      );
      const data = await response.json();
      setPackages(data.packages);
    }
    loadPackages();
  }, []);

  const packageCards = packages.map((p: ApiPackage) => (
    <Card
      destination={p.Destination}
      fordonId={p.DriverID + ' ' + p.DriverName}
      key={p.PackageID}
      paketId={p.PackageID.toString()}
      status={p.Status}
      variant='package'
      vikt={p.PackageWeight.toString()}
    />
  ));

  return (
    <>
      <HeaderNavigation />
      <main className='flex flex-col p-8 gap-8 max-w-4xl mx-auto'>
        <header className='flex gap-2'>
          <BackArrow />
          <div className='flex flex-col'>
            <h1 className='text-4xl'>Avsändare</h1>
            <p>Hantera dina paket och sensorer.</p>
          </div>
        </header>
        <div className='flex flex-col gap-8 bg-white/75 p-4 m-[-1rem] rounded-b-3xl rounded-t-2xl mb-1'>
          <section className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <div>
              <FaBox /> <span>{packages.length}</span>
              <span> paket totalt</span>
            </div>
            <div>
              <FaReceipt />{' '}
              <span>
                {packages.filter((p) => p.Status == 'Registered').length}
              </span>
              <span> registrerade paket</span>
            </div>
            <div>
              <FaHourglass />{' '}
              <span>
                {packages.filter((p) => p.Status == 'Pending').length}
              </span>{' '}
              <span> väntande paket</span>
            </div>
            <div>
              <FaTruck />{' '}
              <span>
                {packages.filter((p) => p.Status == 'Transit').length}
              </span>{' '}
              <span> paket på väg</span>
            </div>
          </section>
          <section>
            <FaBomb /> Du har{' '}
            {packages.filter((p) => p.Status == 'Warning').length || 'ingen'}{' '}
            aktiv varning som behöver hanteras.
          </section>
          <PrimaryButton
            text='+ Skapa nytt paket'
            onClick={() => navigate('/sender/new')}
          />
        </div>
        <div className='flex flex-col gap-8 bg-white/75 p-4 m-[-1rem] rounded-b-3xl rounded-t-2xl'>
          <div className='flex justify-left items-baseline gap-4'>
            <h2 className='text-2xl'>Mina paket</h2>
            <span>{packages.length > 0 ? packages.length + ' paket' : ''}</span>
          </div>
          {/* // TODO Visa laddar paket... före laddat och inga paket om 0 st */}
          {packageCards}
        </div>
      </main>
    </>
  );
}

type ApiPackage = {
  Destination: string;
  DriverID: number;
  DriverName: string;
  GPSLatitude: number | null;
  GPSLongitude: number | null;
  Origin: string;
  PackageDepth: number;
  PackageHeight: number;
  PackageID: number;
  PackageWeight: number;
  PackageWidth: number;
  ReceiverID: number;
  ReceiverName: string;
  SenderID: number;
  SenderName: string;
  Status: 'Registered' | 'Pending' | 'Transit' | 'Delivered' | 'Warning';
};
