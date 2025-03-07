import { useState } from "react";
import Keyboard from "./Keyboard";
import { WORD_LIST } from "../assets/WordList";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import HelpModal from "./HelpModal";
import SuccessModal from "./SuccessModal";

const MOST_RECENTLY_COMPLETED_PUZZLE_KEY = "last-solved";

const Puzzle = () => {
    const today = WORD_LIST[0];
    const [showOrigin, setShowOrigin] = useState(false);
    const [showRoot1, setShowRoot1] = useState(false);
    const [showRoot2, setShowRoot2] = useState(false);
    const [guess, setGuess] = useState<string[]>(Array(today.answer.length).fill(""));
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const handleKeyPress = (key: string) => {
        const newGuess = [...guess];
        newGuess[selectedIndex] = key;
        setSelectedIndex(Math.min(selectedIndex + 1, today.answer.length - 1));
        setGuess(newGuess);
    };

    const handleBackspace = () => {
        const newGuess = [...guess];
        if (selectedIndex === 0) {
            newGuess[0] = "";
        } else if (guess[selectedIndex] === "") {
            setSelectedIndex(selectedIndex - 1);
            newGuess[selectedIndex - 1] = "";
        } else {
            newGuess[selectedIndex] = "";
        }
        setGuess(newGuess);
    };

    const handleSubmit = () => {
        if (guess.includes("")) {
            return;
        }
        if (guess.join("").toLocaleLowerCase() === today.answer) {
            localStorage.setItem(MOST_RECENTLY_COMPLETED_PUZZLE_KEY, today.answer);
            setSelectedIndex(-1);
            setIsSuccessModalOpen(true);
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        const isComplete = localStorage.getItem(MOST_RECENTLY_COMPLETED_PUZZLE_KEY) === today.answer;
        if (e.ctrlKey || e.altKey || e.metaKey || isComplete) {
            return;
        }
        if (e.key === "ArrowRight") {
            setSelectedIndex(Math.min(today.answer.length - 1, selectedIndex + 1));
        } else if (e.key === "ArrowLeft") {
            setSelectedIndex(Math.max(0, selectedIndex - 1));
        } else if (e.key.match(/^[a-zA-Z]$/)) {
            handleKeyPress(e.key.toUpperCase());
        } else if (e.key === "Backspace") {
            handleBackspace();
        } else if (e.key === "Enter") {
            handleSubmit();
        }
        e.preventDefault();
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex, guess]);
      
    useEffect(() => {
        console.log("jlfkdsj");
        const mostRecentPuzzleFinished = localStorage.getItem(MOST_RECENTLY_COMPLETED_PUZZLE_KEY);
        if (mostRecentPuzzleFinished === null || mostRecentPuzzleFinished !== today.answer) {
            setIsSuccessModalOpen(false);
        } else {
            setSelectedIndex(-1);
            setGuess(today.answer.toUpperCase().split(''));
            setIsSuccessModalOpen(true);
        }
    }, []);
      

    return (
        <>
            <div className="flex flex-col items-center justify-between w-full p-4">
                <Header setIsModalOpen={setIsHelpModalOpen} />
                <p className="font-bold text-2xl text-gray-700 mt-2 self-start max-w-md mb-4">{"literal meaning: " + today.clue}</p>

                <div className="flex w-full max-w-96 gap-2 mb-4">
                    {Array.from({ length: today.answer.length }).map((_, index) => (
                        <button 
                        key={index} 
                        className={selectedIndex == index ? "answerLetterTileSelected" : "answerLetterTile"}
                        onClick={() => {
                            if (localStorage.getItem(MOST_RECENTLY_COMPLETED_PUZZLE_KEY) !== today.answer) {
                                setSelectedIndex(index);
                            }
                        }}
                        >
                            {guess[index]}  
                        </button>
                    ))}
                </div>

                <button
                    className="hintButton"
                    onClick={() => setShowOrigin(!showOrigin)}
                >
                    {showOrigin ? "Language(s) of origin: " + today.rootLanguages : "Hint 1: language(s) of origin"}
                </button>

                <button
                    className="hintButton"
                    onClick={() => setShowRoot1(!showRoot1)}
                >
                    {showRoot1 ? "First root: " + today.firstRoot : "Hint 2: first root"}
                </button>

                <button
                    className="hintButton"
                    onClick={() => setShowRoot2(!showRoot2)}
                >
                    {showRoot2 ? "Second root: " + today.secondRoot : "Hint 3: second root"}
                </button>
                
                <button
                    className="hintButton"
                    onClick={() => {}}
                >
                    {"Reveal answer"}
                </button>

                <Keyboard onKeyPress={handleKeyPress} onBackspace={handleBackspace} onSubmit={handleSubmit}/>

                <footer className="w-full text-center text-gray-600 text-sm mt-4 pb-2">
                    <div className="flex justify-center gap-4">
                    <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                    <Link to="/terms-of-service" className="hover:underline">Terms of Service</Link>
                    <Link to="/contact" className="hover:underline">Contact</Link>
                    </div>
                </footer>
                {isHelpModalOpen && <HelpModal onClose={() => setIsHelpModalOpen(false)} />}
                {isSuccessModalOpen && <SuccessModal onClose={() => setIsSuccessModalOpen(false)} />}
            </div>
        </>
    );
};

export default Puzzle;
