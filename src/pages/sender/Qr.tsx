// Skicka hit pakteid eller all data?
// skapa qr-kod
// skriv ut knapp
// tillbaka/hem knapp

import { useNavigate, useParams } from "react-router-dom";

import { PrimaryButton } from "../../components/PrimaryButton";
import { FaHome, FaPrint } from "react-icons/fa";

import { QRCodeSVG } from "qrcode.react";

export default function Qr() {
  const { paketId } = useParams<{ paketId: string }>();

  const navigate = useNavigate();

  const qrCodeData = JSON.stringify({
    paketId,
  });

  return (
    <main>
      <h1>Paket {paketId}</h1>

      <QRCodeSVG value="paketId" />

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
