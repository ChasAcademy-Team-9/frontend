import Dashboard from "../components/Driver/Dashboard";
import InfoCard from "../components/Driver/InfoCard";
import { PrimaryButton } from "../components/PrimaryButton";
import BottomNav from "../components/BottomNav";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { packageService } from "../api/packageService";
import type { Package } from "../types/package";

const Driver = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
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

        // Set packages for the driver list
        setPackages(response.packages);

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
  };

  // visar lista baserat på statusprioritet - error, warning, ok, rapportera
  const getRandomStatus = () => {
    const statuses = ['kritisk', 'ok', 'varning', 'rapportera', 'kärnd', 'pending'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  // Status med prioritet för sortering 
  const getStatusPriority = (status: string): number => {
    const priorities: Record<string, number> = {
      'kritisk': 1,
      'varning': 2,
      'ok': 3,
      'rapportera': 4,

    };
    return priorities[status] || 7;
  };

  const getSortedPackages = (packages: Package[]): (Package & { status: string })[] => {
    const packagesWithStatus = packages.map(pkg => ({
      ...pkg,
      status: getRandomStatus()
    }));

    return packagesWithStatus.sort((a, b) => {
      return getStatusPriority(a.status) - getStatusPriority(b.status);
    });
  }; return (
    <div className="relative min-h-screen">
      <div className="relative z-10 min-h-screen">
        <h1 className="text-3xl font-bold text-dark bg-secondary p-5">
          Förare Dashboard
        </h1>

        <div className="p-4 space-y-6 pb-20">
          <div className="flex justify-center mb-4">
            <PrimaryButton
              text="Lista paket"
              onClick={() => navigate('/package-list')}
            />
          </div>
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

          <div className="flex justify-center">
            <PrimaryButton
              text="Skanna för att lägga till"
              onClick={() => navigate('/scanning')}
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Dashboard label="Temperatur" value={22} unit="°C" status="ok" onClick={() => navigate('/driver-list')} />
            <Dashboard label="Luftfuktighet" value={60} unit="%" status="warning" onClick={() => navigate('/driver-list')} />
          </div>


          {!loading && !error && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-dark">Paketlista (sorterat efter prioritet)</h2>
              {packages.length > 0 ? (
                getSortedPackages(packages).map((pkg) => (
                  <Card
                    key={pkg.PackageID}
                    variant="package"
                    paketId={pkg.PackageID.toString()}
                    destination={pkg.Destination || 'Unknown'}
                    vikt={`${pkg.PackageWeight}kg`}
                    fordonId="AB123CD"
                    status={pkg.status}
                    info={{
                      stad: pkg.Origin || 'Unknown',
                      tid: '12:00',
                      adress: 'Storgatan 1'
                    }}
                    onClick={() => navigate(`/package-details-driver/${pkg.PackageID}`)}
                  />
                ))
              ) : (
                <div className="bg-secondary rounded p-4 text-center text-dark">
                  Inga paket tillgängliga
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="relative z-50">
        <BottomNav />
      </div>
    </div>
  );
};

export default Driver;