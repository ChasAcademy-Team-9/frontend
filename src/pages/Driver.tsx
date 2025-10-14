import Dashboard from "../components/Driver/Dashboard";
import InfoCard from "../components/Driver/InfoCard";
import NavigationCard from "../components/Driver/NavigationCard";
import { PrimaryButton } from "../components/PrimaryButton";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";

const Driver = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-dark mb-6 bg-secondary/80 p-5">
        Förar Dashboard
      </h1>

      <div className="min-h-screen bg-background p-4 space-y-6 pb-20">
        <InfoCard
          title="Information"
          items={[
            { label: 'Tid:', value: '14:30' },
            { label: 'Distans:', value: '40 km' },
            { label: 'Hastighet:', value: '60 km/h' }
          ]}
        />

        <div className="flex justify-center">
            <PrimaryButton
              text="Skanna för att lägga till"
              onClick={() => navigate('/scanning')} 
            />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Dashboard label="Temperatur" value={22} unit="°C" trend="up" />
          <Dashboard label="Luftfuktighet" value={60} unit="%" trend="down" />
          <Dashboard label="Batterinivå" value={65} unit="%" trend="warning" />
        </div>

        <NavigationCard 
          firstButtonText="Visa rutt"
          secondButtonText="Lista paket"
          onFirstButtonClick={() => alert('Visar rutt!')}
          onSecondButtonClick={() => navigate('/package-list')}
        />
      </div>

      <BottomNav />
    </div>
  );
};

export default Driver;