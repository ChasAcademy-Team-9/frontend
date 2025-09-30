import type { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  id: string;
  className?: string;
  labelClassName?: string;
}

const Input: FC<InputProps> = ({
  name,
  label,
  id,
  className,
  labelClassName,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-2 w-100 ${className || ''}`}>
      <label htmlFor={id} className={`text-text-dark ${labelClassName || ''}`}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        placeholder={name}
        className='
                         px-4 py-3
                         bg-background   
                         border-secondary border-2
                         rounded-2xl
                         text-text-dark
                         placeholder:text-able
                         focus:outline-none 
                         focus:border-focus 
                         focus:ring-focus focus:ring-1
                         cursor-text   
                         disabled:cursor-not-allowed   
                         disabled:opacity-50    
               '
        {...props}
      />
    </div>
  );
};

export default Input;
