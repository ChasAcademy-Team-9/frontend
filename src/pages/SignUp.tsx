import Input from "../components/Input";
import { PrimaryButton } from "../components/PrimaryButton/PrimaryButton";

function SignUp() {
  return (
    <>
      <button>⬅️</button> {/* TODO byt till backarrow-komponenten när den är klar */}

      <h1>Skapa konto</h1>

      <Input label="Email" name="Email" id="email" type="email" />

      <Input label="Lösenord" name="password" id="password" type="password" />

      <fieldset className="flex flex-col border-1 ">
        <legend>
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
