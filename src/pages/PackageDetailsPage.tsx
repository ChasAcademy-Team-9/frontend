import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import BackArrow from "../components/BackArrow";

interface Package {
  paketId: string;
  status: string;
  destination: string;
  avsändare?: string;
  showReceipt?: boolean;
}

function getStatusColor(status: string) {
  if (!status || typeof status !== 'string') {
    return "bg-gray-300"; 
    }
  switch (status.toLowerCase()) {
    case "levererad":
      return "bg-success";
    case "under transport":
      return "bg-warning";
    case "försenad":
      return "bg-danger";
    default:
      return "bg-secondary";
  }
}

export default function PackageDetailsPage() {
  const { paketId } = useParams();

  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://team9-webapp-b9f4e2g8hhfjeras.swedencentral-01.azurewebsites.net/api/packages/${paketId}`
        );
        if (!response.ok) {
          throw new Error("Något gick fel vid hämtning av paketet");
        }
        const data = await response.json();

        if (data.success && data.package) {
          setPackageData({
            paketId: data.package.PackageID.toString(),
            status: data.package.Status,
            destination: data.package.Destination,
            avsändare: data.package.SenderName,
            showReceipt: true,
          });
        } else {
          throw new Error("Paketet hittades inte");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ett oväntat fel inträffade');
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [paketId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background px-6 py-8">
        <div className="max-w-md mx-auto text-white text-center">
          <BackArrow />
          <p className="mt-8 text-lg">Laddar paketinformation...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background px-6 py-8">
        <div className="max-w-md mx-auto text-white text-center">
          <BackArrow />
          <p className="mt-8 text-lg">Fel: {error}</p>
        </div>
      </main>
    );
  }

  if (!packageData) {
    return (
      <main className="min-h-screen bg-background px-6 py-8">
        <div className="max-w-md mx-auto text-white text-center">
          <BackArrow />
          <p className="mt-8 text-lg">
            Paketet med ID <strong>{paketId}</strong> hittades inte.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Tillbaka-knapp */}
        <BackArrow />

        {/* Paketkort */}
        <div className="bg-secondary rounded-lg shadow-md p-6 space-y-6">
          {/* Paket-ID + Status */}
          <div className="flex items-center justify-between">
            <span className="text-white font-inter text-lg">
              Paket-ID: {packageData.paketId}
            </span>
            <div className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full ${getStatusColor(packageData.status)}`}
                title={packageData.status}
              />
              <span className="text-white font-inter">{packageData.status}</span>
            </div>
          </div>

          {/* Destination */}
          <p className="text-white font-inter text-md">
            Destination: <em>{packageData.destination}</em>
          </p>

          {/* Avsändare */}
          {packageData.avsändare && (
            <p className="text-white font-inter text-md">
              Avsändare: <em>{packageData.avsändare}</em>
            </p>
          )}

          {/* Kvitto-knapp */}
          {packageData.showReceipt && (
            <div className="flex">
              <Link
                to={`/receipt/${packageData.paketId}`}
                className="bg-white text-primary px-4 py-2 rounded hover:bg-gray-100 transition text-center block"
              >
                Kvitto
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}