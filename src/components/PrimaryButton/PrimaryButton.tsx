export function PrimaryButton(props: {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const { text, onClick } = props;

  return (
    <button
      className='bg-primary hover:brightness-150 text-text-light px-6 py-2 rounded-2xl cursor-pointer'
      onClick={onClick}
    >
      {text}
    </button>
  );
}
