import { useState } from 'react';
import { PrimaryButton } from '../PrimaryButton';
import MapComponent from './MapComponent';

interface NavigationCardProps {
  firstButtonText: string;
  secondButtonText: string;
  onSecondButtonClick: () => void;
}

const NavigationCard = ({ 
  firstButtonText, 
  secondButtonText, 
  onSecondButtonClick 
}: NavigationCardProps) => {
  const [openGoogleMaps, setOpenGoogleMaps] = useState<(() => void) | null>(null);

  const handleRouteLoaded = (openMapsFn: () => void) => {
    setOpenGoogleMaps(() => openMapsFn);
  };

  return (
    <div className="bg-secondary rounded p-4">
      <h3 className="font-bold text-lg text-dark mb-4">Navigation</h3>
      
      <div className="flex gap-2 justify-center mb-4 p-4">
        <PrimaryButton
          text={firstButtonText}
          onClick={() => {
            if (openGoogleMaps) {
              openGoogleMaps();
            } else {
              alert('Rutten laddas fortfarande...');
            }
          }}
        />
        
        <PrimaryButton
          text={secondButtonText}
          onClick={onSecondButtonClick}
        />
      </div>

      <MapComponent onRouteLoaded={handleRouteLoaded} />
    </div>
  );
};

export default NavigationCard;