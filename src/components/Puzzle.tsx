import { useState, useRef, CSSProperties } from "react";
import { IoLockClosed } from "react-icons/io5";
import Keyboard from "./Keyboard";
import { WORD_LIST } from "../assets/WordList";
import { useEffect } from "react";
import Header from "./Header";
import HelpModal from "./HelpModal";
import SuccessModal from "./SuccessModal";
import { formatAsList, formatRootDefinition } from "../util/StringFormatting";
import { evaluateWordSimilarity, isGuessableChar, normalizeAnswer, SIMILARITY_THRESHOLD } from "../util/Evaluation";
import SimilarityModal from "./SimilarityModal";
import { blankPuzzleData, getPuzzle, getPuzzleCount, markPuzzleCompleted, savePuzzle, updateFirstHintField, updatePuzzleField, updateSecondHintField } from '../util/db.ts';
import { resetStreak, getBestStreak, incrementStreak, getStreak } from "../util/Streak.tsx";

export interface PuzzleProps {
    puzzleNumber: number;
}

export interface HintsUsed {
    origin: string;
    extra: string;
    reveal: string;
}

const isKeyboardFocusedControl = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return false;
    try {
        return target.matches("button:focus-visible, a:focus-visible");
    } catch {
        return false;
    }
};

const Puzzle = ({ puzzleNumber }: PuzzleProps) => {
    const puzzleConfig = WORD_LIST[puzzleNumber - 1];
    const answerChars = [...puzzleConfig.answer.toUpperCase()];
    const isFixed = answerChars.map((char) => !isGuessableChar(char));
    const editableIndices = answerChars.map((_, index) => index).filter((index) => !isFixed[index]);
    const [showOrigin, setShowOrigin] = useState(false);
    const [showExtraHint, setShowExtraHint] = useState<boolean>(false);
    const [showRevealAnswer, setShowRevealAnswer] = useState(false);
    const [puzzleCompleted, setPuzzleCompleted] = useState(false);
    const [guess, setGuess] = useState<string[]>(() => answerChars.map((char, index) => isFixed[index] ? char : ""));
    const [selectedIndex, setSelectedIndex] = useState<number>(editableIndices[0] ?? 0);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isSimilarityModalOpen, setIsSimilarityModalOpen] = useState(false);
    const [similarity, setSimilarity] = useState(0);

    const ref = useRef<HTMLDivElement>(null);

    // The cursor only ever lands on letter slots; punctuation slots are skipped.
    const nextEditable = (index: number) => editableIndices.find((i) => i > index) ?? -1;
    const previousEditable = (index: number) => [...editableIndices].reverse().find((i) => i < index) ?? -1;

    const handleKeyPress = async (key: string) => {
        if (puzzleCompleted) return;
        const newGuess = [...guess];
        newGuess[selectedIndex] = key;
        const next = nextEditable(selectedIndex);
        if (next !== -1) setSelectedIndex(next);
        setGuess(newGuess);
    };

    const handleBackspace = async () => {
        if (puzzleCompleted) return;
        const newGuess = [...guess];
        if (guess[selectedIndex] !== "") {
            newGuess[selectedIndex] = "";
        } else {
            const previous = previousEditable(selectedIndex);
            if (previous !== -1) {
                setSelectedIndex(previous);
                newGuess[previous] = "";
            }
        }
        setGuess(newGuess);
    };

    const handleSubmit = async () => {
        if (puzzleCompleted) return;
        const submission = normalizeAnswer(guess.join(""));
        const actualAnswer = normalizeAnswer(puzzleConfig.answer);
        if (submission === actualAnswer) {
            setPuzzleCompleted(true);
            await markPuzzleCompleted(puzzleNumber);
            await incrementStreak(puzzleNumber);
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

    const handleKeyDown = async (e: KeyboardEvent) => {
        if (e.ctrlKey || e.altKey || e.metaKey || puzzleCompleted) {
            return;
        }
        // Let Enter/Space activate a button the player tabbed to, rather than submitting.
        if ((e.key === "Enter" || e.key === " ") && isKeyboardFocusedControl(e.target)) {
            return;
        }
        if (e.key.match(/^[a-zA-Z]$/)) {
            handleKeyPress(e.key.toUpperCase());
        } else if (e.key === "Backspace") {
            handleBackspace();
        } else if (e.key === "Enter") {
            handleSubmit();
        } else {
            return;
        }
        e.preventDefault();
    };

    const handleRevealAnswer = () => {
        setSelectedIndex(-1);
        setGuess(answerChars);
        setIsSuccessModalOpen(true);
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex, guess, puzzleCompleted]);

    // runs at puzzle load
    useEffect(() => {
        getPuzzleCount().then((count) => {
            if (count < 1) {
                setIsHelpModalOpen(true);
            }
        })
        getPuzzle(puzzleNumber).then(async (puzzle) => {
            if (puzzle) {
                setShowOrigin(puzzle.originUsed);
                setShowExtraHint(puzzle.extraHintUsed);
                setShowRevealAnswer(puzzle.puzzleRevealed);
                if (puzzle.puzzleCompleted) {
                    setPuzzleCompleted(true);
                    handleRevealAnswer();
                }
            } else {
                const bestStreak = await getBestStreak();
                const streak = await getStreak(puzzleNumber - 1);
                savePuzzle(blankPuzzleData(puzzleNumber, streak, bestStreak));
            }
        });
    }, []);

    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
      const interval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 700);
      return () => clearInterval(interval);
    }, []);

    const canRevealAnswer = showOrigin && showExtraHint;
    const revealButtonClass = "hintButtonBase " + (showRevealAnswer 
        ? "hintButtonRevealed" 
        : canRevealAnswer
        ? "hintButton" : "hintButtonDisabled");
    
    const cursorIndex = guess.findIndex((char) => char === "") === -1 ? guess.length : selectedIndex;
    // Letter slots shrink to fit long answers on narrow screens (one extra slot holds the end cursor).
    const slotStyle = { "--slots": guess.length + 1 } as CSSProperties;

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
                            <div className="userInput" ref={ref} style={slotStyle}>
                                {[...guess, ""].map((char, index) => (
                                    <div key={index} className={index === guess.length ? "cursorSlot" : isFixed[index] ? "letterSlot fixedSlot" : "letterSlot"}>
                                        {char}
                                        {!puzzleCompleted && index === cursorIndex && showCursor && <span className="cursor">|</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="partOfSpeechLine">
                            <span className="partOfSpeech">{puzzleConfig.partOfSpeech}, {editableIndices.length} letters; {formatAsList(languagesOfOriginList)} origin</span>
                        </div>
                        
                        <div className="etymologyContent">
                            <div className="hintLabel">literal meaning</div>
                            <div className="etymologyValue">"{puzzleConfig.clue}"</div>
                        </div>
                    </div>
                </div>

                <div className="hintsRow">
                    <button
                        type="button"
                        className={"hintButtonBase " + (showOrigin ? "hintButtonRevealed" : "hintButton")}
                        onClick={async () => { 
                            if (!showOrigin) {
                                setShowOrigin(true)
                                if (!puzzleCompleted) {
                                    await updateFirstHintField(puzzleNumber, true);
                                }
                            }
                        }}
                    >
                        {showOrigin ? formatRootDefinition(puzzleConfig.roots[0]) : "reveal one root"}
                    </button>
                    <button
                        type="button"
                        className={"hintButtonBase " + (showExtraHint ? "hintButtonRevealed" : "hintButton")}
                        onClick={async () => {
                            if (!showExtraHint) {
                                setShowExtraHint(true)
                                if (!puzzleCompleted) {
                                    await updateSecondHintField(puzzleNumber, true);
                                }
                            }
                        }}
                    >
                        {showExtraHint ? puzzleConfig.definition : "reveal actual meaning"}
                    </button>
                </div>

                <button
                    type="button"
                    className={revealButtonClass}
                    disabled={!canRevealAnswer}
                    onClick={async () => { 
                        if (canRevealAnswer) {
                            setShowRevealAnswer(true);
                            if (!puzzleCompleted) {
                                await updatePuzzleField(puzzleNumber, 'puzzleRevealed', true);
                                markPuzzleCompleted(puzzleNumber);
                                setPuzzleCompleted(true);
                                await resetStreak(puzzleNumber);
                                handleRevealAnswer();
                            }
                        }
                    }}
                >
                    {showRevealAnswer
                        ? formatAsList(puzzleConfig.roots.map((root) => formatRootDefinition(root)))
                        : canRevealAnswer
                        ? "reveal answer"
                        : (
                            <span className="lockedHint">
                                <span className="lockedHintTitle"><IoLockClosed className="lockedHintIcon" aria-hidden="true" /> reveal answer</span>
                                <span className="lockedHintSubtitle">unlocks after both hints</span>
                            </span>
                        )}
                </button>

                <div className="puzzleSpacer" />
                <Keyboard onKeyPress={handleKeyPress} onBackspace={handleBackspace} onSubmit={handleSubmit}/>

                {isHelpModalOpen && <HelpModal onClose={() => setIsHelpModalOpen(false)} />}
                {isSuccessModalOpen && 
                    <SuccessModal
                        onClose={() => setIsSuccessModalOpen(false)} 
                        puzzleConfig={puzzleConfig}
                        puzzleNumber={puzzleNumber}
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
