import Card from "../components/Card"
import BackArrow from "../components/BackArrow"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { packageService } from '../api/packageService'
import type { Package } from '../types/package'

const DriverList = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sample status mapping - you can adjust this based on your needs
  const getRandomStatus = () => {
    const statuses = ['kritisk', 'ok', 'varning', 'rapportera', 'kärnd', 'pending'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await packageService.getAllPackages();
        setPackages(response.packages);
      } catch (err: unknown) {
        console.error("Error fetching packages:", err);
        setError("Failed to load packages");
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
          <div className="text-xl font-semibold text-dark">Loading packages...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold text-red-600">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-secondary text-dark rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center p-4 mb-4 bg-secondary text-dark">
        <div className="mr-4">
          <BackArrow />
        </div>
        <h1 className="text-2xl font-bold flex-1 text-center mr-10">Förarens paketlista</h1>
      </div>
      <div className="p-4 space-y-4">
        {packages.map((pkg) => (
          <Card
            key={pkg.PackageID}
            variant="package"
            paketId={pkg.PackageID.toString()}
            destination={pkg.Destination || 'Unknown'}
            vikt={`${pkg.PackageWeight}kg`}
            fordonId="AB123CD" // You can replace this with actual vehicle data if available
            status={getRandomStatus()} // You can map this to actual package status
            info={{
              stad: pkg.Origin || 'Unknown',
              tid: '12:00', // You can add time field to your API or remove this
              adress: 'Storgatan 1' // You can add address field to your API or remove this
            }}
            onClick={() => navigate(`/package-details-driver/${pkg.PackageID}`)}
          />
        ))}
      </div>
    </div>
  )
}

export default DriverList