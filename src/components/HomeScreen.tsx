import { PrimaryButton } from '../components/PrimaryButton/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton/SecondaryButton';
import {
  FaWarehouse,
  FaTruckMoving,
  FaMapMarkedAlt,
  FaChartLine,
} from 'react-icons/fa';

function HomeScreen() {
  return (
    <main className='flex flex-col justify-center items-center px-4 py-8 gap-8 text-center'>
      <h1 className='text-5xl font-extrabold text-primary '>
        Chas 9 Logistics
      </h1>
      <h2 className='text-lg'>
        Logistiksystem för garanterad klimatkontrollerad leverans
      </h2>
      <img
        className='rounded-2xl max-w-2xl w-full'
        src='src\assets\images\truck-home.webp'
        alt='Lastbil åker på motorväg'
      />
      <p>
        Spåra, styr och säkerställ leveranser av specialvaror i realtid – från
        lager till slutdestination.
      </p>
      <section className='flex flex-wrap gap-4 text-center items-center justify-center'>
        <div className='flex flex-col justify-center items-center gap-2'>
          <FaWarehouse className='text-4xl text-primary' />
          <p className='font-semibold'>Lager</p>
        </div>

        <div className='flex flex-col justify-center items-center gap-2'>
          <FaTruckMoving className='text-4xl text-primary' />
          <p className='font-semibold'>Transportör</p>
        </div>

        <div className='flex flex-col justify-center items-center gap-2'>
          <FaMapMarkedAlt className='text-4xl text-primary' />
          <p className='font-semibold'>Spårning</p>
        </div>

        <div className='flex flex-col justify-center items-center gap-2'>
          <FaChartLine className='text-4xl text-primary' />
          <p className='font-semibold'>Dataanalys</p>
        </div>
      </section>
      <div className='flex flex-col gap-2'>
        <PrimaryButton text='Registrera' />
        <SecondaryButton text='Logga in' />
      </div>
    </main>
  );
}

export default HomeScreen;
