import InfoCard from "../components/Driver/InfoCard"
import Dashboard from "../components/Driver/Dashboard"
import MapComponent from "../components/Driver/MapComponent"
import { useNavigate } from "react-router-dom"
import { PrimaryButton } from "../components/PrimaryButton"
import PackageList from "./PackageList"


const PackageDetailsDriver = () => {
     const navigate = useNavigate()

     return (
          <div className="min-h-screen bg-background p-4 space-y-6 pb-20">
               <InfoCard
                    title="Information"
                    items={[
                         { label: 'Tid:', value: '14:30' },
                         { label: 'Distans:', value: '40 km' },
                         { label: 'Hastighet:', value: '60 km/h' }
                    ]}
               />
               <div className="grid grid-cols-1 gap-4">
                    <Dashboard label="Temperatur" value={22} unit="°C" trend="up" onClick={() => navigate('/driver-list')} />
                    <Dashboard label="Luftfuktighet" value={60} unit="%" trend="down" onClick={() => navigate('/driver-list')} />
                    <Dashboard label="Batterinivå" value={65} unit="%" trend="warning" onClick={() => navigate('/driver-list')} />
               </div>

               <MapComponent
               />

               <div className="flex justify-center mt-4 gap-4">
                    <PrimaryButton
                         text="Bekräfta leverans"
                         onClick={() => navigate('/confirmation-delivery')}
                    />

                    <PrimaryButton
                         text="Ta en bild"
                         onClick={() => navigate('/photo')}
                    />
               </div>

               <div>
                    <PackageList />
               </div>
          </div>
     )
}

export default PackageDetailsDriver