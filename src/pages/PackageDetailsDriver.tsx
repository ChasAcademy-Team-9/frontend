import InfoCard from "../components/Driver/InfoCard"
import Dashboard from "../components/Driver/Dashboard"
import MapComponent from "../components/Driver/MapComponent"
import { useNavigate, useParams } from "react-router-dom"
import { PrimaryButton } from "../components/PrimaryButton"
import BackArrow from "../components/BackArrow"
import { FaCamera, FaCheckCircle, FaMapMarkedAlt } from "react-icons/fa"
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
                    <div className="flex justify-center mb-2">
                         <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-secondary shadow font-bold text-dark text-base border border-gray-200">
                              <span className="uppercase tracking-wide">Status:</span>
                              <span className="capitalize">{packageData.Status || 'Okänd'}</span>
                         </div>
                    </div>

                    <InfoCard
                         title="Paketinformation"
                         items={[
                              { label: 'Paket ID:', value: packageData.PackageID.toString() },
                              { label: 'Vikt:', value: `${packageData.PackageWeight} kg` },
                              { label: 'Dimensioner:', value: `${packageData.PackageWidth} × ${packageData.PackageHeight} × ${packageData.PackageDepth} cm` }
                         ]}
                    />

                    <InfoCard
                         title="Transport"
                         items={[
                              { label: 'Start/Origin:', value: packageData.Origin || 'Ej angivet' },
                              { label: 'Destination:', value: packageData.Destination || 'Ej angivet' }
                         ]}
                    >
                         <div className="flex justify-center">
                              <PrimaryButton
                                   text="Visa rutt"
                                   onClick={openGoogleMaps}
                              />
                         </div>
                    </InfoCard>

                    <InfoCard
                         title="Kontaktinformation"
                         items={[
                              { label: 'Förare:', value: packageData.DriverName },
                              { label: 'Avsändare:', value: packageData.SenderName },
                              { label: 'Mottagare:', value: packageData.ReceiverName }
                         ]}
                    />

          
                    <div className="space-y-4">
                         <div className="bg-secondary rounded-lg p-4 flex flex-col gap-3 shadow-md">
                              <button
                                   className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-blue-600 text-white font-bold text-lg shadow hover:bg-blue-700 transition"
                                   onClick={() => navigate('/photo')}
                              >
                                   <FaCamera className="text-xl" /> Ta en bild
                              </button>

                              <button
                                   className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-green-600 text-white font-bold text-lg shadow hover:bg-green-700 transition"
                                   onClick={openGoogleMaps}
                              >
                                   <FaMapMarkedAlt className="text-xl" /> Visa rutt
                              </button>

                              {packageData.Status !== 'ok' && packageData.Status !== 'delivered' && (
                                   <button
                                        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-primary text-white font-bold text-lg shadow hover:bg-green-700 transition"
                                        onClick={() => navigate(`/confirmation-delivery/${paketId}`)}
                                   >
                                        <FaCheckCircle className="text-xl" /> Bekräfta leverans
                                   </button>
                              )}
                         </div>

                         <div className="bg-secondary rounded-lg p-5 shadow flex flex-col items-center">
                              <h4 className="font-bold text-dark mb-4 text-lg tracking-wide">Leveransstatus</h4>
                              <div className="flex items-center w-full max-w-md gap-3">
                                   <div className={`w-4 h-4 rounded-full border-2 ${packageData.Status === 'pending' ? 'bg-yellow-400 border-yellow-600' : 'bg-green-500 border-green-700'}`}></div>
                                   <span className="text-dark text-base font-medium">Hämtad</span>
                                   <div className="flex-1 h-2 bg-gray-300 rounded mx-2 relative overflow-hidden">
                                        <div className={`absolute left-0 top-0 h-2 rounded transition-all duration-300 ${packageData.Status === 'ok' || packageData.Status === 'delivered' ? 'bg-green-500 w-full' : 'bg-yellow-400 w-1/2'}`}></div>
                                   </div>
                                   <div className={`w-4 h-4 rounded-full border-2 ${packageData.Status === 'ok' || packageData.Status === 'delivered' ? 'bg-green-500 border-green-700' : 'bg-gray-200 border-gray-400'}`}></div>
                                   <span className="text-dark text-base font-medium">Levererad</span>
                              </div>
                         </div>
                    </div>

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



                    <div className="bg-secondary rounded-lg p-4 cursor-pointer transition-all hover:bg-opacity-80" onClick={() => navigate('/package-list')}>
                         <p className="text-center text-lg font-semibold text-dark">← Tillbaka till paketlista</p>
                    </div>
               </div>
          </div>
     )
}

export default PackageDetailsDriver