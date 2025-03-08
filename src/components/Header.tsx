import { getFormattedDate, getPuzzleNumber } from "../util/Date";

export interface HeaderProps {
    setIsModalOpen: (isModalOpen: boolean) => void;
}

const Header = ({ setIsModalOpen }: HeaderProps) => {
    return (
        <div className="flex justify-between items-center w-full">
            <div>
                <div className="text-5xl font-bold font-mono max-w-96 self-starts text-sky-200">lexicon</div>
                <div className="max-w-96 font-mono self-start text-sky-200">{getFormattedDate()}: Puzzle #{getPuzzleNumber()}</div>
            </div>
            <button
                className="text-xl font-mono font-bold text-sky-200 bg-sky-700 rounded-full w-6 h-6 flex items-center justify-center hover:bg-sky-800 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                ?
            </button>
        </div>
    );
}

export default Header;