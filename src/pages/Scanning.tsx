import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/PrimaryButton";
import { IoMdQrScanner } from "react-icons/io";
import BackArrow from "../components/BackArrow";
import QRScannerModal from "../components/Driver/QRScannerModal";
import { packageService } from "../api/packageService";

const Scanning = () => {
     const [showScanner, setShowScanner] = useState(true);
     const navigate = useNavigate();
     const [lastScanned, setLastScanned] = useState<string>("");
     const [isCreating, setIsCreating] = useState(false);

     const handleScanSuccess = async (decodedText: string) => {
          console.log("Skannad kod:", decodedText);
          setLastScanned(decodedText);
          setShowScanner(false);

          try {
               setIsCreating(true);
               const newPackage = await packageService.createPackageFromQR(decodedText);
               navigate('/confirmation-scanning', {
                    state: {
                         scannedCode: decodedText,
                         packageId: newPackage.PackageID
                    }
               });
          } catch (error) {
               console.error("Fel vid skapande av paket:", error);
               alert("Fel vid skapande av paket");
          } finally {
               setIsCreating(false);
          }
     };

     return (
          <div className="min-h-screen flex flex-col bg-background">
               <div className="relative p-5 bg-secondary text-text-dark">
                    <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                         <BackArrow />
                    </div>
                    <h1 className="text-2xl font-bold text-center">Förare Dashboard</h1>
               </div>

               <div className="flex-1 flex flex-col items-center justify-center px-5 pb-20">
                    {isCreating ? (
                         <div className="text-center">
                              <div className="text-xl font-semibold text-dark">
                                   Skapar paket...
                              </div>
                         </div>
                    ) : (
                         <>
                              <div className="mb-8">
                                   <div className="w-56 h-56 border-[3px] border-text-dark rounded-[2rem] flex items-center justify-center relative">
                                        <div className="absolute top-3 left-3 w-12 h-12 border-t-[3px] border-l-[3px] border-text-dark rounded-tl-xl"></div>
                                        <div className="absolute top-3 right-3 w-12 h-12 border-t-[3px] border-r-[3px] border-text-dark rounded-tr-xl"></div>
                                        <div className="absolute bottom-3 left-3 w-12 h-12 border-b-[3px] border-l-[3px] border-text-dark rounded-bl-xl"></div>
                                        <div className="absolute bottom-3 right-3 w-12 h-12 border-b-[3px] border-r-[3px] border-text-dark rounded-br-xl"></div>

                                        <div className="w-16 h-16 border-[3px] border-text-dark rounded-full"></div>
                                   </div>
                              </div>

                              <div className="text-center mb-10 max-w-xs">
                                   <h2 className="text-2xl font-semibold text-text-dark mb-3">
                                        Skanna QR-kod
                                   </h2>
                                   <p className="text-text-dark text-base">
                                        Rikta kameran mot paketets QR-kod
                                   </p>
                              </div>

                              {lastScanned && (
                                   <div className="mb-6 p-4 bg-green-100 border-2 border-green-400 rounded-lg w-full max-w-xs">
                                        <p className="font-semibold text-green-800 text-sm mb-1">
                                             Senast skannad:
                                        </p>
                                        <p className="text-green-900 break-all">{lastScanned}</p>
                                   </div>
                              )}

                              <div className="flex flex-col items-center w-full space-y-4">
                                   <PrimaryButton
                                        text="Skanna igen"
                                        icon={<IoMdQrScanner size={20} />}
                                        onClick={() => setShowScanner(true)}
                                   />
                              </div>
                         </>
                    )}
               </div>

               {showScanner && (
                    <QRScannerModal
                         onScanSuccess={handleScanSuccess}
                         onClose={() => {
                              setShowScanner(false);
                              navigate('/driver');
                         }}
                    />
               )}
          </div>
     );
};

export default Scanning;