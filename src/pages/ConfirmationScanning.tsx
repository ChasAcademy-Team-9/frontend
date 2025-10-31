// pages/ConfirmationScanning.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { packageService } from "../api/packageService";
import { PrimaryButton } from "../components/PrimaryButton";
import Card from "../components/Card";
import type { Package } from "../types/package";

const ConfirmationScanning = () => {
     const location = useLocation();
     const navigate = useNavigate();
     const { packageId } = location.state || {};
     const [packageData, setPackageData] = useState<Package | null>(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          if (packageId) {
               fetchPackage();
          }
     }, [packageId]);

     const fetchPackage = async () => {
          try {
               const response = await packageService.getPackageById(packageId);
               setPackageData(response.package);
          } catch (error) {
               console.error("Fel vid hämtning av paket:", error);
               alert("Kunde inte ladda paketinformation");
          } finally {
               setLoading(false);
          }
     };

     if (loading) {
          return (
               <div className="min-h-screen bg-background flex items-center justify-center">
                    <div className="text-xl font-semibold text-dark">Laddar...</div>
               </div>
          );
     }

     return (
          <div className="min-h-screen bg-background p-4">
               <div className="flex flex-col items-center justify-center mb-8 mt-12">
                    <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center mb-6 shadow-lg">
                         <svg 
                              className="w-18 h-18 text-white" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                         >
                              <path 
                                   strokeLinecap="round" 
                                   strokeLinejoin="round" 
                                   strokeWidth={3} 
                                   d="M5 13l4 4L19 7" 
                              />
                         </svg>
                    </div>

                    <h1 className="text-3xl font-bold text-dark mb-2">
                         Rapport Skickad
                    </h1>
                    <p className="text-gray-600 text-center">
                         Paketet har lagts till i din lista
                    </p>
               </div>

               {packageData && (
                    <div className="mb-6 p-4 bg-green-100 border-2 border-green-400 rounded-lg">
                         <Card
                              variant='package'
                              paketId={packageData.PackageID.toString()}
                              destination={packageData.Destination || 'Okänd'}
                              vikt={`${packageData.PackageWeight}kg`}
                              status={packageData.Status || 'Väntande'}
                              onClick={() => navigate(`/package-details-driver/${packageId}`)}
                         />
                    </div>
               )}

               <div className="mt-6 space-y-3">
                    <PrimaryButton
                         text="Visa paketdetaljer"
                         onClick={() => navigate(`/package-details-driver/${packageId}`)}
                         fullWidth
                    />
                    <PrimaryButton
                         text="Skanna fler paket"
                         onClick={() => navigate('/scanning')}
                         fullWidth
                    />
                    <PrimaryButton
                         text="Tillbaka till listan"
                         onClick={() => navigate('/package-list', {
                              state: { newPackageId: packageId }
                         })}
                         fullWidth
                    />
               </div>
          </div>
     );
};

export default ConfirmationScanning;