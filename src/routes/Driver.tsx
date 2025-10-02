import InfoCard from "../components/Driver/InfoCard"
import { PrimaryButton } from "../components/PrimaryButton";


const Driver = () => {
  return (
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
    </div>
  );
};

export default Driver;