import type React from "react";

export function PrimaryButton(props: {
  text: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const { text, icon, onClick, fullWidth = false } = props;

  return (
    <button
      className={` 

        flex items-center justify-center gap-2

        ${fullWidth ? "w-full" : "w-auto"} 

        sm:w-auto

        min-w-32

        bg-primary hover:brightness-150 text-text-light px-6 py-2 rounded-2xl cursor-pointer
      `}
      onClick={onClick}
    >
      {icon && icon}
      {text}
    </button>
  );
}
