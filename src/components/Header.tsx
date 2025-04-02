import { getFormattedDate, getPuzzleNumber } from "../util/Date";

export interface HeaderProps {
    setIsHelpModalOpen: (isModalOpen: boolean) => void;
    setIsSuccessModalOpen: (isSuccessModalOpen: boolean) => void;
}

const Header = ({ setIsHelpModalOpen, setIsSuccessModalOpen }: HeaderProps) => {
    return (
        <div className="header">
            <div className="headerText">
                <div className="headerName">lexicon</div>
                <div className="headerPuzzleNumber">{getFormattedDate()}: Puzzle #{getPuzzleNumber()}</div>
            </div>
            <div className="headerButtons">
                <button className="headerButton" onClick={() => setIsSuccessModalOpen(true)}>#</button>
                <button className="headerButton" onClick={() => setIsHelpModalOpen(true)}>?</button>
            </div>
        </div>
    );
}

export default Header;