import Input from '../components/Input';
import { PrimaryButton } from '../components/PrimaryButton/PrimaryButton';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="bg-secondary min-h-screen flex flex-col items-center justify-center p-4 gap-6 focus:bg-background ">
      <div className="text-center mb-8">
        <h1 className='text-4xl font-bold text-text-dark mb-2'>
          Välkommen!
        </h1>
        <p className='text-lg text-text-dark opacity-80'>
          Logga in för att fortsätta till din profil
        </p>
      </div>
      <Input
        name="email"
        label="Email"
        type="email"
        id="login-email"
        labelClassName="text-lg"
      />
      <Input
        name="password"
        label="Password"
        type="password"
        id="login-password"
        labelClassName="text-lg"
      />
      <PrimaryButton text="Logga in" onClick={() => { console.log("Du är inloggad, yay!"); }} />

      <div className="mt-6 text-center">
        <p className="text-text-dark opacity-70">
          Har du inget konto än?{' '}
          <Link to="/sign-up" className="text-text-dark text-md underline font-bold hover:underline transition-colors">
            Registrera dig här
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
