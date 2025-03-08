import { useState } from "react";
import Keyboard from "./Keyboard";
import { WORD_LIST } from "../assets/WordList";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import HelpModal from "./HelpModal";
import SuccessModal from "./SuccessModal";
import { getPuzzleNumber } from "../util/Date";

const MOST_RECENTLY_COMPLETED_PUZZLE_KEY = "last-solved";

const Puzzle = () => {
    const today = WORD_LIST[getPuzzleNumber() - 1];
    const [showOrigin, setShowOrigin] = useState(false);
    const [showRoot1, setShowRoot1] = useState(false);
    const [showRoot2, setShowRoot2] = useState(false);
    const [showRevealAnswer, setShowRevealAnswer] = useState(false);
    const [guess, setGuess] = useState<string[]>(Array(today.answer.length).fill(""));
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const handleKeyPress = (key: string) => {
        if (isComplete) return;
        const newGuess = [...guess];
        newGuess[selectedIndex] = key;
        setSelectedIndex(Math.min(selectedIndex + 1, today.answer.length - 1));
        setGuess(newGuess);
    };

    const handleBackspace = () => {
        if (isComplete) return;
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
        if (isComplete) return;
        if (guess.includes("")) {
            return;
        }
        if (guess.join("").toLocaleLowerCase() === today.answer) {
            handleRevealAnswer();
        }
    };

    const isComplete = localStorage.getItem(MOST_RECENTLY_COMPLETED_PUZZLE_KEY) === today.answer;

    const handleKeyDown = (e: KeyboardEvent) => {
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

    const handleRevealAnswer = () => {
        localStorage.setItem(MOST_RECENTLY_COMPLETED_PUZZLE_KEY, today.answer);
        setSelectedIndex(-1);
        setGuess(today.answer.toUpperCase().split(''));
        setIsSuccessModalOpen(true);
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex, guess]);
      
    useEffect(() => {
        if (isComplete) {
            handleRevealAnswer();
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
                <hr className="divider" />

                <div className="promptText">
                    {"the literal meaning of the " + today.answer.length + "-letter word"}
                </div>

                <div className="userInput">
                    {"\""}
                    {guess.join("")}
                    {isComplete ? "" : showCursor ? "|" : "\u00A0"}
                    {"\""}
                </div>

                <div className="clue">
                    is "{<span className="font-bold">{today.clue}</span>}"
                </div>

                <button
                    className={showOrigin ? "hintButtonRevealed" : "hintButton"}
                    onClick={() => setShowOrigin(true)}
                >
                    {showOrigin ? "Comes from " + today.rootLanguages : "Reveal language(s) of origin"}
                </button>

                <button
                    className={showRoot1 ? "hintButtonRevealed" : showOrigin ? "hintButton" : "hintButtonDisabled"}
                    onClick={() => { if (showOrigin) setShowRoot1(true)}}
                >
                    {showRoot1 ? "First root: " + today.firstRoot : "Reveal first root"}
                </button>

                <button
                    className={showRoot2 ? "hintButtonRevealed" : showOrigin && showRoot1 ? "hintButton" : "hintButtonDisabled"}
                    onClick={() => { if (showOrigin && showRoot1) setShowRoot2(true)}}
                >
                    {showRoot2 ? "Second root: " + today.secondRoot : "Reveal second root"}
                </button>
                
                <button
                    className={showRevealAnswer ? "hintButtonRevealed" : showOrigin && showRoot1 && showRoot2 ? "hintButton" : "hintButtonDisabled"}
                    onClick={() => { if (showOrigin && showRoot1 && showRoot2) 
                        setShowRevealAnswer(true);
                        handleRevealAnswer();
                    }}
                >
                    {showRevealAnswer ? "<answer>" : "Reveal answer"}
                </button>

                <Keyboard onKeyPress={handleKeyPress} onBackspace={handleBackspace} onSubmit={handleSubmit}/>

                <footer className="footer">
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
