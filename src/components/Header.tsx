import { getFormattedDate } from "../util/Date";
import { IoStatsChart, IoMoon, IoSunny, IoCalendarSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useTheme } from "../context/ThemeContext";

export interface HeaderProps {
    setIsHelpModalOpen: (isModalOpen: boolean) => void;
    setIsSuccessModalOpen: (isSuccessModalOpen: boolean) => void;
    puzzleNumber: string;
}

const Header = ({ setIsHelpModalOpen, setIsSuccessModalOpen, puzzleNumber }: HeaderProps) => {
    const { toggleTheme, theme } = useTheme();
    const navigate = useNavigate();
    return (
        <div className="header puzzleHeader">
            <div className="headerTop">
                <div className="headerName">lexicon</div>
                <div className="headerButtons">
                    <button type="button" className="headerButton" aria-label="Stats" onClick={() => setIsSuccessModalOpen(true)}>
                        <IoStatsChart className="headerIconButton"/>
                    </button>
                    <button type="button" className="headerButton" aria-label="How to play" onClick={() => setIsHelpModalOpen(true)}>?</button>
                    <button type="button" className="headerButton" aria-label={theme == 'light' ? "Switch to dark mode" : "Switch to light mode"} onClick={() => toggleTheme()}>
                        {theme == 'light'
                            ? <IoMoon className="headerIconButton"/>
                            : <IoSunny className="headerIconButton"/>}
                    </button>
                    <button type="button" className="headerButton" aria-label="Archive" onClick={() => navigate('/archive')}>
                        <IoCalendarSharp className="headerIconButton" />
                    </button>
                </div>
            </div>
            <div className="headerPuzzleNumber">{getFormattedDate(puzzleNumber)}: Puzzle #{puzzleNumber}</div>
        </div>
    );
}

export default Header;
