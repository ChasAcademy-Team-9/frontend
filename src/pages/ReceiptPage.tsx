import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BackArrow from "../components/BackArrow";

export default function ReceiptPage() {
  const { paketId } = useParams<{ paketId?: string }>();

  interface PackageData {
    paketId: string;
    destination?: string;
    status?: string;
    date?: string;
    [key: string]: string | undefined;
  }

  const [packageData, setPackageData] = useState<PackageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPackage = async () => {
    try {
      const response = await fetch(`https://team9-webapp-b9f4e2g8hhfjeras.swedencentral-01.azurewebsites.net/api/packages/${paketId}`);
      if (!response.ok) {
        throw new Error("Något gick fel vid hämtning av data");
      }
      const data = await response.json();
console.log("API-data:", data);
      // Om API:t returnerar en lista av paket, filtrera efter paketId
      const paket = Array.isArray(data)
        ? data.find((p) => p.paketId === paketId)
        : data; // Om API:t bara returnerar ett objekt, då behöver du inte filtrera

      if (!paket) {
        throw new Error("Paketet hittades inte");
      }

      setPackageData(data.package);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Ett fel uppstod");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackage();
  }, [paketId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background px-6 py-8">
        <div className="max-w-md mx-auto text-white text-center">
          <BackArrow />
          <p className="mt-8 text-lg">Laddar kvitto...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background px-6 py-8">
        <div className="max-w-md mx-auto text-white text-center">
          <BackArrow />
          <p className="mt-8 text-lg">{error}</p>
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
            Ingen kvittoinformation hittades för <strong>{paketId}</strong>.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-8 pb-20">
      <div className="max-w-md mx-auto space-y-6">
        <BackArrow />

        <div className="bg-secondary rounded-lg shadow-md p-6 space-y-4">
          <h2 className="text-white font-bold text-xl text-center">Leveransbekräftelse</h2>

          <p className="text-white font-inter text-md">
            <strong>Paket-ID:</strong> {packageData.PackageID}
          </p>
          <p className="text-white font-inter text-md">
            <strong>Destination:</strong> {packageData.Destination}
          </p>
          <p className="text-white font-inter text-md">
            <strong>Status:</strong> {packageData.Status}
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
  );
}