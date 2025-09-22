import Input from "../components/Input";
import { PrimaryButton } from "../components/PrimaryButton/PrimaryButton";

function SignUp() {
  return (
    <>
      <button className="text-6xl font-bold border rounded-full p-6">←</button> {/* TODO byt till backarrow-komponenten när den är klar */}

      <h1>Skapa konto</h1>

      <Input label="Email" name="Email" id="email" type="email" />

      <Input label="Lösenord" name="password" id="password" type="password" />

      <fieldset className="flex flex-col border-1 
                         px-3 py-2 
                         bg-surface   
                         border border-border 
                         rounded-2xl
                         text-text-dark
                         placeholder:text-able
                         focus:outline-none 
                         focus:border-focus 
                         focus:ring-focus focus:ring-1
                         cursor-text   
                         disabled:cursor-not-allowed       
               ">
        <legend className="text-text-dark text-sm">
          Kontotyp
        </legend>
        <label>
          <input type="radio" name="role" />
          Logistik
        </label>
        <label>
          <input type="radio" name="role" />
          Spårning
        </label>
        <label>
          <input type="radio" name="role" />
          Data
        </label>
      </fieldset>

      <PrimaryButton text="Registrera" onClick={()=>null} />
    </>
  );
}

export default SignUp;
