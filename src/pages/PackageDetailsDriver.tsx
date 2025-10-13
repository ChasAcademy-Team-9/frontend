import InfoCard from "../components/Driver/InfoCard"
import Dashboard from "../components/Driver/Dashboard"
import NavigationCard from "../components/Driver/NavigationCard"
import { useNavigate } from "react-router-dom"

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
                    <Dashboard label="Temperatur" value={22} unit="°C" trend="up" />
                    <Dashboard label="Luftfuktighet" value={60} unit="%" trend="down" />
                    <Dashboard label="Batterinivå" value={65} unit="%" trend="warning" />
               </div>

               <NavigationCard
                    firstButtonText="Bekräfta leverans"
                    secondButtonText="Ta en bild"
                    onFirstButtonClick={() => navigate('/confirmation-delivery')}
                    onSecondButtonClick={() => navigate('/scanning')}
               />
          </div>
     )
}

export default PackageDetailsDriver