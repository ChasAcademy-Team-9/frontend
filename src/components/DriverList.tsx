import Card from './Card'

const DriverList = () => {
  return (
    <div>
    <h1 className="text-2xl font-bold mb-4 text-center bg-secondary/80 p-4">Driver's Package List</h1>
    <div className="bg-secondary/80 shadow-md p-4 space-y-4">
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