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
import HintButton from "./HintButton";

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
        if (localStorage.getItem(MOST_RECENTLY_COMPLETED_PUZZLE_KEY) === null) {
            setIsHelpModalOpen(true);
        }
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
            <div className="puzzle">
                <Header setIsHelpModalOpen={setIsHelpModalOpen} setIsSuccessModalOpen={setIsSuccessModalOpen} />
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
                    is "{<span style={{ fontWeight: 700 }}>{today.clue}</span>}"
                </div>

                <HintButton 
                    number={today.number} 
                    hint={today.rootLanguages} 
                    hintText={"Reveal language(s) of origin"} 
                    storageKey={LAST_ORIGIN_HINT_KEY} 
                    puzzleIsComplete={isComplete} 
                    revealed={showOrigin} 
                    disabled={false} 
                    setShowHint={setShowOrigin} 
                />

                <HintButton 
                    number={today.number} 
                    hint={today.firstRoot} 
                    hintText={"Reveal first root"} 
                    storageKey={LAST_FIRST_ROOT_HINT_KEY} 
                    puzzleIsComplete={isComplete} 
                    revealed={showRoot1} 
                    disabled={!showOrigin} 
                    setShowHint={setShowRoot1} 
                />

                <HintButton 
                    number={today.number} 
                    hint={today.secondRoot} 
                    hintText={"Reveal second root"} 
                    storageKey={LAST_SECOND_ROOT_HINT_KEY} 
                    puzzleIsComplete={isComplete} 
                    revealed={showRoot2} 
                    disabled={!showRoot1} 
                    setShowHint={setShowRoot2} 
                />

                <HintButton 
                    number={today.number} 
                    hint={today.definition} 
                    hintText={"Reveal English definition hint"} 
                    storageKey={LAST_DEFINITION_KEY} 
                    puzzleIsComplete={isComplete} 
                    revealed={showDefinition} 
                    disabled={!showRoot2} 
                    setShowHint={setShowDefinition} 
                />

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
                    <div className="footerSpacing">
                        <Link to="/privacy-policy" className="backToHomeButton">Privacy Policy</Link>
                        <Link to="/terms-of-service" className="backToHomeButton">Terms of Service</Link>
                        <Link to="/contact" className="backToHomeButton">Contact</Link>
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
