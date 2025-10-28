import PackageItem from "../pages/PackageItem";

const packages = [
  { paketId: "12345", destination: "Stockholm", status: "Under transport" },
  {
    paketId: "67890",
    destination: "Göteborg",
    status: "Levererad",
    showReceipt: true,
  },
  { paketId: "54321", destination: "Malmö", status: "Försenad" },
];

export default function RecipientPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="bg-secondary rounded-lg shadow-md p-6 space-y-2">
          <h1 className="text-3xl font-bold text-primary text-center">
            Välkommen
          </h1>
          <p className="text-md text-white text-center font-inter">
            Du har {packages.length} leveranser
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-4">
            {packages.map((pkg) => (
              <PackageItem
                key={pkg.paketId}
                paketId={pkg.paketId}
                destination={pkg.destination}
                status={pkg.status}
                showReceipt={pkg.showReceipt ?? false}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
