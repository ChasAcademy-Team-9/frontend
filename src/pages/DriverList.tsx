import Card from "../components/Card"
import BackArrow from "../components/BackArrow"
import { useNavigate } from 'react-router-dom'

const DriverList = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center p-4 bg-secondary/80 text-text-dark">
        <div className="mr-4">
          <BackArrow />
        </div>
        <h1 className="text-2xl font-bold flex-1 text-center mr-10">Förarens paketlista</h1>
      </div>
      <div className="bg-background space-y-4">
        <Card
          variant="package"
          paketId="12345"
          destination="Stockholm"
          vikt="2kg"
          fordonId="AB123CD"
          status="kritisk"
          info={{ stad: "Göteborg", tid: "12:00", adress: "Storgatan 1" }}
          onClick={() => navigate('/package-details-driver')}
        />
        <Card
          variant="package"
          paketId="12346"
          destination="Malmö"
          vikt="1.5kg"
          fordonId="AB123CD"
          status="ok"
          info={{ stad: "Göteborg", tid: "13:00", adress: "Storgatan 2" }}
          onClick={() => navigate('/package-details-driver')}
        />
        <Card
          variant="package"
          paketId="12347"
          destination="Göteborg"
          vikt="3kg"
          fordonId="AB123CD"
          status="varning"
          info={{ stad: "Göteborg", tid: "14:00", adress: "Storgatan 3" }}
          onClick={() => navigate('/package-details-driver')}
        />
        <Card
          variant="package"
          paketId="12348"
          destination="Uppsala"
          vikt="0.5kg"
          fordonId="AB123CD"
          status="rapportera"
          info={{ stad: "Göteborg", tid: "15:00", adress: "Storgatan 4" }}
          onClick={() => navigate('/package-details-driver')}
        />
        <Card
          variant="package"
          paketId="12345"
          destination="Stockholm"
          vikt="2kg"
          fordonId="AB123CD"
          status="In Transit"
          info={{ stad: "Göteborg", tid: "12:00", adress: "Storgatan 1" }}
          onClick={() => navigate('/package-details-driver')}
        />
        <Card
          variant="package"
          paketId="12345"
          destination="Stockholm"
          vikt="2kg"
          fordonId="AB123CD"
          status="In Transit"
          info={{ stad: "Göteborg", tid: "12:00", adress: "Storgatan 1" }}
          onClick={() => navigate('/package-details-driver')}
        />
      </div>
    </div>
  )
}

export default DriverList