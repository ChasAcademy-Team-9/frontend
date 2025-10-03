import React from 'react';

// Olika varianter av vår Card-komponent
type CardVariant = 'package' | 'transport' | 'status' | 'confirmation';

// Props som vår Card-komponent tar emot
type CardProps = {
  variant: CardVariant;
  paketId?: string;
  destination?: string;
  vikt?: string;
  fordonId?: string;
  status?: string;
  info?: {
    stad?: string;
    tid?: string;
    adress?: string;
  };
  onClick?: () => void;
};

const getCardClasses = (status?: string) => {
  const baseClasses = "p-4 rounded-lg cursor-pointer transition-all duration-300";

  if (!status) return `${baseClasses} text-text-dark`;

  switch (status.toLowerCase()) {
    case 'kritisk':
      return `${baseClasses} bg-error text-text-light`;
    case 'rapportera':
      return `${baseClasses} bg-warning text-text-dark`;
    case 'varning':
      return `${baseClasses} bg-warning text-text-dark`;
    case 'ok':
      return `${baseClasses} bg-success text-text-light`;
    case 'kärnd':
      return `${baseClasses} bg-success text-text-light`;
    default:
      return `${baseClasses} bg-secondary/80 text-text-dark`;
  }
};

// Vår Card-komponent
const Card: React.FC<CardProps> = ({
  variant,
  paketId,
  destination,
  vikt,
  fordonId,
  status,
  info,
  onClick,
}) => {


  // Beroende på variant, så ska det rendera olika innehåll. 
  // I detta fall paket, transport, bekräftelse eller status...
  // Dessa är alltså våra huvudbehållare för kort informationen.
  return (
    <div className={getCardClasses(status)} onClick={onClick} role="button" tabIndex={0}>

      {variant === 'package' && (
        <>
          <h3>Paketinformation</h3>
          <p><strong>Destination:</strong> {destination}</p>
          <p><strong>Vikt:</strong> {vikt}</p>
        </>
      )}

      {variant === 'transport' && (
        <>
          <h3>Transportinformation</h3>
          <p><strong>Fordon-ID:</strong> {fordonId}</p>
          {info && (
            <p><strong>Plats:</strong> {info.stad}, {info.tid}, {info.adress}</p>
          )}
        </>
      )}

      {variant === 'status' && (
        <>
          <h3>Status</h3>
          <p><strong>Nuvarande status:</strong> {status}</p>
        </>
      )}

      {variant === 'confirmation' && (
        <>
          <h3>Bekräftelse</h3>
          <p>Lyckad skanning!</p>
          <button>Starta transport</button>
        </>
      )}
    </div>
  );
};

export default Card;