import InfoCard from "../components/Driver/InfoCard"
import Dashboard from "../components/Driver/Dashboard"
import MapComponent from "../components/Driver/MapComponent"
import { useNavigate, useParams } from "react-router-dom"
import { PrimaryButton } from "../components/PrimaryButton"
import BackArrow from "../components/BackArrow"
import { FaCamera } from "react-icons/fa"
import { useState, useEffect } from "react"
import { packageService } from "../api/packageService"
import type { Package } from "../types/package"


const PackageDetailsDriver = () => {
     const navigate = useNavigate()
     const { paketId } = useParams<{ paketId: string }>()
     const [packageData, setPackageData] = useState<Package | null>(null)
     const [loading, setLoading] = useState(true)
     const [error, setError] = useState<string | null>(null)

     // Funktion för att öppna Google Maps med GPS-koordinater
     const openGoogleMaps = () => {
          if (packageData?.GPSLatitude && packageData?.GPSLongitude) {
               const url = `https://maps.google.com/?q=${packageData.GPSLatitude},${packageData.GPSLongitude}`
               window.open(url, '_blank')
          } else {
               alert('GPS-koordinater inte tillgängliga för detta paket')
          }
     }

     // Hämta paketdata när komponenten laddas
     useEffect(() => {
          const fetchPackageData = async () => {
               if (!paketId) {
                    setError("Paket ID saknas")
                    setLoading(false)
                    return
               }

               try {
                    const response = await packageService.getPackageById(parseInt(paketId))
                    setPackageData(response.package)
               } catch (err: unknown) {
                    console.error("Fel vid hämtning av paket:", err)
                    const error = err as { response?: { status: number }; code?: string; message?: string }
                    if (error.response?.status === 404) {
                         setError(`Paket med ID ${paketId} hittades inte`)
                    } else if (error.response?.status && error.response.status >= 500) {
                         setError("Serverfel - försök igen senare")
                    } else if (error.code === 'NETWORK_ERROR') {
                         setError("Nätverksfel - kontrollera din anslutning")
                    } else {
                         setError(`Kunde inte ladda paketdata: ${error.message || 'Okänt fel'}`)
                    }
               } finally {
                    setLoading(false)
               }
          }

          fetchPackageData()
     }, [paketId])

     // Visa laddningsmeddelande
     if (loading) {
          return (
               <div className="min-h-screen bg-background flex items-center justify-center">
                    <div className="text-center">
                         <div className="text-xl font-semibold text-dark">Laddar paketdetaljer...</div>
                    </div>
               </div>
          )
     }

     // Visa felmeddelande
     if (error || !packageData) {
          return (
               <div className="min-h-screen bg-background flex items-center justify-center">
                    <div className="text-center">
                         <div className="text-xl font-semibold text-red-600">{error || "Paket hittades inte"}</div>
                         <button
                              onClick={() => navigate(-1)}
                              className="mt-4 px-4 py-2 bg-secondary text-dark rounded-lg"
                         >
                              Gå tillbaka
                         </button>
                    </div>
               </div>
          )
     }

     // Visa paketdetaljer
     return (
          <div className="min-h-screen bg-background">
               <div className="flex items-center p-4 bg-secondary">
                    <BackArrow />
                    <h1 className="text-4xl font-bold flex-1 text-center text-dark">Paketdetaljer</h1>
                    <div className='w-8'></div>
               </div>

               <div className="p-4 space-y-6 pb-20">
                    <InfoCard
                         title="Paketinformation"
                         items={[
                              { label: 'Paket ID:', value: packageData.PackageID.toString() },
                              { label: 'Status:', value: packageData.Status || 'Okänd' },
                              { label: 'Vikt:', value: `${packageData.PackageWeight} kg` },
                              { label: 'Bredd:', value: `${packageData.PackageWidth} cm` },
                              { label: 'Höjd:', value: `${packageData.PackageHeight} cm` },
                              { label: 'Djup:', value: `${packageData.PackageDepth} cm` }
                         ]}
                    />

                    <InfoCard
                         title="Transport"
                         items={[
                              { label: 'Start/Origin:', value: packageData.Origin || 'Ej angivet' },
                              { label: 'Destination:', value: packageData.Destination || 'Ej angivet' }
                         ]}
                    />

                    <InfoCard
                         title="Personer"
                         items={[
                              { label: 'Förare:', value: packageData.DriverName },
                              { label: 'Avsändare:', value: packageData.SenderName },
                              { label: 'Mottagare:', value: packageData.ReceiverName }
                         ]}
                    />

                    <div className="grid grid-cols-1 gap-4">
                         <Dashboard label="Temperatur" value={22} unit="°C" trend="up" onClick={() => navigate('/driver-list')} />
                         <Dashboard label="Luftfuktighet" value={60} unit="%" trend="down" onClick={() => navigate('/driver-list')} />
                         <Dashboard label="Batterinivå" value={65} unit="%" trend="warning" onClick={() => navigate('/driver-list')} />
                    </div>

                    <MapComponent />

                    {packageData.GPSLatitude && packageData.GPSLongitude && (
                         <div className="bg-white border border-gray-200 rounded p-4 shadow-sm">
                              <h4 className="font-bold text-text-dark mb-3">GPS Position</h4>
                              <div className="space-y-2 text-s text-text-dark mb-3">
                                   <p><strong>Latitud:</strong> {packageData.GPSLatitude.toFixed(6)}</p>
                                   <p><strong>Longitud:</strong> {packageData.GPSLongitude.toFixed(6)}</p>
                              </div>
                              <PrimaryButton
                                   text="Visa på Google Maps"
                                   onClick={openGoogleMaps}
                              />
                         </div>
                    )}

                    <div className="flex flex-col sm:flex-row justify-center items-center mt-6 gap-3 px-4">
                         <PrimaryButton
                              icon={<FaCamera />}
                              text="Ta en bild"
                              onClick={() => navigate('/photo')}
                         />

                         <PrimaryButton
                              text="Visa rutt"
                              onClick={openGoogleMaps}
                         />

                         <PrimaryButton
                              text="Bekräfta leverans"
                              onClick={() => navigate(`/confirmation-delivery/${paketId}`)}
                         />
                    </div>

                    <div className="bg-secondary rounded-lg p-4 cursor-pointer transition-all" onClick={() => navigate('/package-list')}>
                         <p className="text-center text-lg font-semibold text-dark">Packet List</p>
                    </div>
               </div>
          </div>
     )
}

export default PackageDetailsDriver