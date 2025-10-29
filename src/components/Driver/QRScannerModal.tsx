import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { PrimaryButton } from "../PrimaryButton";

interface QRScannerModalProps {
     onScanSuccess: (decodedText: string) => void;
     onClose: () => void;
}

const QRScannerModal = ({ onScanSuccess, onClose }: QRScannerModalProps) => {
     const [scannedResult, setScannedResult] = useState<string>("");
     const [error, setError] = useState<string>("");
     const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
     const hasScannedRef = useRef(false);

     useEffect(() => {
          startScanning();

          return () => {
               stopScanning();
          };
     }, []);

     const startScanning = async () => {
          try {
               const html5QrCode = new Html5Qrcode("qr-reader");
               html5QrCodeRef.current = html5QrCode;

               await html5QrCode.start(
                    { facingMode: "environment" },
                    {
                         fps: 10,
                         qrbox: { width: 250, height: 250 },
                    },
                    async (decodedText) => {
                         // Förhindra multiple scans
                         if (hasScannedRef.current) return;
                         hasScannedRef.current = true;

                         console.log("✅ Streckkod läst:", decodedText);
                         setScannedResult(decodedText);
                         
                         // Stoppa scannern FÖRST
                         await stopScanning();
                         
                         // Sedan kalla callbacks
                         onScanSuccess(decodedText);
                         onClose();
                    },
                    () => {
                         // Error callback - gör inget
                    }
               );
          } catch (err) {
               console.error("Error starting scanner:", err);
               setError("Kunde inte starta kameran. Kontrollera behörigheter.");
          }
     };

     const stopScanning = async () => {
          if (html5QrCodeRef.current) {
               try {
                    const isScanning = html5QrCodeRef.current.isScanning;
                    if (isScanning) {
                         await html5QrCodeRef.current.stop();
                    }
                    html5QrCodeRef.current.clear();
                    html5QrCodeRef.current = null;
               } catch (err) {
                    console.error("Error stopping scanner:", err);
               }
          }
     };

     return (
          <div className="fixed inset-0 bg-black z-50 flex flex-col">
               {/* Header */}
               <div className="relative p-4 bg-secondary text-text-dark flex flex-col items-center gap-4">
                    <h2 className="text-xl font-bold text-center">Skanna Streckkod</h2>
                    <PrimaryButton
                         text="Stäng"
                         icon={<IoMdClose size={20} />}
                         fullWidth={false}
                         onClick={async () => {
                              await stopScanning();
                              onClose();
                         }}
                    />
               </div>

               <div className="flex-1 flex flex-col items-center justify-center bg-black p-4">
                    {error && (
                         <div className="mb-4 p-4 bg-red-500 text-white rounded-lg">
                              {error}
                         </div>
                    )}

                    <div className="w-full max-w-md">
                         <div id="qr-reader" className="w-full" />
                    </div>

                    {scannedResult && (
                         <div className="mt-6 p-4 bg-green-500 text-white rounded-lg max-w-md w-full">
                              <p className="font-semibold mb-1">✅ Skannad!</p>
                              <p className="break-all text-sm">{scannedResult}</p>
                         </div>
                    )}

                    <div className="mt-6 text-white text-center max-w-xs">
                         <p>Rikta kameran mot streckkoden</p>
                    </div>

               </div>
          </div>
     );
};

export default QRScannerModal;