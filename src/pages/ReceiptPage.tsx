import { useParams } from "react-router-dom";
import BackArrow from "../components/BackArrow";
import { useState, useEffect } from "react";
import { packageService } from "../api/packageService";
import type { Package } from "../types/package";
import HeaderNavigation from "../components/HeaderNavigation";

export default function ReceiptPage() {
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
          <div className="text-xl font-semibold">Loading receipt...</div>
        </div>
      </main>
    );
  }

  if (error || !packageData) {
    return (
      <main className="min-h-screen bg-background px-6 py-8">
        <div className="max-w-md mx-auto text-white text-center">
          <BackArrow />
          <p className="mt-8 text-lg">
            {error || `Ingen kvittoinformation hittades för ${paketId}.`}
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      <HeaderNavigation />
      <main className="min-h-screen bg-background px-6 py-8 pb-20">
        <div className="max-w-md mx-auto space-y-6">
          <BackArrow />

          <div className="bg-secondary rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-white font-bold text-xl text-center">
              Leveransbekräftelse
            </h2>

            <p className="text-white font-inter text-md">
              <strong>Paket-ID:</strong> {packageData.PackageID}
            </p>
            <p className="text-white font-inter text-md">
              <strong>Destination:</strong>{" "}
              {packageData.Destination || "Unknown"}
            </p>
            <p className="text-white font-inter text-md">
              <strong>Status:</strong> {packageData.Status || "Unknown"}
            </p>
            <p className="text-white font-inter text-md">
              <strong>Origin:</strong> {packageData.Origin || "Unknown"}
            </p>
            <p className="text-white font-inter text-md">
              <strong>Vikt:</strong> {packageData.PackageWeight} kg
            </p>
            <p className="text-white font-inter text-md">
              <strong>Förare:</strong> {packageData.DriverName}
            </p>
            <p className="text-white font-inter text-md">
              <strong>Avsändare:</strong> {packageData.SenderName}
            </p>
            <p className="text-white font-inter text-md">
              <strong>Mottagare:</strong> {packageData.ReceiverName}
            </p>

            <div className="flex justify-center pt-4">
              <button
                className="bg-white text-primary px-4 py-2 rounded hover:bg-gray-100 transition"
                onClick={() => window.print()}
              >
                Skriv ut kvitto
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
