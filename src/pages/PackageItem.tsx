import { Link } from "react-router-dom";

interface PackageItemProps {
  paketId: string;
  destination: string;
  status: string;
  showReceipt?: boolean;
}

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

export default function PackageItem({
  paketId,
  destination,
  status,
  showReceipt = false,
}: PackageItemProps) {
  return (
    <div className="bg-secondary rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-white font-inter">Paket-ID: {paketId}</span>
        <div className="flex items-center gap-2">
          <div
            className={`w-4 h-4 rounded-full ${getStatusColor(status)}`}
            title={status}
          />
          <span className="text-white font-inter">{status}</span>
        </div>
      </div>

      {/* Destination */}
      <p className="text-white font-inter">Destination: {destination}</p>

      {/* Knappar */}
      <div className="flex gap-4">
        <Link
          to={`/package/${paketId}`}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-80 transition"
        >
          Visa detaljer
        </Link>

        {showReceipt && (
          <Link
            to={`/receipt/${paketId}`}
            className="bg-white text-primary px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            Kvitto
          </Link>
        )}
      </div>
    </div>
  );
}
