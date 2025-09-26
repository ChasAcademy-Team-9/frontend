import { PrimaryButton } from '../components/PrimaryButton/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton/SecondaryButton';
import {
  FaWarehouse,
  FaTruckMoving,
  FaMapMarkedAlt,
  FaChartLine,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

function HomeScreen() {
  return (
    <main className='min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 lg:py-16 gap-8 lg:gap-12 text-center bg-background from-background to-gray-50'>
      <div className='max-w-4xl w-full space-y-8 lg:space-y-12'>
        <div className='space-y-4 lg:space-y-6'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary drop-shadow-sm'>
            Chas 9 Logistics
          </h1>
          <h2 className='text-lg sm:text-xl lg:text-2xl text-text-dark font-medium max-w-3xl mx-auto leading-relaxed'>
            Logistiksystem för garanterad klimatkontrollerad leverans
          </h2>
        </div>

        <div className='relative group'>
          <img
            className='rounded-2xl lg:rounded-3xl max-w-2xl w-full mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300 group-hover:scale-[1.02] '
            src='src\assets\images\truck-home.webp'
            alt='Lastbil åker på motorväg'
          />
        </div>

        <p className='text-lg sm:text-xl text-text-dark font-medium max-w-2xl mx-auto leading-relaxed px-4'>
          Spåra, styr och säkerställ leveranser av specialvaror i realtid – från
          lager till slutdestination.
        </p>

        <section className='grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto py-8'>
          <div className='flex flex-col justify-center items-center gap-3 p-4 rounded-xl bg-background shadow-secondary shadow-sm hover:shadow-md transition-shadow duration-300 hover:scale-105 transform '>
            <FaWarehouse className='text-4xl lg:text-5xl text-primary' />
            <p className='font-semibold text-text-dark'>Lager</p>
          </div>

          <div className='flex flex-col justify-center items-center gap-3 p-4 rounded-xl bg-background shadow-secondary shadow-sm hover:shadow-md transition-shadow duration-300 hover:scale-105 transform '>
            <FaTruckMoving className='text-4xl lg:text-5xl text-primary' />
            <p className='font-semibold text-text-dark'>Transportör</p>
          </div>

          <div className='flex flex-col justify-center items-center gap-3 p-4 rounded-xl bg-background shadow-secondary shadow-sm hover:shadow-md transition-shadow duration-300 hover:scale-105 transform '>
            <FaMapMarkedAlt className='text-4xl lg:text-5xl text-primary' />
            <p className='font-semibold text-text-dark'>Spårning</p>
          </div>

          <div className='flex flex-col justify-center items-center gap-3 p-4 rounded-xl bg-background shadow-secondary shadow-sm hover:shadow-md transition-shadow duration-300 hover:scale-105 transform '>
            <FaChartLine className='text-4xl lg:text-5xl text-primary' />
            <p className='font-semibold text-text-dark'>Dataanalys</p>
          </div>
        </section>

        <div className='flex flex-col md:flex-row justify-center items-center gap-2'>
          <Link to={'/sign-up'}>
            <PrimaryButton text='Registrera' />
          </Link>
          <Link to={'/login'}>
            <SecondaryButton text='Logga in' />
          </Link>
        </div>
      </div>
    </main>
  );
}

export default HomeScreen;
