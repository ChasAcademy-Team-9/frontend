import { useState } from 'react';
import { PrimaryButton } from '../PrimaryButton';
import MapComponent from './MapComponent';

const NavigationCard = () => {
  const [openGoogleMaps, setOpenGoogleMaps] = useState<(() => void) | null>(null);

  const handleRouteLoaded = (openMapsFn: () => void) => {
    setOpenGoogleMaps(() => openMapsFn);
  };

  return (
    <div className="bg-secondary/80 rounded-2xl p-4">
      <h3 className="font-semibold text-text-dark mb-4">Navigation</h3>
      
      <div className="flex gap-2 justify-center mb-4 scale-125 p-4">
        <PrimaryButton
          text="Visa Rutt"
          onClick={() => {
            if (openGoogleMaps) {
              openGoogleMaps();
            } else {
              alert('Rutten laddas fortfarande...');
            }
          }}
        />
        
        <PrimaryButton
          text="Lista med packet"
          onClick={() => alert('Listan!')}
        />
      </div>

      <MapComponent onRouteLoaded={handleRouteLoaded} />
    </div>
  );
};

export default NavigationCard;