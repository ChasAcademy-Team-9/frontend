import InfoCard from "../components/Driver/InfoCard"


const Driver = () => {
  return (
    <div className="min-h-screen bg-background p-4">
        <InfoCard
          title="Information"
          items={[
            { label: 'Tid:', value: '14:30' },
            { label: 'Distans:', value: '40 km' },
            { label: 'Hastighet:', value: '60 km/h' }
          ]}
        />
      </div>   
        );
};

        export default Driver