import Dashboard from "../components/Driver/Dashboard";
import InfoCard from "../components/Driver/InfoCard";
import NavigationCard from "../components/Driver/NavigationCard";
import { PrimaryButton } from "../components/PrimaryButton";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { packageService } from "../api/packageService";
import type { Package } from "../types/package";

const Driver = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [driverStats, setDriverStats] = useState({
    totalPackages: 0,
    totalDistance: 0,
    averageSpeed: 0,
    currentTime: new Date().toLocaleTimeString('sv-SE', {
      hour: '2-digit',
      minute: '2-digit'
    })
  });

  // Hämta paket och beräkna förarstatistik
  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        setLoading(true);
        const response = await packageService.getAllPackages();

        // Beräkna statistik från paket
        const totalPackages = response.packages.length;

        // Beräkna total distans (exempelberäkning baserad på tillgänglig data)
        const totalDistance = calculateTotalDistance(response.packages);

        // Beräkna medelhastighet (exempel: distans/tidsuppskattning)
        const averageSpeed = totalDistance > 0 ? Math.round(totalDistance / Math.max(totalPackages * 0.5, 1)) : 0;

        setDriverStats({
          totalPackages,
          totalDistance,
          averageSpeed,
          currentTime: new Date().toLocaleTimeString('sv-SE', {
            hour: '2-digit',
            minute: '2-digit'
          })
        });

      } catch (err) {
        console.error("Fel vid hämtning av förardata:", err);
        setError("Kunde inte ladda förardata");
      } finally {
        setLoading(false);
      }
    };

    fetchDriverData();

    // Uppdatera tid varje minut
    const timeInterval = setInterval(() => {
      setDriverStats(prev => ({
        ...prev,
        currentTime: new Date().toLocaleTimeString('sv-SE', {
          hour: '2-digit',
          minute: '2-digit'
        })
      }));
    }, 60000);

    return () => clearInterval(timeInterval);
  }, []);

  // Beräkna total distans från paket
  const calculateTotalDistance = (packages: Package[]): number => {
    // Detta är en förenklad beräkning - i en riktig app skulle du använda faktisk GPS-data
    // För tillfället uppskattar vi baserat på antal paket och någon genomsnittlig distans
    const averageDistancePerPackage = 15; // km
    return packages.length * averageDistancePerPackage;
  }; return (
    <div className="relative min-h-screen">
      <div className="relative z-10 min-h-screen">
        <h1 className="text-3xl font-bold text-dark bg-secondary p-5">
          Förare Dashboard
        </h1>

        <div className="p-4 space-y-6 pb-20">
          <div className="bg-background bg-opacity-90 rounded-lg p-4">
            {loading ? (
              <div className="bg-secondary rounded p-7">
                <h3 className="font-semibold text-lg text-dark mb-3">Information</h3>
                <div className="text-center text-dark">Laddar data...</div>
              </div>
            ) : error ? (
              <div className="bg-secondary rounded p-7">
                <h3 className="font-semibold text-lg text-dark mb-3">Information</h3>
                <div className="text-center text-red-600">{error}</div>
              </div>
            ) : (
              <InfoCard
                title="Information"
                items={[
                  { label: 'Tid:', value: driverStats.currentTime },
                  { label: 'Totala paket:', value: driverStats.totalPackages.toString() },
                  { label: 'Total distans:', value: `${driverStats.totalDistance} km` },
                  { label: 'Snittshastighet:', value: `${driverStats.averageSpeed} km/h` }
                ]}
              />
            )}
          </div>

          <div className="flex justify-center">
            <PrimaryButton
              text="Skanna för att lägga till"
              onClick={() => navigate('/scanning')}
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Dashboard label="Temperatur" value={22} unit="°C" trend="up" onClick={() => navigate('/driver-list')} />
            <Dashboard label="Luftfuktighet" value={60} unit="%" trend="down" onClick={() => navigate('/driver-list')} />
          </div>

          <NavigationCard
            firstButtonText="Visa rutt"
            secondButtonText="Lista paket"
            onSecondButtonClick={() => navigate('/package-list')}
          />
        </div>
      </div>

      <div className="relative z-50">
        <BottomNav />
      </div>
    </div>
  );
};

export default Driver;