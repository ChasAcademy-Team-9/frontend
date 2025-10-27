import { useEffect, useState } from "react";
import PackageItem from "../pages/PackageItem"; 

type Package = {
  paketId: string | number;
  destination: string;
  status: string;
  showReceipt?: boolean;
  driverName: string;
  senderName: string;
  receiverName: string; 
};

export default function RecipientPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const response = await fetch("https://team9testwebapp-h3b5c7gqgbeqhxgp.swedencentral-01.azurewebsites.net/api/packages");
        if (!response.ok) {
          throw new Error("Ett fel uppstod vid hämtning av paket");
        }
        const data = await response.json();

        if (data.success) {
          type ApiPackage = {
            PackageID: string | number;
            Destination: string;
            Status: string;
            DriverName: string;
            SenderName: string;
            ReceiverName: string;
          };

          const fetchedPackages: Package[] = data.packages.map((pkg: ApiPackage) => ({
            paketId: pkg.PackageID,
            destination: pkg.Destination,
            status: pkg.Status,
            showReceipt: true, 
            driverName: pkg.DriverName,
            senderName: pkg.SenderName,
            receiverName: pkg.ReceiverName,
          }));
          setPackages(fetchedPackages);
        } else {
          throw new Error("API svarade inte med success");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Okänt fel");
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, []);

  if (loading) {
    return <div>Laddar paket...</div>;
  }

  if (error) {
    return <div>Fel: {error}</div>;
  }

  return (
    <main className="min-h-screen bg-background px-6 py-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="bg-secondary rounded-lg shadow-md p-6 space-y-2">
          <h1 className="text-3xl font-bold text-primary text-center">Välkommen</h1>
          <p className="text-md text-white text-center font-inter">Du har {packages.length} leveranser</p>
        </div>

        {/* Paketlista med PackageItem komponenten */}
        <div className="space-y-4">
          {packages.map((item) => (
            <PackageItem
              key={item.paketId}
              paketId={String(item.paketId)}
              destination={item.destination}
              status={item.status}
              driverName={item.driverName}
              senderName={item.senderName}
              receiverName={item.receiverName}
              showReceipt={true} 
            />
          ))}
        </div>
      </div>
    </main>
  );
}