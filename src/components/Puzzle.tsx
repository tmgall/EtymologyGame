import { useState, useRef } from "react";
import Keyboard from "./Keyboard";
import { WORD_LIST } from "../assets/WordList";
import { useEffect } from "react";
import Header from "./Header";
import HelpModal from "./HelpModal";
import SuccessModal from "./SuccessModal";
import { formatAsList, formatShortExplanation } from "../util/StringFormatting";
import { evaluateWordSimilarity, SIMILARITY_THRESHOLD } from "../util/Evaluation";
import SimilarityModal from "./SimilarityModal";
import { blankPuzzleData, getPuzzle, getPuzzleCount, markPuzzleCompleted, savePuzzle, updatePuzzleField } from '../util/db.ts';
import { resetStreak, getBestStreak, incrementStreak, getStreak } from "../util/Streak.tsx";

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
    const [puzzleCompleted, setPuzzleCompleted] = useState(false);
    const [guess, setGuess] = useState<string[]>(Array(puzzleConfig.answer.length).fill(""));
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isSimilarityModalOpen, setIsSimilarityModalOpen] = useState(false);
    const [similarity, setSimilarity] = useState(0);

    const ref = useRef<HTMLDivElement>(null);

    const handleKeyPress = async (key: string) => {
        if (puzzleCompleted) return;
        const newGuess = [...guess];
        newGuess[selectedIndex] = key;
        setSelectedIndex(Math.min(selectedIndex + 1, puzzleConfig.answer.length - 1));
        setGuess(newGuess);
    };

    const handleBackspace = async () => {
        if (puzzleCompleted) return;
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

    const handleSubmit = async () => {
        if (puzzleCompleted) return;
        const submission = guess.join("").toLocaleLowerCase();
        const actualAnswer = puzzleConfig.answer.toLocaleLowerCase();
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
        setSelectedIndex(-1);
        setGuess(puzzleConfig.answer.toUpperCase().split(''));
        setIsSuccessModalOpen(true);
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex, guess]);

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
                                {puzzleCompleted ? "" : showCursor ? "|" : "\u00A0"}
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
                        onClick={async () => { 
                            if (!showOrigin) {
                                setShowOrigin(true)
                                if (!puzzleCompleted) {
                                    await updatePuzzleField(puzzleNumber, 'originUsed', true);
                                }
                            }
                        }}
                    >
                        {showOrigin ? formatAsList(languagesOfOriginList) : "language(s) of origin"}
                    </div>
                    <div
                        className={"hintButtonBase " + (showExtraHint ? "hintButtonRevealed" : "hintButton")}
                        onClick={async () => { 
                            if (!showExtraHint) {
                                setShowExtraHint(true)
                                if (!puzzleCompleted) {
                                    await updatePuzzleField(puzzleNumber, 'extraHintUsed', true);
                                }
                            }
                        }}
                    >
                        {showExtraHint ? puzzleConfig.extraHint : "extra hint"}
                    </div>
                </div>

                <div
                    className={revealButtonClass}
                    onClick={async () => { 
                        if (showOrigin && showExtraHint) {
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
                    {showRevealAnswer ? formatShortExplanation(puzzleConfig) : "reveal answer"}
                </div>

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
