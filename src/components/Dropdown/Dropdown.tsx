import { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  selectedValue?: string;
  placeholder?: string;
  onSelect: (option: Option) => void;
  className?: string;
}

export const Dropdown = ({ 
  options, 
  selectedValue, 
  placeholder = "Välj ett alternativ...", 
  onSelect,
  className = ""
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: Option) => {
    onSelect(option);
    setIsOpen(false);
  };

  const selectedOption = options.find(opt => opt.value === selectedValue);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-background border-2 border-border rounded-2xl px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-focus focus:border-focus flex justify-between items-center transition-colors hover:border-hover"
      >
        <span className="text-dark">
          {selectedOption?.label || placeholder}
        </span>
        <svg
          className={`w-5 h-5 text-dark transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border-2 border-border rounded-2xl shadow-lg z-10 overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option)}
              className="w-full px-4 py-3 text-left text-dark hover:bg-background transition-colors border-b border-border last:border-b-0"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};