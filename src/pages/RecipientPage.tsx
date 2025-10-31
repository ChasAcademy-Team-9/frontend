import PackageItem from "../pages/PackageItem";
import { useState, useEffect } from "react";
import { packageService } from "../api/packageService";
import type { Package } from "../types/package";
import HeaderNavigation from "../components/HeaderNavigation";

export default function RecipientPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await packageService.getAllPackages();
        console.log(response);

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
      <main className="min-h-screen bg-background px-6 py-8">
        <div className="max-w-4xl mx-auto text-white text-center">
          <div className="text-xl font-semibold">Loading packages...</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background px-6 py-8">
        <div className="max-w-4xl mx-auto text-white text-center">
          <div className="text-xl font-semibold text-red-600">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-secondary text-dark rounded-lg"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <>
      <HeaderNavigation />
      <main className="min-h-screen bg-background px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="bg-secondary rounded-lg shadow-md p-6 space-y-2">
            <h1 className="text-3xl font-bold text-primary text-center">
              Välkommen
            </h1>
            <p className="text-md text-white text-center font-inter">
              Du har {packages.length} leveranser
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-4">
              {packages.map((pkg) => (
                <PackageItem
                  key={pkg.PackageID}
                  paketId={pkg.PackageID.toString()}
                  destination={pkg.Destination || "Unknown"}
                  status={pkg.Status || "Unknown"}
                  showReceipt={
                    pkg.Status === "Delivered" || pkg.Status === "Levererad"
                  }
                  driverName={pkg.DriverName}
                  senderName={pkg.SenderName}
                  receiverName={pkg.ReceiverName}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
