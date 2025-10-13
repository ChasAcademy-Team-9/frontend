import { PrimaryButton } from '../PrimaryButton';
import MapComponent from './MapComponent';

const NavigationCard = () => {
  return (
    <div className="bg-secondary/80 rounded-2xl p-4">
      <h3 className="font-semibold text-text-dark mb-4">Navigation</h3>
      
      <div className="flex gap-2 justify-center mb-4 p-4">
        <PrimaryButton
          text="Visa Rutt"
          onClick={() => alert('Rutt!')}
        />
        
        <PrimaryButton
          text="Lista med packet"
          onClick={() => alert('Listan!')}
        />
      </div>

      <MapComponent />
    </div>
  );
};

export default NavigationCard;