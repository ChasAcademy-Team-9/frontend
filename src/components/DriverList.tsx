import Card from './Card'

const DriverList = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center bg-secondary/80 p-4">Förarens paketlista</h1>
      <div className="bg-background p-4 space-y-4">
        <Card
          variant="package"
          paketId="12345"
          destination="Stockholm"
          vikt="2kg"
          fordonId="AB123CD"
          status="kritisk"
          info={{ stad: "Göteborg", tid: "12:00", adress: "Storgatan 1" }}
          onClick={() => alert('Card clicked!')}
        />
        <Card
          variant="package"
          paketId="12346"
          destination="Malmö"
          vikt="1.5kg"
          fordonId="AB123CD"
          status="ok"
          info={{ stad: "Göteborg", tid: "13:00", adress: "Storgatan 2" }}
          onClick={() => alert('Card clicked!')}
        />
        <Card
          variant="package"
          paketId="12347"
          destination="Göteborg"
          vikt="3kg"
          fordonId="AB123CD"
          status="varning"
          info={{ stad: "Göteborg", tid: "14:00", adress: "Storgatan 3" }}
          onClick={() => alert('Card clicked!')}
        />
        <Card
          variant="package"
          paketId="12348"
          destination="Uppsala"
          vikt="0.5kg"
          fordonId="AB123CD"
          status="rapportera"
          info={{ stad: "Göteborg", tid: "15:00", adress: "Storgatan 4" }}
          onClick={() => alert('Card clicked!')}
        />
        <Card
          variant="package"
          paketId="12345"
          destination="Stockholm"
          vikt="2kg"
          fordonId="AB123CD"
          status="In Transit"
          info={{ stad: "Göteborg", tid: "12:00", adress: "Storgatan 1" }}
          onClick={() => alert('Card clicked!')}
        />
        <Card
          variant="package"
          paketId="12345"
          destination="Stockholm"
          vikt="2kg"
          fordonId="AB123CD"
          status="In Transit"
          info={{ stad: "Göteborg", tid: "12:00", adress: "Storgatan 1" }}
          onClick={() => alert('Card clicked!')}
        />
      </div>
    </div>
  )
}

export default DriverList