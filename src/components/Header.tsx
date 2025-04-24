import { getFormattedDate } from "../util/Date";

export interface HeaderProps {
    setIsHelpModalOpen: (isModalOpen: boolean) => void;
    setIsSuccessModalOpen: (isSuccessModalOpen: boolean) => void;
    puzzleNumber: string;
}

const Header = ({ setIsHelpModalOpen, setIsSuccessModalOpen, puzzleNumber }: HeaderProps) => {
    return (
        <div className="header">
            <div className="headerText">
                <div className="headerName">lexicon</div>
                <div className="headerPuzzleNumber">{getFormattedDate(puzzleNumber)}: Puzzle #{puzzleNumber}</div>
            </div>
            <div className="headerButtons">
                <div className="headerButton" onClick={() => setIsSuccessModalOpen(true)}>#</div>
                <div className="headerButton" onClick={() => setIsHelpModalOpen(true)}>?</div>
            </div>
        </div>
    );
}

export default Header;