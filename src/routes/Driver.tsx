import Dashboard from "../components/Driver/Dashboard";
import InfoCard from "../components/Driver/InfoCard"
import { PrimaryButton } from "../components/PrimaryButton";


const Driver = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-text-dark mb-6 bg-secondary/80 p-5">Förar Dashboard</h1>
      <div className="min-h-screen bg-background p-4">
        <InfoCard
          title="Information"
          items={[
            { label: 'Tid:', value: '14:30' },
            { label: 'Distans:', value: '40 km' },
            { label: 'Hastighet:', value: '60 km/h' }
          ]}
        />
        <div className="mt-8 flex justify-center">
          <div className="scale-125">
            <PrimaryButton
              text="Skanna för att lägga till"
              onClick={() => alert('Tillagd!')}
            />
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4">
          <Dashboard label="Temperatur" value={22} unit="°C" trend="up" />
          <Dashboard label="Luftfuktighet" value={60} unit="%" trend="down" />
          <Dashboard label="Batterinivå " value={65} unit="%" trend="warning" />
        </div>

        <div className="mt-8 flex justify-center">
          <div className="scale-125">
            <PrimaryButton
              text="Visa Rutt"
              onClick={() => alert('Rutt!')}
            />
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <div className="scale-125">
            <PrimaryButton
              text="Lista med packet"
              onClick={() => alert('Listan!')}
            />
          </div>
        </div>
      </div>
    </div>

  );
};

export default Driver;