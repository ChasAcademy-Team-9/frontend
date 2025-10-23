import Card from '../components/Card';
import BackArrow from '../components/BackArrow';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { packageService } from '../api/packageService';
import type { Package } from '../types/package';

const PackageList = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await packageService.getAllPackages();
        setPackages(response.packages);
      } catch (err: unknown) {
        console.error("Error fetching packages:", err);
        setError("Kunde inte ladda paket");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold text-text-dark">Laddar paket...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold text-error">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-secondary hover:brightness-110 text-text-light rounded-2xl cursor-pointer"
          >
            Försök igen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-background min-h-screen'>
      <div className='flex items-center p-4 mb-6 bg-secondary text-dark'>
        <div className='mr-4'>
          <BackArrow />
        </div>
        <h1 className='text-3xl font-bold flex-1 text-center mr-10'>Alla paket med information</h1>
      </div>
      <div className='p-4 space-y-6'>
        {packages.map((pkg) => (
          <div key={pkg.PackageID} className="space-y-4">

            <Card
              variant='package'
              paketId={pkg.PackageID.toString()}
              destination={pkg.Destination || 'Okänd'}
              vikt={`${pkg.PackageWeight}kg`}
              status={pkg.Status || 'Väntande'}
              onClick={() => navigate(`/package-details-driver/${pkg.PackageID}`)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-secondary rounded p-4 cursor-pointer"
                onClick={() => navigate(`/package-details-driver/${pkg.PackageID}`)}>
                <h4 className="font-bold text-dark mb-3">Transportinformation</h4>
                <div className="space-y-2 text-s text-dark">
                  <p><strong>Förare:</strong> {pkg.DriverName}</p>
                  <p><strong>Ursprung:</strong> {pkg.Origin || 'Okänt ursprung'}</p>
                  <p><strong>Destination:</strong> {pkg.Destination || 'Okänd destination'}</p>
                  <p><strong>Status:</strong> {pkg.Status || 'Behandlas'}</p>
                  <p><strong>Mått:</strong> {pkg.PackageWidth}x{pkg.PackageHeight}x{pkg.PackageDepth}cm</p>
                </div>
              </div>

              <div className="bg-secondary rounded p-4 cursor-pointer"
                onClick={() => navigate(`/package-details-driver/${pkg.PackageID}`)}>
                <h4 className="font-bold text-dark mb-3">Personinformation</h4>
                <div className="space-y-2 text-s text-dark">
                  <p><strong>Avsändare:</strong> {pkg.SenderName}</p>
                  <p><strong>Mottagare:</strong> {pkg.ReceiverName}</p>
                  <p><strong>Förare:</strong> {pkg.DriverName}</p>
                </div>
              </div>
            </div>

            {pkg.GPSLatitude && pkg.GPSLongitude && (
              <div className="bg-white border border-gray-200 rounded p-4 shadow-sm">
                <h4 className="font-bold text-text-dark mb-3">GPS-position</h4>
                <div className="space-y-2 text-s text-text-dark">
                  <p><strong>Latitud:</strong> {pkg.GPSLatitude.toFixed(6)}</p>
                  <p><strong>Longitud:</strong> {pkg.GPSLongitude.toFixed(6)}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`https://maps.google.com/?q=${pkg.GPSLatitude},${pkg.GPSLongitude}`, '_blank');
                    }}
                    className="mt-3 px-6 py-2 bg-primary hover:brightness-150 text-text-light rounded-2xl cursor-pointer text-sm"
                  >
                    Visa på karta
                  </button>
                </div>
              </div>
            )}

            <hr className="border-secondary-200 my-8" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageList;