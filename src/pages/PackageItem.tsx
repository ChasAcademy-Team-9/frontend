import { useState } from "react";
import { Link } from "react-router-dom";

interface PackageItemProps {
  paketId: string;
  destination: string;
  status?: string;
  showReceipt?: boolean;
  driverName?: string;  
  senderName?: string;
  receiverName?: string;
  width?: number;
  height?: number;
  weight?: number;
  depth?: number;
}

function getStatusColor(status?: string) {
  if (!status) return "bg-secondary";

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
  driverName,
  senderName,
  receiverName,
}: PackageItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-secondary rounded-lg shadow-md p-6 space-y-4 max-w-2xl mx-auto transition-all duration-300">
      {/* Paket ID och status */}
      <div className="flex items-center justify-between">
        <span className="text-white font-inter font-semibold">Paket-ID: {paketId}</span>
        <div className="flex items-center gap-2">
          <div
            className={`w-4 h-4 rounded-full ${getStatusColor(status)}`}
            title={status}
          />
          <span className="text-white font-inter">{status ?? "Okänt"}</span>
        </div>
      </div>

      {/* Destination */}
      <p className="text-white font-inter">Destination: {destination}</p>

      {/* Knappar */}
      <div className="flex gap-4">
        <button
          onClick={toggleExpand}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-80 transition"
        >
          {isExpanded ? "Dölj" : "Visa detaljer"}
        </button>
        {showReceipt && (
          <Link
            to={`/receipt/${paketId}`}
            className="bg-white text-primary px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            Kvitto
          </Link>
        )}
      </div>

      {/* Extra info som visas när expanderad */}
      {isExpanded && (
        <div className="mt-4 text-white font-inter space-y-2 border-t border-gray-300 pt-4">
          {driverName && <p>Driver: {driverName}</p>}
          {senderName && <p>Sender: {senderName}</p>}
          {receiverName && <p>Receiver: {receiverName}</p>}
        </div>
      )}
    </div>
  );
}