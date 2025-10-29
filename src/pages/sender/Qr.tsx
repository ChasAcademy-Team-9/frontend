import { useNavigate, useParams } from "react-router-dom";

import { PrimaryButton } from "../../components/PrimaryButton";
import { FaHome, FaPrint } from "react-icons/fa";

import { QRCodeSVG } from "qrcode.react";

export default function Qr() {
  const { paket } = useParams<{ paket: string }>();
  const paketData = JSON.parse(paket || "{}");

  const navigate = useNavigate();

  const qrCodeData = JSON.stringify({
    paketId: paketData.PackageID,
    destination: paketData.Destination,
    origin: paketData.Origin,
  });

  return (
    <main className="flex flex-col  gap-8 p-8 max-w-2xl mx-auto">
      <h1>QR-kod skapad</h1>
      <p>Skriv ut qr-koden och fäst på paketet.</p>

      <div className="flex gap-4 border-2 p-4 text-left">
        <QRCodeSVG value={qrCodeData} />

        <table>
          <tbody>
            <tr>
              <th className="w-24">Paket-ID </th>
              <td>{paketData.PackageID}</td>
            </tr>
            <tr>
              <th>Till </th>
              <td>{paketData.Destination}</td>
            </tr>
            <tr>
              <th>Från </th>
              <td>{paketData.Origin}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <PrimaryButton
        text="Skriv ut"
        icon={<FaPrint size={20} />}
        onClick={() => window.print()}
      />
      <PrimaryButton
        text="Hem"
        icon={<FaHome size={20} />}
        onClick={() => navigate("/sender")}
      />
    </main>
  );
}
