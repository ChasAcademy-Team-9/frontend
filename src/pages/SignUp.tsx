import { useState } from "react";
import { Dropdown } from "../components/Dropdown/Dropdown";
import Input from "../components/Input";
import { PrimaryButton } from "../components/PrimaryButton/PrimaryButton";
import BackArrow from "../components/BackArrow";

function SignUp() {
  const [role, setRole] = useState({value: '', label: ''})

  return (
    <main className="p-8 flex flex-col gap-8">
      <BackArrow />

      <h1>Skapa konto</h1>

      <Input label="Email" name="Email" id="email" type="email" />

      <Input label="Lösenord" name="password" id="password" type="password" />

      <Dropdown options={[{value:'logistics', label: 'Logistik'},{value:'tracking', label: 'Spårning'},{value:'data', label: 'Data'}]} selectedValue={role.value} onSelect={o => setRole(o)} placeholder="Välj kontotyp"/>

      <PrimaryButton text="Registrera" onClick={()=>null} />
    </main>
  );
}

export default SignUp;
