import { PrimaryButton } from '../PrimaryButton';
import MapComponent from './MapComponent';

interface NavigationCardProps {
  firstButtonText: string;
  secondButtonText: string;
  onFirstButtonClick?: () => void;
  onSecondButtonClick?: () => void;
}

const NavigationCard = ({ 
  firstButtonText, 
  secondButtonText,
  onFirstButtonClick = () => alert('First button clicked!'),
  onSecondButtonClick = () => alert('Second button clicked!')
}: NavigationCardProps) => {
  return (
    <div className="bg-secondary/80 rounded-2xl p-4">
      <h3 className="font-semibold text-lg text-dark mb-4">Navigation</h3>
      
      <div className="flex gap-2 justify-center mb-4 p-4">
        <PrimaryButton
          text={firstButtonText}
          onClick={onFirstButtonClick}
        />
        
        <PrimaryButton
          text={secondButtonText}
          onClick={onSecondButtonClick}
        />
      </div>

      <MapComponent />
    </div>
  );
};

export default NavigationCard;