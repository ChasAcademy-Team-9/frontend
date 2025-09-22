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

  const selectedOption = roleOptions.find(opt => opt.value === selectedRole);

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-4">
      <div className="bg-secondary rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-dark">
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
          className="w-full py-3 px-6 text-base font-semibold"
        />
      </div>
    </div>
  );
};

export default Login;