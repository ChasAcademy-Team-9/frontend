// import React from 'react';
// import { Link } from 'react-router-dom';

// // Olika varianter av vår Card-komponent
// type CardVariant = 'package' | 'transport' | 'status' | 'confirmation';

// // Typ för transportinfo
// type TransportInfo = {
//   stad?: string;
//   tid?: string;
//   adress?: string;
// };

// // Props som vår Card-komponent tar emot
// type CardProps = {
//   variant: CardVariant;
//   paketId?: string;
//   destination?: string;
//   vikt?: string;
//   fordonId?: string;
//   status?: string;
//   info?: TransportInfo;
//   onClick?: () => void;
// };

// // Variantbaserad bakgrundsfärg
// const getVariantStyle = (variant: CardVariant) => {
//   switch (variant) {
//     case 'confirmation':
//       return 'bg-success';
//     case 'status':
//       return 'bg-warning';
//     case 'transport':
//       return 'bg-secondary';
//   default:
//     return 'bg-white';
//   }
// };

// const getCardClasses = (status?: string) => {
//   const baseClasses = "p-4 rounded-lg cursor-pointer transition-all duration-300";

//   if (!status) return `${baseClasses} text-text-dark`;

//   switch (status.toLowerCase()) {
//     case 'kritisk':
//       return `${baseClasses} bg-error text-text-light`;
//     case 'rapportera':
//       return `${baseClasses} bg-warning text-text-dark`;
//     case 'varning':
//       return `${baseClasses} bg-warning text-text-dark`;
//     case 'ok':
//       return `${baseClasses} bg-success text-text-light`;
//     case 'kärnd':
//       return `${baseClasses} bg-success text-text-light`;
//     default:
//       return `${baseClasses} bg-secondary/80 text-text-dark`;
//   }
// };

// // Vår Card-komponent
// const Card: React.FC<CardProps> = ({
//   variant,
//   paketId,
//   destination,
//   vikt,
//   fordonId,
//   status,
//   info,
//   className,
//   onClick,
// }) => {
//   return (
//     <div
//       className={`card p-4 rounded shadow-md ${getVariantStyle(variant)} cursor-pointer`}
//       onClick={onClick}
//       onKeyDown={(e) => {
//         if (e.key === 'Enter' || e.key === ' ') {
//           onClick?.();
//         }
//       }}
//       role="button"
//       tabIndex={0}
//     >

//   // Beroende på variant, så ska det rendera olika innehåll.
//   // I detta fall paket, transport, bekräftelse eller status...
//   // Dessa är alltså våra huvudbehållare för kort informationen.
//   const hasNestedInteractiveElements = variant === 'confirmation';

//   return (
//     <div
//       className={`${getCardClasses(status)} ${className || ''}`}
//       {...(!hasNestedInteractiveElements && onClick ? {
//         onClick,
//         role: "button",
//         tabIndex: 0
//       } : {})}
//     >

//       {variant === 'package' && (
//         <>
//           <h3 className="text-lg font-bold mb-2">Paketinformation</h3>
//           <p><strong>Paket-ID:</strong> {paketId}</p>
//           <p><strong>Destination:</strong> {destination}</p>
//           <p><strong>Vikt:</strong> {vikt}</p>
//         </>
//       )}

//       {variant === 'transport' && (
//         <>
//           <h3 className="text-lg font-bold mb-2">Transportinformation</h3>
//           <p><strong>Fordon-ID:</strong> {fordonId}</p>
//           {info && (
//             <p>
//               <strong>Plats:</strong> {info.stad}, {info.tid}, {info.adress}
//             </p>
//           )}
//         </>
//       )}

//       {variant === 'status' && (
//         <>
//           <h3 className="text-lg font-bold mb-2">Status</h3>
//           <p><strong>Nuvarande status:</strong> {status}</p>
//         </>
//       )}

//       {variant === 'confirmation' && (
//         <>
//           <h3 className="text-lg font-bold mb-2">Bekräftelse</h3>
//           <p>Lyckad skanning!</p>
//           <Link
//             to="/start-transport"
//             className="mt-2 inline-block bg-white text-primary px-4 py-2 rounded hover:bg-gray-100 transition"
//           >
//             Starta transport
//           </Link>
//           <div onClick={(e) => e.stopPropagation()}>
//             <button>Starta transport</button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Card;

import React from "react";
import { Link } from "react-router-dom";

// Olika varianter av vår Card-komponent
type CardVariant =
  | "package"
  | "transport"
  | "status"
  | "confirmation"
  | "error";

type TransportInfo = {
  stad?: string;
  tid?: string;
  adress?: string;
};

type CardProps = {
  variant: CardVariant;
  paketId?: string;
  destination?: string;
  vikt?: string;
  fordonId?: string;
  status?: string;
  info?: TransportInfo;
  className?: string;
  onClick?: () => void;
};

const getVariantStyle = (variant: CardVariant, status?: string) => {
  const baseClasses = "card p-4 rounded shadow-md cursor-pointer";

  const getStatusBasedColor = (status?: string) => {
    if (status) {
      switch (status.toLowerCase()) {
        case "kritisk":
          return `${baseClasses} bg-error text-text-light`;
        case "varning":
          return `${baseClasses} bg-warning text-dark`;
        case "ok":
          return `${baseClasses} bg-success text-text-light`;
        default:
          return `${baseClasses} bg-primary text-text-light`;
      }
    }
    return "bg-secondary";
  };

  switch (variant) {
    case "confirmation":
      return "bg-success";
    case "status":
      return getStatusBasedColor(status);
    case "package":
      return getStatusBasedColor(status);
    case "transport":
      return "bg-secondary";
    case "error":
      return "bg-error";
    default:
      return "bg-background";
  }
};

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
  const isFullClassName = cardClasses.includes("card p-4");

  return (
    <div
      className={
        isFullClassName
          ? cardClasses
          : `card p-4 rounded shadow-md ${cardClasses} cursor-pointer`
      }
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick?.();
        }
      }}
      role="button"
      tabIndex={0}
    >
      {variant === "package" && (
        <>
          <h3 className="text-lg font-bold mb-2">Paketinformation</h3>
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

      {variant === "transport" && (
        <>
          <h3 className="text-lg font-bold mb-2">Transportinformation</h3>
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

      {variant === "status" && (
        <>
          <h3 className="text-lg font-bold mb-2">Status</h3>
          <p>
            <strong>Nuvarande status:</strong> {status}
          </p>
        </>
      )}

      {variant === "confirmation" && (
        <>
          <h3 className="text-lg font-bold mb-2">Bekräftelse</h3>
          <p>Lyckad skanning!</p>
          <Link
            to="/start-transport"
            className="mt-2 inline-block bg-white text-primary px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            Starta transport
          </Link>
        </>
      )}
    </div>
  );
};

export default Card;
