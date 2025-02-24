export interface HeaderProps {
    setIsModalOpen: (isModalOpen: boolean) => void;
}

const Header = ({ setIsModalOpen }: HeaderProps) => {
    return (
        <div className="flex justify-between items-center w-full">
            <h1 className="text-6xl font-bold mt-4 max-w-96 mb-4 self-start">lexicon</h1>
            <button
                className="text-xl font-bold bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-300"
                onClick={() => setIsModalOpen(true)}
            >
                ?
            </button>
        </div>
    );
}

export default Header;