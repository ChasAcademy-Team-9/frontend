import { useState } from "react";
import { PrimaryButton } from "../components/PrimaryButton/PrimaryButton";

const Login = () => {
     const [selectedRole, setSelectedRole] = useState('');
     const [isOpen, setIsOpen] = useState(false);

     const options = [
          { value: 'avsandare', label: 'Avsändare' },
          { value: 'mottagare', label: 'Mottagare' },
          { value: 'chaffor', label: 'Chaufför' }
     ];

     const handleSelect = (option: { value: string; label: string }) => {
          setSelectedRole(option.value);
          setIsOpen(false);
     };

     return (
          <div className="bg-background min-h-screen flex items-center justify-center p-4 round-2xl">
               <div className="bg-secondary rounded-2xl shadow-lg p-8 w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-6 text-dark">
                         Välj din roll
                    </h1>

                    <div className="relative mb-6">
                         <button
                              onClick={() => setIsOpen(!isOpen)}
                              className="w-full bg-white border-2xl border-border rounded-lg px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-focus focus:border-focus flex justify-between items-center transition-colors"
                         >
                              <span className="text-dark">
                                   {selectedRole ? options.find(opt => opt.value === selectedRole)?.label : 'Välj din roll...'}
                              </span>
                              <svg
                                   className={`w-5 h-5 text-dark transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                   fill="none"
                                   viewBox="0 0 24 24"
                              >
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                         </button>

                         {isOpen && (
                              <div className="absolute top-full left-0 right-0 mt-1 bg-border border rounded-2xl shadow-lg z-10">
                                   {options.map((option) => (
                                        <button
                                             key={option.value}
                                             onClick={() => handleSelect(option)}
                                             className="w-full px-4 py-3 text-left hover:hover hover:text-dark transition-colors first:rounded-t-2xl last:rounded-b-2xl border-b border-border last:border-b-0"
                                        >
                                             {option.label}
                                        </button>
                                   ))}
                              </div>
                         )}
                    </div>

                    {selectedRole && (
                         <div className="p-3 bg-secondary rounded-2xl border border-focus mb-4">
                              <p className="text-dark text-sm">
                                   <span className="font-medium">Vald roll:</span> {options.find(opt => opt.value === selectedRole)?.label}
                              </p>
                         </div>
                    )}

                    <PrimaryButton
                         text="Fortsätt"
                         onClick={() => {
                              console.log('Selected role:', selectedRole);
                         }}
                    />
               </div>
          </div>
     );
}

export default Login