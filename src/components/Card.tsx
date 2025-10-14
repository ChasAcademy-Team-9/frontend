import React from 'react';
import { Link } from 'react-router-dom';

// Olika varianter av vår Card-komponent
type CardVariant = 'package' | 'transport' | 'status' | 'confirmation' | 'error';

// Typ för transportinfo
type TransportInfo = {
  stad?: string;
  tid?: string;
  adress?: string;
};

// Props som vår Card-komponent tar emot
type CardProps = {
  variant: CardVariant;
  paketId?: string;
  destination?: string;
  vikt?: string;
  fordonId?: string;
  status?: string;
  info?: TransportInfo;
  onClick?: () => void;
};

const getVariantStyle = (variant: CardVariant, status?: string) => {
  const baseClasses = 'card p-4 rounded shadow-md cursor-pointer';

  const getStatusBasedColor = (status?: string) => {
    if (status) {
      switch (status.toLowerCase()) {
        case 'kritisk':
          return `${baseClasses} bg-error text-text-light`;
        case 'varning':
          return `${baseClasses} bg-warning text-dark`;
        case 'ok':
          return `${baseClasses} bg-success text-text-light`;
        default:
          return `${baseClasses} bg-primary text-text-light`;
      }
    }
    return 'bg-secondary';
  };

  switch (variant) {
    case 'confirmation':
      return 'bg-success';
    case 'status':
      return getStatusBasedColor(status);
    case 'package':
      return getStatusBasedColor(status);
    case 'transport':
      return 'bg-secondary';
    case 'error':
      return 'bg-error';
    default:
      return 'bg-background';
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
  const cardClasses = getVariantStyle(variant, status);
  const isFullClassName = cardClasses.includes('card p-4');

  return (
    <div
      className={isFullClassName ? cardClasses : `card p-4 rounded shadow-md ${cardClasses} cursor-pointer`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
      role='button'
      tabIndex={0}
    >
      {variant === 'package' && (
        <>
          <h3 className='text-lg font-bold mb-2'>Paketinformation</h3>
          <p>
            <strong>Paket-ID:</strong> {paketId}
          </p>
          <p>
            <strong>Destination:</strong> {destination}
          </p>
          <p>
            <strong>Vikt:</strong> {vikt}
          </p>
        </>
      )}

      {variant === 'transport' && (
        <>
          <h3 className='text-lg font-bold mb-2'>Transportinformation</h3>
          <p>
            <strong>Fordon-ID:</strong> {fordonId}
          </p>
          {info && (
            <p>
              <strong>Plats:</strong> {info.stad}, {info.tid}, {info.adress}
            </p>
          )}
        </>
      )}

      {variant === 'status' && (
        <>
          <h3 className='text-lg font-bold mb-2'>Status</h3>
          <p>
            <strong>Nuvarande status:</strong> {status}
          </p>
        </>
      )}

      {variant === 'confirmation' && (
        <>
          <h3 className='text-lg font-bold mb-2'>Bekräftelse</h3>
          <p>Lyckad skanning!</p>
          <Link
            to='/start-transport'
            className='mt-2 inline-block bg-white text-primary px-4 py-2 rounded hover:bg-gray-100 transition'
          >
            Starta transport
          </Link>
        </>
      )}
    </div>
  );
};

export default Card;
