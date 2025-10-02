import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';
import {
  FaWarehouse,
  FaTruckMoving,
  FaMapMarkedAlt,
  FaChartLine,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

function HomeScreen() {
  return (
    <main className='flex flex-col justify-center items-center px-8 py-12 text-center'>
      <div className='max-w-4xl w-full space-y-8 lg:space-y-12'>
        <div className='space-y-4 lg:space-y-6'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary'>
            Chas 9 Logistics
          </h1>
          <h2 className='text-lg sm:text-xl lg:text-2xl text-text-dark font-medium max-w-3xl mx-auto leading-relaxed'>
            Logistiksystem för garanterad klimatkontrollerad leverans
          </h2>
        </div>

        <div className='flex flex-row justify-center items-center gap-2'>
          <Link to='/sign-up'>
            <PrimaryButton text='Registrera' />
          </Link>
          <Link to='/login'>
            <SecondaryButton text='Logga in' />
          </Link>
        </div>

        <div className='relative group'>
          <img
            className='rounded-2xl lg:rounded-3xl max-w-2xl w-full mx-auto '
            src='src\assets\images\truck-home.webp'
            alt='Lastbil åker på motorväg'
          />
        </div>

        <p className='text-lg sm:text-xl text-text-dark font-medium max-w-2xl mx-auto leading-relaxed px-4'>
          Spåra, styr och säkerställ leveranser av specialvaror i realtid – från
          lager till slutdestination.
        </p>

        <section className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 max-w-4xl mx-auto'>
          <div className='flex flex-col justify-center items-center gap-2 p-4 rounded-xl bg-background border border-primary hover:border-secondary transition-all'>
            <FaWarehouse className='text-4xl lg:text-5xl text-primary' />
            <p className='font-semibold text-text-dark'>Lager</p>
          </div>

          <div className='flex flex-col justify-center items-center gap-2 p-4 rounded-xl bg-background border border-primary hover:border-secondary transition-all'>
            <FaTruckMoving className='text-4xl lg:text-5xl text-primary' />
            <p className='font-semibold text-text-dark'>Transportör</p>
          </div>

          <div className='flex flex-col justify-center items-center gap-2 p-4 rounded-xl bg-background border border-primary hover:border-secondary transition-all'>
            <FaMapMarkedAlt className='text-4xl lg:text-5xl text-primary' />
            <p className='font-semibold text-text-dark'>Spårning</p>
          </div>

          <div className='flex flex-col justify-center items-center gap-2 p-4 rounded-xl bg-background border border-primary hover:border-secondary transition-all'>
            <FaChartLine className='text-4xl lg:text-5xl text-primary' />
            <p className='font-semibold text-text-dark'>Dataanalys</p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default HomeScreen;
