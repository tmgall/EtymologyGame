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
        const mostRecentPuzzleFinished = localStorage.getItem(MOST_RECENTLY_COMPLETED_PUZZLE_KEY);
        if (mostRecentPuzzleFinished === null || mostRecentPuzzleFinished !== today.answer) {
            setIsSuccessModalOpen(false);
        } else {
            setSelectedIndex(-1);
            setGuess(today.answer.toUpperCase().split(''));
            setIsSuccessModalOpen(true);
        }
    }, []);

    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
      const interval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 500);
      return () => clearInterval(interval);
    }, []);
      

    return (
        <>
            <div className="flex flex-col items-center justify-between w-full p-4">
                <Header setIsModalOpen={setIsHelpModalOpen} />
                <hr className="w-full border-t border-sky-200" />

                <div className="text-xl mt-2 self-start max-w-md font-mono text-sky-200">
                    {"the literal meaning of the " + today.answer.length + "-letter word"}
                </div>

                <div className="text-2xl mt-2 max-w-md font-mono text-sky-200">
                    {"\""}
                    {guess.join("")}
                    {showCursor ? "|" : "\u00A0"}
                    {"\""}
                </div>


                <div className="text-xl self-start mt-2 font-mono w-fit text-sky-200">
                    is "{<span className="font-bold">{today.clue}</span>}"
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

                <footer className="w-full text-center text-sky-200 text-sm mt-4 pb-2">
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
