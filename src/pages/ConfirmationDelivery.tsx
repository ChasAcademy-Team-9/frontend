import Card from '../components/Card';
import BackArrow from '../components/BackArrow';
import { LuCheck } from 'react-icons/lu';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { packageService } from '../api/packageService';
import type { Package } from '../types/package';

const ConfirmationDelivery: React.FC = () => {
  const { paketId } = useParams<{ paketId: string }>();
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentTime = new Date().toLocaleTimeString('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
  });

  useEffect(() => {
    const fetchPackageData = async () => {
      if (!paketId) {
        setError("Package ID not found");
        setLoading(false);
        return;
      }

      try {
        const response = await packageService.getPackageById(parseInt(paketId));
        setPackageData(response.package);
      } catch (err: unknown) {
        console.error("Error fetching package:", err);
        setError("Failed to load package data");
      } finally {
        setLoading(false);
      }
    };

    fetchPackageData();
  }, [paketId]);

  if (loading) {
    return (
      <div className='max-w-2xl mx-auto'>
        <div className='p-4 text-center'>
          <div className="text-xl font-semibold text-dark">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !packageData) {
    return (
      <div className='max-w-2xl mx-auto'>
        <div className='p-4 text-center'>
          <div className="text-xl font-semibold text-red-600">{error || "Package not found"}</div>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-2xl mx-auto'>
      <div className='p-4 text-center p-3 bg-secondary text-dark mb-6'>
        <div className='flex items-center justify-between mb-3'>
          <BackArrow />
          <h1 className='text-4xl font-bold flex-1 text-center'>
            Bekräftelse Leverans
          </h1>
          <div className='w-8'></div>
        </div>
      </div>

      <div className='flex justify-center mb-6'>
        <div className='w-40 h-40 bg-success rounded-full flex items-center justify-center'>
          <LuCheck className='text-text-light' size={80} strokeWidth={3} />
        </div>
      </div>

      <h2 className='text-2xl font-bold text-center text-dark mb-8'>Lyckad leverans!</h2>

      <div className='p-4 mb-5 space-y-4'>
        <Card
          variant='package'
          fordonId='AB123CD'
          paketId={packageData.PackageID.toString()}
          destination={packageData.Destination || 'Unknown'}
          vikt={`${packageData.PackageWeight} kg`}
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