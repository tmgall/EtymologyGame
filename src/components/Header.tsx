import { getFormattedDate } from "../util/Date";
import { IoStatsChart, IoMoon, IoSunny } from "react-icons/io5";
import { useState, useEffect } from "react";


type Theme = 'light' | 'dark';
const THEME_KEY = 'theme';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(THEME_KEY);
    return (saved as Theme) || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
};

export interface HeaderProps {
    setIsHelpModalOpen: (isModalOpen: boolean) => void;
    setIsSuccessModalOpen: (isSuccessModalOpen: boolean) => void;
    puzzleNumber: string;
}

const Header = ({ setIsHelpModalOpen, setIsSuccessModalOpen, puzzleNumber }: HeaderProps) => {
    const { toggleTheme, theme } = useTheme();
    return (
        <div className="header">
            <div className="headerText">
                <div className="headerName">lexicon</div>
                <div className="headerPuzzleNumber">{getFormattedDate(puzzleNumber)}: Puzzle #{puzzleNumber}</div>
            </div>
            <div className="headerButtons">
                <div className="headerButton" onClick={() => setIsSuccessModalOpen(true)}>
                    <IoStatsChart className="headerIconButton"/>
                </div>
                <div className="headerButton" onClick={() => setIsHelpModalOpen(true)}>?</div>
                <div></div>
                <div className="headerButton" onClick={() => toggleTheme()}>
                    {theme == 'light'
                        ? <IoMoon className="headerIconButton"/>
                        : <IoSunny className="headerIconButton"/>}
                </div>
            </div>
        </div>
    );
}

export default Header;