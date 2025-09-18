export function PrimaryButton(props: { text: string; onClick: React.MouseEventHandler<HTMLButtonElement> }) {
    const { text, onClick } = props

    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-2xl"
            onClick={ onClick }
        >
            {text}
        </button>
    )
}