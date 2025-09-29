import { useState } from "react";
import { Dropdown } from "../components/Dropdown";
import Input from "../components/Input";
import { PrimaryButton } from "../components/PrimaryButton";
import BackArrow from "../components/BackArrow";

function SignUp() {
  const [role, setRole] = useState({ value: "", label: "" });

  return (
    <main className="p-8 flex flex-col justify-center items-center gap-8">
      <BackArrow />
      <h1 className="text-4xl font-bold text-text-dark mb-2">Skapa konto</h1>

      <Input
        label="Email"
        name="Email"
        id="email"
        type="email"
        className="max-sm:w-full"
      />

      <Input
        label="Lösenord"
        name="password"
        id="password"
        type="password"
        className="max-sm:w-full"
      />

      <Dropdown
        options={[
          { value: "logistics", label: "Logistik" },
          { value: "tracking", label: "Spårning" },
          { value: "data", label: "Data" },
        ]}
        selectedValue={role.value}
        onSelect={(o) => setRole(o)}
        placeholder="Välj kontotyp"
        className="
        w-100
        max-sm:w-full"
      />

      <PrimaryButton text="Registrera" fullWidth={true} onClick={() => null} />
    </main>
  );
}

export default SignUp;
