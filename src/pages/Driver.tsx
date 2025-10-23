import Dashboard from "../components/Driver/Dashboard";
import InfoCard from "../components/Driver/InfoCard";
import NavigationCard from "../components/Driver/NavigationCard";
import { PrimaryButton } from "../components/PrimaryButton";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";

const Driver = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen">


      <div className="relative z-10 min-h-screen">
        <h1 className="text-3xl font-bold text-dark bg-secondary p-5">
          Förare Dashboard
        </h1>

        <div className="p-4 space-y-6 pb-20">
          <div className="bg-background bg-opacity-90 rounded-lg p-4">
            <InfoCard
              title="Information"
              items={[
                { label: 'Tid:', value: '14:30' },
                { label: 'Distans:', value: '40 km' },
                { label: 'Hastighet:', value: '60 km/h' }
              ]}
            />
          </div>

          <div className="flex justify-center">
            <PrimaryButton
              text="Skanna för att lägga till"
              onClick={() => navigate('/scanning')}
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Dashboard label="Temperatur" value={22} unit="°C" trend="up" onClick={() => navigate('/driver-list')} />
            <Dashboard label="Luftfuktighet" value={60} unit="%" trend="down" onClick={() => navigate('/driver-list')} />
          </div>

          <NavigationCard
            firstButtonText="Visa rutt"
            secondButtonText="Lista paket"
            onSecondButtonClick={() => navigate('/package-list')}
          />
        </div>
      </div>

      <div className="relative z-50">
        <BottomNav />
      </div>
    </div>
  );
};

export default Driver;