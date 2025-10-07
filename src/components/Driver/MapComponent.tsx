import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React-Leaflet
const DefaultIcon = L.icon({
     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
     iconSize: [25, 41],
     iconAnchor: [12, 41],
     popupAnchor: [1, -34],
     shadowSize: [41, 41]
});

// Fix for TypeScript - properly type the prototype
delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
     iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = () => {
     const center: [number, number] = [57.7089, 11.9746];

     const routePoints: [number, number][] = [
          [55.6051, 13.0038], // Malmö 
          [57.7089, 11.9746]  // Göteborg
     ];

     return (
          <div className="w-full h-64 rounded-2xl overflow-hidden">
               <MapContainer
                    center={center}
                    zoom={10}
                    style={{ height: '100%', width: '100%' }}
               >
                    <TileLayer
                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />

                    <Marker position={routePoints[0]}>
                         <Popup>Startpunkt</Popup>
                    </Marker>

                    <Marker position={routePoints[1]}>
                         <Popup>Slutpunkt</Popup>
                    </Marker>

                    <Polyline
                         positions={routePoints}
                         color="var(--color-success)"
                         weight={3}
                    />
               </MapContainer>
          </div>
     );
};

export default MapComponent;