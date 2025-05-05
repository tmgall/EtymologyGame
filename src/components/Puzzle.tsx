import { useState, useRef } from "react";
import Keyboard from "./Keyboard";
import { WORD_LIST } from "../assets/WordList";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import HelpModal from "./HelpModal";
import SuccessModal from "./SuccessModal";
import { updateStreak } from "../util/Streak";
import { updateStats } from "../util/Stats";
import HintButton from "./HintButton";
import { formatAsList, formatRootDefinition, formatShortExplanation } from "../util/StringFormatting";
import { evaluateWordSimilarity, SIMILARITY_THRESHOLD } from "../util/Evaluation";
import SimilarityModal from "./SimilarityModal";

export const MOST_RECENTLY_COMPLETED_PUZZLE_KEY = "last-solved";
const LAST_ORIGIN_HINT_KEY = "last-origin-hint";
export const LAST_ROOT_HINTS_KEY = "last-root-hints"
const LAST_REVEAL_HINT_KEY = "last-reveal-hint";
const LAST_DEFINITION_KEY = "last-definition-hint";

export interface PuzzleProps {
    puzzleNumber: number;
}

const Puzzle = ({ puzzleNumber }: PuzzleProps) => {
    const puzzleConfig = WORD_LIST[puzzleNumber - 1];
    const [showOrigin, setShowOrigin] = useState(false);
    const [aRootIsShown, setARootIsShown] = useState(false);
    const [showRoots, setShowRoots] = useState<boolean[]>(Array(puzzleConfig.roots.length).fill(false));
    const [showDefinition, setShowDefinition] = useState(false);
    const [showRevealAnswer, setShowRevealAnswer] = useState(false);
    const [guess, setGuess] = useState<string[]>(Array(puzzleConfig.answer.length).fill(""));
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isSimilarityModalOpen, setIsSimilarityModalOpen] = useState(false);
    const [similarity, setSimilarity] = useState(0);

    const ref = useRef<HTMLDivElement>(null);

    const handleKeyPress = (key: string) => {
        if (isComplete) return;
        const newGuess = [...guess];
        newGuess[selectedIndex] = key;
        setSelectedIndex(Math.min(selectedIndex + 1, puzzleConfig.answer.length - 1));
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
    
    const getHintsUsed = () => {
        const hintsUsed = [];
        if (isOriginShown) {
            hintsUsed.push(true);
        } else { hintsUsed.push(false); }
        showRoots.forEach((showRoot) => {
            if (showRoot) {
                hintsUsed.push(true);
            } else { hintsUsed.push(false); }
        })
        if (isDefinitionShown) {
            hintsUsed.push(true);
        } else { hintsUsed.push(false); }
        if (isRevealShown) {
            hintsUsed.push(true);
        } else { hintsUsed.push(false); }
        return hintsUsed;
    }

    const handleSubmit = () => {
        if (isComplete) return;
        const submission = guess.join("").toLocaleLowerCase();
        const actualAnswer = puzzleConfig.answer.toLocaleLowerCase();
        if (submission === actualAnswer) {
            updateStreak(false, puzzleNumber.toString());
            updateStats(getHintsUsed().filter((hintUsed) => hintUsed).length);
            handleRevealAnswer();
        } else {
            if (ref.current) {
                ref.current.classList.add('shake');
          
                const handleAnimationEnd = () => {
                  ref.current?.classList.remove('shake');
                  ref.current?.removeEventListener('animationend', handleAnimationEnd);
                };
          
                ref.current.addEventListener('animationend', handleAnimationEnd);
            }
            const similarity = evaluateWordSimilarity(submission, actualAnswer);
            setSimilarity(similarity);
            if (similarity <= SIMILARITY_THRESHOLD) {
                setIsSimilarityModalOpen(true);
            }
        }
    };

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
        localStorage.setItem(MOST_RECENTLY_COMPLETED_PUZZLE_KEY, puzzleNumber.toString());
        setSelectedIndex(-1);
        setGuess(puzzleConfig.answer.toUpperCase().split(''));
        setIsSuccessModalOpen(true);
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex, guess]);

    const isComplete = localStorage.getItem(MOST_RECENTLY_COMPLETED_PUZZLE_KEY) === puzzleNumber.toString();
    const isOriginShown = localStorage.getItem(LAST_ORIGIN_HINT_KEY) === puzzleNumber.toString();
    const isDefinitionShown = localStorage.getItem(LAST_DEFINITION_KEY) === puzzleNumber.toString();
    const isRevealShown = localStorage.getItem(LAST_REVEAL_HINT_KEY) === puzzleNumber.toString();

    useEffect(() => {
        if (localStorage.getItem(MOST_RECENTLY_COMPLETED_PUZZLE_KEY) === null && localStorage.getItem(LAST_ORIGIN_HINT_KEY) === null) {
            setIsHelpModalOpen(true);
        }
        if (isComplete) {
            handleRevealAnswer();
        }
        if (isOriginShown) {
            setShowOrigin(true);
        }
        const lastRootsShown = localStorage.getItem(LAST_ROOT_HINTS_KEY);
        const rootsShown: boolean[] = Array(puzzleConfig.roots.length).fill(false);
        if (lastRootsShown) {
            lastRootsShown.split(",").forEach((lastRootShown, index) => {
                if (lastRootShown === puzzleNumber.toString()) {
                    rootsShown[index] = true;
                    setARootIsShown(true);
                }
            })
        }
        setShowRoots(rootsShown);
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
      }, 700);
      return () => clearInterval(interval);
    }, []);

    const revealButtonClass = "hintButtonBase " + (showRevealAnswer 
        ? "hintButtonRevealed" 
        : showOrigin && aRootIsShown && showDefinition 
        ? "hintButton" : "hintButtonDisabled");

    const languagesOfOriginList = puzzleConfig.roots
        .map((root) => root.languageName)
        .reduce<string[]>((acc, item) => {
            if (!acc.includes(item)) acc.push(item);
            return acc;
        }, []);
    return (
        <>
            <div className="puzzle">
                <Header 
                    setIsHelpModalOpen={setIsHelpModalOpen} 
                    setIsSuccessModalOpen={setIsSuccessModalOpen} 
                    puzzleNumber={puzzleNumber.toString()}
                />
                <hr className="divider" />

                <div className="promptText">
                    {"the literal root meaning of the " + puzzleConfig.answer.length + "-letter word"}
                </div>

                <div className="userInput" ref={ref}>
                    {"\""}
                    {guess.join("")}
                    {isComplete ? "" : showCursor ? "|" : "\u00A0"}
                    {"\""}
                </div>

                <div className="clue">
                    <span>is "<span style={{ fontWeight: 700 }}>{puzzleConfig.clue}</span>"</span>
                </div>

                <HintButton 
                    puzzleNumber={puzzleNumber.toString()} 
                    hint={formatAsList(languagesOfOriginList)} 
                    hintText={"Reveal language(s) of origin"}
                    storageKey={LAST_ORIGIN_HINT_KEY} 
                    puzzleIsComplete={isComplete} 
                    revealed={showOrigin} 
                    disabled={false} 
                    setShowHint={() => setShowOrigin(true)} 
                />

                <div className="buttonRow">
                    {puzzleConfig.roots.map((root, index) =>
                        <HintButton 
                            key={index}
                            puzzleNumber={puzzleNumber.toString()}
                            hint={formatRootDefinition(root)} 
                            hintText={`Reveal \"${root.english}\"`}
                            storageKey={LAST_ROOT_HINTS_KEY}
                            puzzleIsComplete={isComplete} 
                            revealed={showRoots[index]} 
                            disabled={!showOrigin} 
                            setShowHint={() => {
                                setARootIsShown(true);
                                setShowRoots(showRoots.map((rootShown, i) => i === index ? true : rootShown))
                            }}
                            isRootHintButton={true}
                            rootNumber={index}                    
                        />
                    )}
                </div>

                <HintButton 
                    puzzleNumber={puzzleNumber.toString()} 
                    hint={puzzleConfig.definition} 
                    hintText={"Reveal English definition hint"} 
                    storageKey={LAST_DEFINITION_KEY} 
                    puzzleIsComplete={isComplete} 
                    revealed={showDefinition} 
                    disabled={!aRootIsShown} 
                    setShowHint={() => setShowDefinition(true)} 
                />

                <div
                    className={revealButtonClass}
                    onClick={() => { 
                        if (showOrigin && aRootIsShown && showDefinition) {
                            setShowRevealAnswer(true);
                            if (!isComplete) {
                                updateStreak(true, puzzleNumber.toString());
                                updateStats(5);
                                localStorage.setItem(LAST_REVEAL_HINT_KEY, puzzleNumber.toString());
                                handleRevealAnswer();
                            }
                        }
                    }}
                >
                    {showRevealAnswer ? formatShortExplanation(puzzleConfig) : "Reveal answer"}
                </div>

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
                        hintsUsed={getHintsUsed()}
                        puzzleConfig={puzzleConfig}
                        puzzleNumber={puzzleNumber.toString()}
                        isComplete={isComplete}
                />}
                {isSimilarityModalOpen && <SimilarityModal 
                    onClose={() => setIsSimilarityModalOpen(false)}
                    similarity={similarity}
                />}
            </div>
        </>
    );
};

export default Puzzle;
