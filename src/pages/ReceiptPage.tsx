import { useParams } from "react-router-dom";
import BackArrow from "../components/BackArrow";

const allPackages = [
  { paketId: "12345", destination: "Stockholm", status: "Under transport", date: "2025-10-01" },
  { paketId: "67890", destination: "Göteborg", status: "Levererad", date: "2025-10-03" },
  { paketId: "54321", destination: "Malmö", status: "Försenad", date: "2025-10-02" },
];

export default function ReceiptPage() {
  const { paketId } = useParams();

  console.log("paketId från URL:", paketId); // 🔍 felsökning
  const packageData = allPackages.find(pkg => pkg.paketId === paketId);

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
            <strong>Paket-ID:</strong> {packageData.paketId}
          </p>
          <p className="text-white font-inter text-md">
            <strong>Destination:</strong> {packageData.destination}
          </p>
          <p className="text-white font-inter text-md">
            <strong>Status:</strong> {packageData.status}
          </p>
          <p className="text-white font-inter text-md">
            <strong>Leveransdatum:</strong> {packageData.date}
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