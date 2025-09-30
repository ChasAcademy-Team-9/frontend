export function PrimaryButton(props: {
  text: string;
  fullWidth?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const { text, onClick, fullWidth = false } = props;

  return (
    <button
      className={` 



        ${fullWidth ? 'w-full' : 'w-auto'} 

        sm:w-auto

        

        bg-primary hover:brightness-150 text-text-light px-6 py-2 rounded-2xl cursor-pointer
      `}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
