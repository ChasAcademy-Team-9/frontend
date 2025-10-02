import Input from '../components/Input';
import { PrimaryButton } from '../components/PrimaryButton';
import BackArrow from '../components/BackArrow';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <main className='p-8 flex flex-col justify-center items-center gap-8'>
      <BackArrow />

      <div className='text-center'>
        <h1 className='text-4xl font-bold text-text-dark mb-2'>Välkommen!</h1>
        <p className='text-lg text-text-dark opacity-80'>
          Logga in för att fortsätta till din profil
        </p>
      </div>

      <Input
        label='Email'
        name='email'
        id='email'
        type='email'
        className='max-sm:w-full'
      />

      <Input
        label='Lösenord'
        name='password'
        id='password'
        type='password'
        className='max-sm:w-full'
      />

      <PrimaryButton
        fullWidth={true}
        text='Logga in'
        onClick={() => {
          console.log('Du är inloggad, yay!');
        }}
      />

      <div className='text-center'>
        <p className='text-text-dark '>
          Har du inget konto än?{' '}
          <Link
            to='/sign-up'
            className='underline font-bold hover:underline transition-colors'
          >
            Registrera dig här
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
