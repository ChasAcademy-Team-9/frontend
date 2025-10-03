import Card from "../components/Card";

const ConfirmationRapport: React.FC = () => {
  return (
    <div>
      <h1>Bekräftelse av Rapport</h1>
      <Card 
        variant="confirmation" 
        vikt="2kg"
        fordonId="XYZ123"
        paketId="12345" 
        destination="Stockholm" 
        status="ok"
        info={{ stad: "Göteborg", tid: "12:30", adress: "Storgatan 1" }}
      />
    </div>
  );
};

export default ConfirmationRapport;