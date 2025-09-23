import { useState } from "react";
import { PrimaryButton } from "../components/PrimaryButton/PrimaryButton";
import { Dropdown } from "../components/Dropdown/Dropdown";

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('');

  const roleOptions = [
    { value: 'avsandare', label: 'Avsändare' },
    { value: 'mottagare', label: 'Mottagare' },
    { value: 'chaffor', label: 'Chaufför' }
  ];

  const handleRoleSelect = (option: { value: string; label: string }) => {
    setSelectedRole(option.value);
  };

  const handleContinue = () => {
    if (selectedRole) {
      console.log('Selected role:', selectedRole);
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center px-4 py-8">
      <div className="bg-secondary rounded-2xl shadow-lg p-12 w-full max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-text-dark">
          Välj din roll
        </h1>

        <Dropdown
          options={roleOptions}
          selectedValue={selectedRole}
          placeholder="Välj din roll..."
          onSelect={handleRoleSelect}
          className="mb-6"
        />

        <PrimaryButton
          text="Fortsätt"
          onClick={handleContinue}
        />
      </div>
    </div>
  );
};

export default Login;