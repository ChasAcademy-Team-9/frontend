import { PrimaryButton } from '../components/PrimaryButton/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton/SecondaryButton';

function HomeScreen() {
  return (
    <main className='flex flex-col justify-center items-center p-8'>
      <h1>Welcome</h1>
      <p>
        {' '}
        Spåra, styr och säkerställ leveranser av specialvaror i realtid – från
        lager till slutdestination.
      </p>
      <div className='flex flex-col gap-2'>
        <PrimaryButton text='Registrera' />
        <SecondaryButton text='Logga in' />
      </div>
    </main>
  );
}

export default HomeScreen;
