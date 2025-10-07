import Card from './Card'import Card from './Card'



const DriverList = () => {const DriverList = () => {

  return (  return (

    <div>    <div>

      <h1 className="text-2xl font-bold mb-4 text-center bg-secondary/80 p-4">Förarens paketlista</h1>      <h1 className="text-2xl font-bold mb-4 text-center bg-secondary/80 p-4">Förarens paketlista</h1>

      <div className="bg-background p-4 space-y-4">      <div className="bg-background p-4 space-y-4">

        <Card        <Card

          variant="package"          variant="package"

          paketId="12345"          paketId="12345"

          destination="Stockholm"          destination="Stockholm"

          vikt="2kg"          vikt="2kg"

          fordonId="AB123CD"          fordonId="AB123CD"

          status="kritisk"          status="kritisk"

          info={{ stad: "Göteborg", tid: "12:00", adress: "Storgatan 1" }}          info={{ stad: "Göteborg", tid: "12:00", adress: "Storgatan 1" }}

          onClick={() => alert('Card clicked!')}          onClick={() => alert('Card clicked!')}

        />        />

        <Card        <Card

          variant="package"          variant="package"

          paketId="12346"          paketId="12346"

          destination="Malmö"          destination="Malmö"

          vikt="1.5kg"          vikt="1.5kg"

          fordonId="AB123CD"          fordonId="AB123CD"

          status="ok"          status="ok"

          info={{ stad: "Göteborg", tid: "13:00", adress: "Storgatan 2" }}          info={{ stad: "Göteborg", tid: "13:00", adress: "Storgatan 2" }}

          onClick={() => alert('Card clicked!')}          onClick={() => alert('Card clicked!')}

        />        />

        <Card        <Card

          variant="package"          variant="package"

          paketId="12347"          paketId="12347"

          destination="Göteborg"          destination="Göteborg"

          vikt="3kg"          vikt="3kg"

          fordonId="AB123CD"          fordonId="AB123CD"

          status="varning"          status="varning"

          info={{ stad: "Göteborg", tid: "14:00", adress: "Storgatan 3" }}          info={{ stad: "Göteborg", tid: "14:00", adress: "Storgatan 3" }}

          onClick={() => alert('Card clicked!')}          onClick={() => alert('Card clicked!')}

        />        />

        <Card        <Card

          variant="package"          variant="package"

          paketId="12348"          paketId="12348"

          destination="Uppsala"          destination="Uppsala"

          vikt="0.5kg"          vikt="0.5kg"

          fordonId="AB123CD"          fordonId="AB123CD"

          status="rapportera"          status="rapportera"

          info={{ stad: "Göteborg", tid: "15:00", adress: "Storgatan 4" }}          info={{ stad: "Göteborg", tid: "15:00", adress: "Storgatan 4" }}

          onClick={() => alert('Card clicked!')}          onClick={() => alert('Card clicked!')}

        />        />

        <Card        <Card

          variant="package"          variant="package"

          paketId="12345"          paketId="12345"

          destination="Stockholm"          destination="Stockholm"

          vikt="2kg"          vikt="2kg"

          fordonId="AB123CD"          fordonId="AB123CD"

          status="In Transit"          status="In Transit"

          info={{ stad: "Göteborg", tid: "12:00", adress: "Storgatan 1" }}          info={{ stad: "Göteborg", tid: "12:00", adress: "Storgatan 1" }}

          onClick={() => alert('Card clicked!')}          onClick={() => alert('Card clicked!')}

        />        />

        <Card        <Card

          variant="package"          variant="package"

          paketId="12345"          paketId="12345"

          destination="Stockholm"          destination="Stockholm"

          vikt="2kg"          vikt="2kg"

          fordonId="AB123CD"          fordonId="AB123CD"

          status="In Transit"          status="In Transit"

          info={{ stad: "Göteborg", tid: "12:00", adress: "Storgatan 1" }}          info={{ stad: "Göteborg", tid: "12:00", adress: "Storgatan 1" }}

          onClick={() => alert('Card clicked!')}          onClick={() => alert('Card clicked!')}

        />        />

      </div>      </div>

    </div>    </div>

  )  )

}}



export default DriverListexport default DriverList