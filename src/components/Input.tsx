import type { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
     name: string;
     label: string;
     id: string;
}

const Input: FC<InputProps> = ({ name, label, id }) => {
     return (
          <div className="flex flex-col gap-2 w-100">
               <label
                    htmlFor={id}
                    className="text-text-dark text-sm"
               >
                    {label}
               </label>
               <input
                    id={id}
                    name={name}
                    placeholder={name}
                    className="
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
               "
               />
          </div>
     )
}

export default Input