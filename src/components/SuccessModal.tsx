import { useEffect, useState } from "react";
import { WordData } from "../assets/WordList";
import { getBestStreak, getStreak } from "../util/Streak";
import { getStats } from "../util/Stats";
import ShareTextButtonProps from "./Share";
import { formatResultLine, formatShareText } from "../util/StringFormatting";
import { getPuzzleDate, getTodaysPuzzleNumber } from "../util/Date";
import { getPuzzle } from "../util/db";

export interface SuccessModalProps {
  onClose: () => void;
  puzzleConfig: WordData;
  puzzleNumber: number;
}

export default function SuccessModal({ onClose, puzzleConfig, puzzleNumber}: SuccessModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const [hintsUsed, setHintsUsed] = useState<boolean[]>([false, false, false]);
  const [stats, setStats] = useState<number[]>([0, 0, 0, 0]);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  
  useEffect(() => {
    getPuzzle(puzzleNumber).then(data => {
      setHintsUsed(data ? [data.originUsed, data.extraHintUsed, data.puzzleRevealed] : [false, false, false]);
      setIsComplete(data ? data.puzzleCompleted : false);
    });
    getStats().then(stats => {
      setStats(stats.hintsStats);
    });
    getStreak(puzzleNumber).then(streak => {
      setStreak(streak);
    });
    getBestStreak().then(bestStreak => {
      setBestStreak(bestStreak);
    });
  }, [puzzleNumber]);

  const hintMessages = ["Very impressive!", "You figured it out!", "Good one!", "Tough one today."];
  const numHintsUsed = hintsUsed.filter((hintUsed) => hintUsed).length;
  const hintMessage = hintMessages[numHintsUsed];

  const maxValue = Math.max(...stats, 1);

  // Re-render every second so the countdown to the next puzzle ticks.
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const midnightTonight = new Date();
  midnightTonight.setHours(24, 0, 0, 0); 
  const diffMs = midnightTonight.getTime() - now.getTime();
  const hours = String(Math.floor(diffMs / (1000 * 60 * 60))).padStart(2, "0");
  const minutes = String(Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
  const seconds = String(Math.floor((diffMs % (1000 * 60)) / 1000)).padStart(2, "0");

  const shareText = formatShareText(hintsUsed, puzzleNumber.toString(), isComplete, getPuzzleDate(puzzleNumber), streak);
  const shouldShowExplanationSection = isComplete;
  // The countdown only means something on today's puzzle, not when replaying the archive.
  const isTodaysPuzzle = puzzleNumber === getTodaysPuzzleNumber();

  const [isClosing, setIsClosing] = useState(false);
    
  const handleClose = () => {
      setIsClosing(true);
      setTimeout(() => { onClose(); }, 150); 
  };

  const modalClass = (isClosing ? "helpModalOverlay modalExit" : "helpModalOverlay modalEnter") + " successSheetOverlay";

  return (
    <div className={modalClass} onClick={handleClose}>
      <div className="helpModalBox successSheet" role="dialog" aria-modal="true" aria-labelledby="successSheetTitle" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="closeButton" aria-label="Close" onClick={handleClose}>&times;</button>

        {shouldShowExplanationSection && (
          <div className="successHeader">
            <h2 className="successTitle" id="successSheetTitle">{hintMessage}</h2>
            <div className="successResult">{formatResultLine(hintsUsed)}</div>
          </div>
        )}
        {shouldShowExplanationSection && (
          <div className="successExplanation">
            <div className="successExplanationText">
              {puzzleConfig.explanation}
            </div>
            {puzzleConfig.authorsNote && (
              <>
                <div className="successAuthorsNoteHeader">Author's Note</div>
                <div className="successExplanationText">
                  {puzzleConfig.authorsNote}
                </div>
              </>
            )}
          </div>
        )}

        <div className="successSection">
          {shouldShowExplanationSection
            ? <h3 className="successSectionTitle">Stats</h3>
            : <h2 className="successSectionTitle" id="successSheetTitle">Stats</h2>}
          <div className="successStreaks">
            <div>{"Streak: " + streak}</div>
            <div>{"Best streak: " + bestStreak}</div>
          </div>
          <div className="statsBox">
            {stats.map((value, index) => {
              const labels = ["No hints", "One hint", "Two hints", "Gave up"];
              return (
                <div key={index} className="statsRow">
                  <span className="statsIndex">{labels[index]}</span>
                  <div className="statsBar">
                    <div className="statsBarBox" style={{ width: `${Math.max((value / maxValue) * 100, 7)}%` }}>
                      {value}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="successFooter">
          {isTodaysPuzzle && (
            <div className="successCountdown">
              <span className="successCountdownLabel">Next puzzle</span>
              <span className="successCountdownTime">{`${hours}:${minutes}:${seconds}`}</span>
            </div>
          )}
          <ShareTextButtonProps text={shareText}/>
        </div>
      </div>
    </div>
  );
}
