import Card from '../components/Card';
import BackArrow from '../components/BackArrow';
import Input from '../components/Input';
import { PrimaryButton } from '../components/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { packageService } from '../api/packageService';
import type { Package } from '../types/package';
import { FaSearch, FaTimes } from 'react-icons/fa';

const PackageList = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchPackageId, setSearchPackageId] = useState('');
  const [searchDestination, setSearchDestination] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Snabbfilterknappar för vanliga statusar
  const quickFilters = [
    { label: 'Alla', status: '' },
    { label: 'Registered', status: 'Registered' },
    { label: 'Försenad', status: 'Försenad' },
    { label: 'Levererad', status: 'Levererad' }
  ];

  // Filtrera paket baserat på sökkriterier
  const filteredPackages = useMemo(() => {
    return packages.filter(pkg => {
      const matchesPackageId = searchPackageId === '' ||
        pkg.PackageID.toString().includes(searchPackageId);

      const matchesDestination = searchDestination === '' ||
        (pkg.Destination?.toLowerCase().includes(searchDestination.toLowerCase()) ?? false);

      const matchesStatus = selectedStatus === '' || pkg.Status === selectedStatus;

      return matchesPackageId && matchesDestination && matchesStatus;
    });
  }, [packages, searchPackageId, searchDestination, selectedStatus]);

  const clearFilters = () => {
    setSearchPackageId('');
    setSearchDestination('');
    setSelectedStatus('');
  };

  // Funktion för att öppna Google Maps med GPS-koordinater
  const openGoogleMaps = (latitude: number, longitude: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation(); // Förhindra att package card klickas
    }
    const url = `https://maps.google.com/?q=${latitude},${longitude}`;
    window.open(url, '_blank');
  };

  // Funktion för att visa rutt från ursprung till destination
  const showRoute = (origin: string | null, destination: string | null, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation(); // Förhindra att package card klickas
    }

    if (!origin || !destination) {
      alert('Ursprung eller destination saknas för detta paket');
      return;
    }

    const url = `https://maps.google.com/maps/dir/${encodeURIComponent(origin)}/${encodeURIComponent(destination)}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await packageService.getAllPackages();
        setPackages(response.packages);
      } catch (err: unknown) {
        console.error("Error fetching packages:", err);
        setError("Kunde inte ladda paket från servern. Backend server returnerar 500-fel.");
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
          <PrimaryButton
            text="Försök igen"
            onClick={() => window.location.reload()}
          />
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

      {/* Filtersektion */}
      <div className='p-7 mb-6 bg-white border border-gray-200 rounded-lg mx-4 shadow-sm'>
        <div className="flex items-center gap-2 mb-3">
          <FaSearch className="text-primary" />
          <h2 className='text-lg font-semibold text-text-dark'>Filtrera paket</h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-3'>
          <Input
            id="search-package-id"
            name="search-package-id"
            label="Paket ID"
            value={searchPackageId}
            onChange={(e) => setSearchPackageId(e.target.value)}
            placeholder="Sök efter paket ID..."
            className="w-full"
          />

          <Input
            id="search-destination"
            name="search-destination"
            label="Destination"
            value={searchDestination}
            onChange={(e) => setSearchDestination(e.target.value)}
            placeholder="Sök efter destination..."
            className="w-full"
          />
        </div>

        {/* Snabbstatusfilter */}
        <div className="mb-3">
          <label className="text-text-dark font-medium mb-2 block">Status</label>
          <div className="flex flex-wrap gap-2">
            {quickFilters.map((filter) => (
              <button
                key={filter.status}
                onClick={() => setSelectedStatus(filter.status)}
                className={`px-3 py-1 text-sm rounded-full border transition-colors ${selectedStatus === filter.status
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Visar {filteredPackages.length} av {packages.length} paket
          </p>

          {(searchPackageId || searchDestination || selectedStatus) && (
            <PrimaryButton
              text="Rensa filter"
              icon={<FaTimes size={12} />}
              onClick={clearFilters}
            />
          )}
        </div>
        <div className='p-4 space-y-6'>
          {filteredPackages.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200 mx-4">
              <FaSearch className="mx-auto text-gray-400 text-4xl mb-4" />
              <p className="text-gray-600 text-lg mb-2">
                {packages.length === 0
                  ? "Inga paket hittades"
                  : "Inga paket matchar dina filter"
                }
              </p>
              {filteredPackages.length === 0 && packages.length > 0 && (
                <div>
                  <p className="text-gray-500 text-sm mb-4">
                    Prova att justera dina sökkriterier eller rensa filtren
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-2 bg-primary hover:brightness-150 text-text-light rounded-2xl"
                  >
                    Visa alla paket
                  </button>
                </div>
              )}
            </div>
          ) : (
            filteredPackages.map((pkg) => (
              <div key={pkg.PackageID} className="space-y-4">

                <Card
                  variant='package'
                  paketId={pkg.PackageID.toString()}
                  destination={pkg.Destination || 'Okänd'}
                  vikt={`${pkg.PackageWeight}kg`}
                  status={pkg.Status || 'Väntande'}
                  onClick={() => navigate(`/package-details-driver/${pkg.PackageID}`)}
                />

                {/* Rutt-knapp */}
                <div className="flex justify-center">
                  <PrimaryButton
                    text="STARTA VÄGEN"
                    onClick={(e) => showRoute(pkg.Origin, pkg.Destination, e)}
                  />
                </div>

                {/* Transportinformation och Personinformation - kommenterat */}
                {/*
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
                */}

                {pkg.GPSLatitude && pkg.GPSLongitude && (
                  <div className="bg-white border border-gray-200 rounded p-4 shadow-sm">
                    <h4 className="font-bold text-text-dark mb-3">GPS-position</h4>
                    <div className="space-y-2 text-s text-text-dark">
                      <p><strong>Latitud:</strong> {pkg.GPSLatitude.toFixed(6)}</p>
                      <p><strong>Longitud:</strong> {pkg.GPSLongitude.toFixed(6)}</p>
                      <div className="mt-3">
                        <PrimaryButton
                          text="Visa på Google Maps"
                          onClick={(e) => openGoogleMaps(pkg.GPSLatitude!, pkg.GPSLongitude!, e)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <hr className="border-secondary-200 my-8" />
              </div>
            )))}
        </div>
      </div>
    </div>
  );
};

export default PackageList;