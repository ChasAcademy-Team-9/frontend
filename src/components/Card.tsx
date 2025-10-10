import React from 'react';
import { Link } from 'react-router-dom';

// Olika varianter av vår Card-komponent
type CardVariant = 'package' | 'transport' | 'status' | 'confirmation';

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

// Variantbaserad bakgrundsfärg
const getVariantStyle = (variant: CardVariant) => {
  switch (variant) {
    case 'confirmation':
      return 'bg-success';
    case 'status':
      return 'bg-warning';
    case 'transport':
      return 'bg-secondary';
    default:
      return 'bg-secondary';
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
  return (
    <div
      className={`card p-4 rounded shadow-md ${getVariantStyle(
        variant
      )} cursor-pointer`}
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
