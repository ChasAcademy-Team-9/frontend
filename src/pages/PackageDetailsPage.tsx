import { useParams, Link } from "react-router-dom";
import BackArrow from "../components/BackArrow";

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "levererad":
      return "bg-success";
    case "under transport":
      return "bg-warning";
    case "försenad":
      return "bg-gray";
    default:
      return "bg-secondary";
  }
}

export default function PackageDetailsPage() {
  const { paketId } = useParams();

  const packages = [
    {
      paketId: "12345",
      destination: "Stockholm",
      status: "Under transport",
      leveransDatum: "2024-10-31",
      avsändare: "Chas Advance",
    },
    {
      paketId: "67890",
      destination: "Göteborg",
      status: "Levererad",
      showReceipt: true,
      leveransDatum: "2024-10-17",
      avsändare: "Tech Solutions",
    },
    {
      paketId: "54321",
      destination: "Malmö",
      status: "Försenad",
      leveransDatum: "2024-10-28",
      avsändare: "LogiCorp",
    },
  ];

  // Hitta rätt paket baserat på URL-parametern
  const packageData = packages.find((pkg) => pkg.paketId === paketId);

  // Om inget paket hittas, visa fallback
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
        {/* Våran tillbaka-knapp till föregående sida */}
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
              <span className="text-white font-inter">
                {packageData.status}
              </span>
            </div>
          </div>

          {/* Destination */}
          <p className="text-white font-inter text-md">
            Destination: <em>{packageData.destination}</em>
          </p>

          {/* Leveransdatum */}
          {packageData.leveransDatum && (
            <p className="text-white font-inter text-md">
              Beräknat leveransdatum: <em>{packageData.leveransDatum}</em>
            </p>
          )}

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
