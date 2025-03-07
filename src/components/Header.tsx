import { getFormattedDate, getPuzzleNumber } from "../util/Date";

export interface HeaderProps {
    setIsModalOpen: (isModalOpen: boolean) => void;
}

const Header = ({ setIsModalOpen }: HeaderProps) => {
    return (
        <div className="flex justify-between items-center w-full">
            <div>
                <div className="text-5xl font-bold max-w-96 self-start">lexicon</div>
                <div className="max-w-96 self-start">{getFormattedDate()}: Puzzle #{getPuzzleNumber()}</div>
            </div>
            <button
                className="text-xl font-bold bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-300 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                ?
            </button>
        </div>
    );
}

export default Header;