export function SecondaryButton(props: { text: string; onClick: React.MouseEventHandler<HTMLButtonElement> }) {
    const { text, onClick } = props
    return (
        <button
            className="bg-secondary hover:brightness-110 text-text-light px-6 py-2 rounded-2xl cursor-pointer"
            onClick={ onClick }
        >
            { text }
        </button>
    )
}