import { useState, useRef } from "react";
import Keyboard from "./Keyboard";
import { WORD_LIST } from "../assets/WordList";
import { useEffect } from "react";
import Header from "./Header";
import HelpModal from "./HelpModal";
import SuccessModal from "./SuccessModal";
import { updateStreak } from "../util/Streak";
import { updateStats } from "../util/Stats";
import { formatAsList, formatShortExplanation } from "../util/StringFormatting";
import { evaluateWordSimilarity, SIMILARITY_THRESHOLD } from "../util/Evaluation";
import SimilarityModal from "./SimilarityModal";

export const MOST_RECENTLY_COMPLETED_PUZZLE_KEY = "last-solved";
export const LAST_HINTS = "last-hints";

export interface PuzzleProps {
    puzzleNumber: number;
}

export interface HintsUsed {
    origin: string;
    extra: string;
    reveal: string;
}

const Puzzle = ({ puzzleNumber }: PuzzleProps) => {
    const puzzleConfig = WORD_LIST[puzzleNumber - 1];
    const [showOrigin, setShowOrigin] = useState(false);
    const [showExtraHint, setShowExtraHint] = useState<boolean>(false);
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
        return [isOriginShown, isExtraHintShown, isRevealShown];
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
    const hintsUsed = localStorage.getItem(LAST_HINTS) === null ? null : JSON.parse(localStorage.getItem(LAST_HINTS) || "") as HintsUsed;
    const isOriginShown = hintsUsed === null ? false : hintsUsed.origin === puzzleNumber.toString();
    const isExtraHintShown = hintsUsed === null ? false : hintsUsed.extra === puzzleNumber.toString();
    const isRevealShown = hintsUsed === null ? false : hintsUsed.reveal === puzzleNumber.toString();

    useEffect(() => {
        if (localStorage.getItem(MOST_RECENTLY_COMPLETED_PUZZLE_KEY) === null) {
            setIsHelpModalOpen(true);
        }
        if (isComplete) handleRevealAnswer();
        if (isOriginShown) setShowOrigin(true);
        if (isExtraHintShown) setShowExtraHint(true);
        if (isRevealShown) setShowRevealAnswer(true);
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
        : (showOrigin && showExtraHint)
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

                <div className="clueSection">
                    <div className="dictionaryEntry">
                        <div className="wordEntry">
                            <div className="userInput" ref={ref}>
                                {guess.join("")}
                                {isComplete ? "" : showCursor ? "|" : "\u00A0"}
                            </div>
                        </div>
                        
                        <div className="partOfSpeechLine">
                            <span className="partOfSpeech">{puzzleConfig.partOfSpeech}, {puzzleConfig.answer.length} letters</span>
                        </div>
                        
                        <div className="etymologyContent">
                            <div className="hintLabel">literally means:</div>
                            <div className="etymologyValue">"{puzzleConfig.clue}"</div>
                        </div>
                        
                        <div className="etymologyContent">
                            <div className="definitionLabel">and we know it as meaing</div>
                            <div className="definitionValue">{puzzleConfig.definition}</div>
                        </div>
                    </div>
                </div>

                <div style={{ flex: 1 }}></div>

                <div className="hintsRow">
                    <div
                        className={"hintButtonBase " + (showOrigin ? "hintButtonRevealed" : "hintButton")}
                        onClick={() => { 
                            if (!showOrigin) {
                                setShowOrigin(true)
                                if (!isComplete) {
                                    const newHintsUsed: HintsUsed = hintsUsed === null ? {
                                        origin: puzzleNumber.toString(),
                                        extra: "0",
                                        reveal: "0",
                                    }: hintsUsed;
                                    newHintsUsed.origin = puzzleNumber.toString();
                                    localStorage.setItem(LAST_HINTS, JSON.stringify(newHintsUsed));
                                }
                            }
                        }}
                    >
                        {showOrigin ? formatAsList(languagesOfOriginList) : "language(s) of origin"}
                    </div>
                    <div
                        className={"hintButtonBase " + (showExtraHint ? "hintButtonRevealed" : "hintButton")}
                        onClick={() => { 
                            if (!showExtraHint) {
                                setShowExtraHint(true)
                                if (!isComplete) {
                                    const newHintsUsed: HintsUsed = hintsUsed === null ? {
                                        origin: "0",
                                        extra: puzzleNumber.toString(),
                                        reveal: "0",
                                    }: hintsUsed;
                                    newHintsUsed.extra = puzzleNumber.toString();
                                    localStorage.setItem(LAST_HINTS, JSON.stringify(newHintsUsed));
                                }
                            }
                        }}
                    >
                        {showExtraHint ? puzzleConfig.extraHint : "extra hint"}
                    </div>
                </div>

                <div
                    className={revealButtonClass}
                    onClick={() => { 
                        if (showOrigin && showExtraHint) {
                            setShowRevealAnswer(true);
                            if (!isComplete) {
                                updateStreak(true, puzzleNumber.toString());
                                updateStats(3);
                                const newHintsUsed: HintsUsed = {
                                    origin: puzzleNumber.toString(),
                                    extra: puzzleNumber.toString(),
                                    reveal: puzzleNumber.toString(),
                                };
                                localStorage.setItem(LAST_HINTS, JSON.stringify(newHintsUsed));
                                handleRevealAnswer();
                            }
                        }
                    }}
                >
                    {showRevealAnswer ? formatShortExplanation(puzzleConfig) : "reveal answer"}
                </div>

                <Keyboard onKeyPress={handleKeyPress} onBackspace={handleBackspace} onSubmit={handleSubmit}/>

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
