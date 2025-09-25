import Input from '../components/Input';
import { PrimaryButton } from '../components/PrimaryButton/PrimaryButton';

function Login() {
  return (
    <div className="bg-secondary min-h-screen flex flex-col items-center justify-center p-4 gap-6 focus:bg-background ">
      <h1
      className='text-4xl font-bold text-text-dark mb-4'
      >Välkommen!</h1>
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
    </div>
  );
}

export default Login;
