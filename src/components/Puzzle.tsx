import { useState } from "react";
import Keyboard from "./Keyboard";
import { WORD_LIST } from "../assets/WordList";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import HelpModal from "./HelpModal";
import SuccessModal from "./SuccessModal";
import { getPuzzleNumber } from "../util/Date";
import { updateStreak } from "../util/Streak";
import { updateStats } from "../util/Stats";

export const MOST_RECENTLY_COMPLETED_PUZZLE_KEY = "last-solved";
const LAST_ORIGIN_HINT_KEY = "last-origin-hint";
const LAST_FIRST_ROOT_HINT_KEY = "last-first-root-hint";
const LAST_SECOND_ROOT_HINT_KEY = "last-second-root-hint";
const LAST_REVEAL_HINT_KEY = "last-reveal-hint";
const LAST_DEFINITION_KEY = "last-definition-hint";

const Puzzle = () => {
    const today = WORD_LIST[getPuzzleNumber() - 1];
    const [showOrigin, setShowOrigin] = useState(false);
    const [showRoot1, setShowRoot1] = useState(false);
    const [showRoot2, setShowRoot2] = useState(false);
    const [showDefinition, setShowDefinition] = useState(false);
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
            updateStreak(false, today.number);
            updateStats((isOriginShown ? 1 : 0) + (isFirstRootShown ? 1 : 0) + (isSecondRootShown ? 1 : 0) + (isRevealShown ? 1 : 0));
            handleRevealAnswer();
        }
    };

    const isComplete = localStorage.getItem(MOST_RECENTLY_COMPLETED_PUZZLE_KEY) === today.number;
    const isOriginShown = localStorage.getItem(LAST_ORIGIN_HINT_KEY) === today.number;
    const isFirstRootShown = localStorage.getItem(LAST_FIRST_ROOT_HINT_KEY) === today.number;
    const isSecondRootShown = localStorage.getItem(LAST_SECOND_ROOT_HINT_KEY) === today.number;
    const isDefinitionShown = localStorage.getItem(LAST_DEFINITION_KEY) === today.number;
    const isRevealShown = localStorage.getItem(LAST_REVEAL_HINT_KEY) === today.number;

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.ctrlKey || e.altKey || e.metaKey || isComplete) {
            return;
        }
        if (e.key.match(/^[a-zA-Z]$/)) {
            handleKeyPress(e.key.toUpperCase());
        } else if (e.key === "Backspace") {
            handleBackspace();
        } else if (e.key === "Enter") {
            handleSubmit();
        }
        e.preventDefault();
    };

    const handleRevealAnswer = () => {
        localStorage.setItem(MOST_RECENTLY_COMPLETED_PUZZLE_KEY, today.number);
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
        if (isOriginShown) {
            setShowOrigin(true);
        }
        if (isFirstRootShown) {
            setShowRoot1(true);
        }
        if (isSecondRootShown) {
            setShowRoot2(true);
        }
        if (isDefinitionShown) {
            setShowDefinition(true);
        }
        if (isRevealShown) {
            setShowRevealAnswer(true);
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
                    {"the literal root meaning of the " + today.answer.length + "-letter word"}
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
                    onClick={() => {
                        if (!isComplete) {
                            localStorage.setItem(LAST_ORIGIN_HINT_KEY, today.number); 
                        }
                        setShowOrigin(true);
                    }}
                >
                    {showOrigin ? "origins in " + today.rootLanguages : "Reveal language(s) of origin"}
                </button>

                <button
                    className={showRoot1 ? "hintButtonRevealed" : showOrigin ? "hintButton" : "hintButtonDisabled"}
                    onClick={() => { 
                        if (showOrigin) {
                            setShowRoot1(true);
                        }
                        if (!isComplete) {
                            localStorage.setItem(LAST_FIRST_ROOT_HINT_KEY, today.number);
                        }
                    }}
                >
                    {showRoot1 ? today.firstRoot : "Reveal first root"}
                </button>

                <button
                    className={showRoot2 ? "hintButtonRevealed" : showOrigin && showRoot1 ? "hintButton" : "hintButtonDisabled"}
                    onClick={() => { 
                        if (showOrigin && showRoot1) {
                            setShowRoot2(true)
                        }
                        if (!isComplete) {
                            localStorage.setItem(LAST_SECOND_ROOT_HINT_KEY, today.number);
                        }
                    }}
                >
                    {showRoot2 ? today.secondRoot : "Reveal second root"}
                </button>
                
                <button
                    className={showDefinition ? "hintButtonRevealed" : showOrigin && showRoot1 && showRoot2 ? "hintButton" : "hintButtonDisabled"}
                    onClick={() => { 
                        if (showOrigin && showRoot1 && showRoot2) {
                            setShowDefinition(true)
                        }
                        if (!isComplete) {
                            localStorage.setItem(LAST_DEFINITION_KEY, today.number);
                        }
                    }}
                >
                    {showDefinition ? today.definition : "Reveal English definition hint"}
                </button>

                <button
                    className={showRevealAnswer ? "hintButtonRevealed" : showOrigin && showRoot1 && showRoot2 && showDefinition ? "hintButton" : "hintButtonDisabled"}
                    onClick={() => { 
                        if (showOrigin && showRoot1 && showRoot2 && showDefinition) {
                            setShowRevealAnswer(true);
                        }
                        if (!isComplete) {
                            updateStreak(true, today.number);
                            updateStats(5);
                            localStorage.setItem(LAST_REVEAL_HINT_KEY, today.number);
                            handleRevealAnswer();
                        }
                    }}
                >
                    {showRevealAnswer ? today.shortExplanation : "Reveal answer"}
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
                {isSuccessModalOpen && 
                    <SuccessModal 
                        onClose={() => setIsSuccessModalOpen(false)} 
                        hintsUsed={(isOriginShown ? 1 : 0) + (isFirstRootShown ? 1 : 0) + (isSecondRootShown ? 1 : 0) + (isRevealShown ? 1 : 0)}
                        today={today}
                    />}
            </div>
        </>
    );
};

export default Puzzle;
