import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import BackArrow from "../components/BackArrow";
import { useState, useEffect } from "react";
import { packageService } from "../api/packageService";
import type { Package } from "../types/package";

interface Package {
  paketId: string;
  status: string;
  destination: string;
  avsändare?: string;
  showReceipt?: boolean;
}

function getStatusColor(status: string) {
  switch (status?.toLowerCase()) {
    case "levererad":
    case "delivered":
      return "bg-success";
    case "under transport":
    case "transit":
      return "bg-warning";
    case "försenad":
    case "delayed":
      return "bg-gray";
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
      <main className="min-h-screen bg-background px-6 py-8">
        <div className="max-w-md mx-auto text-white text-center">
          <div className="text-xl font-semibold">Loading package details...</div>
        </div>
      </main>
    );
  }

  // Om inget paket hittas, visa fallback
  if (error || !packageData) {
    return (
      <main className="min-h-screen bg-background px-6 py-8">
        <div className="max-w-md mx-auto text-white text-center">
          <BackArrow />
          <p className="mt-8 text-lg">
            {error || `Paketet med ID ${paketId} hittades inte.`}
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
              Paket-ID: {packageData.PackageID}
            </span>
            <div className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full ${getStatusColor(packageData.Status || 'Unknown')}`}
                title={packageData.Status || 'Unknown'}
              />
              <span className="text-white font-inter">{packageData.Status || 'Unknown'}</span>
            </div>
          </div>

          {/* Destination */}
          <p className="text-white font-inter text-md">
            Destination: <em>{packageData.Destination || 'Unknown'}</em>
          </p>

          {/* Origin */}
          {packageData.Origin && (
            <p className="text-white font-inter text-md">
              Origin: <em>{packageData.Origin}</em>
            </p>
          )}

          {/* Avsändare */}
          {packageData.SenderName && (
            <p className="text-white font-inter text-md">
              Avsändare: <em>{packageData.SenderName}</em>
            </p>
          )}

          {/* Mottagare */}
          {packageData.ReceiverName && (
            <p className="text-white font-inter text-md">
              Mottagare: <em>{packageData.ReceiverName}</em>
            </p>
          )}

          {/* Package dimensions */}
          <div className="text-white font-inter text-md">
            <p>Vikt: <em>{packageData.PackageWeight} kg</em></p>
            <p>Dimensioner: <em>{packageData.PackageWidth} x {packageData.PackageHeight} x {packageData.PackageDepth} cm</em></p>
          </div>

          {/* GPS Position if available */}
          {packageData.GPSLatitude && packageData.GPSLongitude && (
            <p className="text-white font-inter text-md">
              GPS Position: <em>{packageData.GPSLatitude}, {packageData.GPSLongitude}</em>
            </p>
          )}

          {/* Kvitto-knapp */}
          <div className="flex">
            <Link
              to={`/receipt/${packageData.PackageID}`}
              className="bg-white text-primary px-4 py-2 rounded hover:bg-gray-100 transition text-center block"
            >
              Kvitto
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}