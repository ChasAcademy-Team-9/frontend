import { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DefaultIcon = L.icon({
     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
     iconSize: [25, 41],
     iconAnchor: [12, 41],
     popupAnchor: [1, -34],
     shadowSize: [41, 41]
});

delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
     iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

L.Marker.prototype.options.icon = DefaultIcon;

interface RouteData {
     startPoint: {
          lat: number;
          lng: number;
          name?: string;
     };
     endPoint: {
          lat: number;
          lng: number;
          name?: string;
     };
}

interface RouteInfo {
     coordinates: [number, number][];
     distance: number;
     duration: number;
}

interface MapComponentProps {
     onRouteLoaded?: (openInGoogleMaps: () => void) => void;
}

const MapComponent = ({ onRouteLoaded }: MapComponentProps) => {
     const [routeData, setRouteData] = useState<RouteData | null>(null);
     const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState<string | null>(null);

     useEffect(() => {
          const loadData = async () => {
               try {
                    // Simulerar datahämtning med en timeout
                    // när API finns: ersätt denna del med fetch!!!
                    await new Promise(resolve => setTimeout(resolve, 500));

                    const mockData: RouteData = {
                         startPoint: { lat: 55.6051, lng: 13.0038, name: 'Malmö' },
                         endPoint: { lat: 57.7089, lng: 11.9746, name: 'Göteborg' }
                    };

                    setRouteData(mockData);
                    await calculateRoute(mockData);

               } catch (err) {
                    setError(err instanceof Error ? err.message : 'Okänt fel');
                    console.error('Fel:', err);
               } finally {
                    setLoading(false);
               }
          };

          loadData();
     }, []);

     const openInGoogleMaps = useCallback(() => {
          if (!routeData) return;

          const { startPoint, endPoint } = routeData;

          const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${startPoint.lat},${startPoint.lng}&destination=${endPoint.lat},${endPoint.lng}&travelmode=driving`;

          window.open(googleMapsUrl, '_blank');
     }, [routeData]);
     useEffect(() => {
          if (routeData && onRouteLoaded) {
               onRouteLoaded(openInGoogleMaps);
          }
     }, [routeData, onRouteLoaded, openInGoogleMaps]);


     const calculateRoute = async (data: RouteData) => {
          try {
               const { startPoint, endPoint } = data;
               /**
                * Hämtar ruttinformation från OSRM API för att beräkna vägen mellan två punkter.
                * Använder OSRM:s routing-tjänst för att få detaljerad geometri i GeoJSON-format.
                * 
                * @description Skickar en HTTP GET-förfrågan till OSRM Project för att få körriktningar
                * mellan start- och slutpunkt med full översikt och GeoJSON-geometrier
                */
               const response = await fetch(
                    `https://router.project-osrm.org/route/v1/driving/${startPoint.lng},${startPoint.lat};${endPoint.lng},${endPoint.lat}?overview=full&geometries=geojson`
               );

               const osrmData = await response.json();

               if (osrmData.routes && osrmData.routes[0]) {
                    const route = osrmData.routes[0];

                    const coordinates: [number, number][] = route.geometry.coordinates.map(
                         (coord: number[]) => [coord[1], coord[0]]
                    );

                    setRouteInfo({
                         coordinates,
                         distance: route.distance,
                         duration: route.duration
                    });
               }
          } catch (err) {
               console.error('Fel vid ruttberäkning:', err);
               setRouteInfo({
                    coordinates: [
                         [data.startPoint.lat, data.startPoint.lng],
                         [data.endPoint.lat, data.endPoint.lng]
                    ],
                    distance: 0,
                    duration: 0
               });
          }
     };

     if (loading) {
          return (
               <div className="w-full h-64 flex items-center justify-center bg-background rounded">
                    <p>Laddar karta...</p>
               </div>
          );
     }

     if (error || !routeData || !routeInfo) {
          return (
               <div className="w-full h-64 flex items-center justify-center bg-background rounded">
                    <p className="text-red-600">Fel: {error || 'Data inte tillgänglig'}</p>
               </div>
          );
     }

     const center: [number, number] = [
          (routeData.startPoint.lat + routeData.endPoint.lat) / 2,
          (routeData.startPoint.lng + routeData.endPoint.lng) / 2
     ];

     return (
          <div className="w-full space-y-2">
               {routeInfo.distance > 0 && (
                    <div className="mb-3 bg-background text-dark p-3 rounded shadow-sm text-sm">
                         <span className="font-semibold">Distans:</span> {(routeInfo.distance / 1000).toFixed(1)} km
                         <span className="mx-3">|</span>
                         <span className="font-semibold">Beräknad tid:</span> {Math.round(routeInfo.duration / 60)} min
                    </div>
               )}

               <div className="w-full h-70 rounded overflow-hidden shadow">
                    <MapContainer
                         center={center}
                         zoom={7}
                         style={{ height: '100%', width: '100%' }}
                    >
                         <TileLayer
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                         />

                         <Marker position={[routeData.startPoint.lat, routeData.startPoint.lng]}>
                              <Popup>
                                   <strong>Startpunkt</strong>
                                   <br />
                                   {routeData.startPoint.name}
                              </Popup>
                         </Marker>

                         <Marker position={[routeData.endPoint.lat, routeData.endPoint.lng]}>
                              <Popup>
                                   <strong>Slutpunkt</strong>
                                   <br />
                                   {routeData.endPoint.name}
                              </Popup>
                         </Marker>

                         <Polyline
                              positions={routeInfo.coordinates}
                              color="var(--color-success)"
                              weight={4}
                              opacity={0.7}
                         />
                    </MapContainer>
               </div>
          </div>
     );
};

export default MapComponent;