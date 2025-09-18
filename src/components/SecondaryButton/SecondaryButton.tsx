export function SecondaryButton(props: { text: string; onClick: React.MouseEventHandler<HTMLButtonElement> }) {
    const { text, onClick } = props
    return (
        <button
            className="bg-teal-300 hover:bg-teal-500 text-white px-6 py-2 rounded-2xl"
            onClick={ onClick }
        >
            { text }
        </button>
    )
}