import Input from '../components/Input';
import { PrimaryButton } from '../components/PrimaryButton/PrimaryButton';
import BackArrow from '../components/BackArrow';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <main className="p-8 flex flex-col gap-8 max-sm:min-h-screen max-sm:w-screen max-sm:fixed max-sm:inset-0 max-sm:p-4">
      <BackArrow />

      <h1>Logga in</h1>

      <Input label="Email" name="email" id="email" type="email" className="max-sm:w-full" />

      <Input label="Lösenord" name="password" id="password" type="password" className="max-sm:w-full" />

      <PrimaryButton text="Logga in" onClick={() => { console.log("Du är inloggad, yay!"); }} />

      <div className="text-center">
        <p className="text-text-dark opacity-70">
          Har du inget konto än?{' '}
          <Link to="/sign-up" className="text-primary text-lg underline font-bold hover:underline transition-colors">
            Registrera dig här
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
