import Card from '../components/Card';
import BackArrow from '../components/BackArrow';

const PackageList = () => {
  return (
    <div className='min-h-screen flex flex-col bg-background'>
      <div className='flex items-center p-5 bg-secondary text-text-dark'>
        <div className='mr-4'>
          <BackArrow />
        </div>
        <h1 className='text-2xl font-bold flex-1 text-center mr-10'>All packages with information</h1>
      </div>
      <div className='bg-background m-4 space-y-4'>
        <Card
          variant='package'
          paketId='12345'
          destination='Stockholm'
          vikt='2kg'
          fordonId='AB123CD'
          info={{ stad: 'Göteborg', tid: '12:00', adress: 'Storgatan 1' }}
          onClick={() => alert('Card clicked!')}
        />
        <Card
          variant='package'
          paketId='12346'
          destination='Malmö'
          vikt='1.5kg'
          fordonId='AB123CD'
          info={{ stad: 'Göteborg', tid: '13:00', adress: 'Storgatan 2' }}
          onClick={() => alert('Card clicked!')}
        />
        <Card
          variant='package'
          paketId='12347'
          destination='Göteborg'
          vikt='3kg'
          fordonId='AB123CD'
          info={{ stad: 'Göteborg', tid: '14:00', adress: 'Storgatan 3' }}
          onClick={() => alert('Card clicked!')}
        />
        <Card
          variant='package'
          paketId='12348'
          destination='Uppsala'
          vikt='0.5kg'
          fordonId='AB123CD'
          info={{ stad: 'Göteborg', tid: '15:00', adress: 'Storgatan 4' }}
          onClick={() => alert('Card clicked!')}
        />
        <Card
          variant='package'
          paketId='12345'
          destination='Stockholm'
          vikt='2kg'
          fordonId='AB123CD'
          info={{ stad: 'Göteborg', tid: '12:00', adress: 'Storgatan 1' }}
          onClick={() => alert('Card clicked!')}
        />
        <Card
          variant='package'
          paketId='12345'
          destination='Stockholm'
          vikt='2kg'
          fordonId='AB123CD'
          info={{ stad: 'Göteborg', tid: '12:00', adress: 'Storgatan 1' }}
          onClick={() => alert('Card clicked!')}
        />
      </div>
    </div>
  );
};

export default PackageList;