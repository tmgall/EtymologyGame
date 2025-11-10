import { useEffect, useState } from "react";
import { WordData } from "../assets/WordList";
import { getBestStreak, getStreak } from "../util/Streak";
import { getStats } from "../util/Stats";
import ShareTextButtonProps from "./Share";
import { MOST_RECENTLY_COMPLETED_PUZZLE_KEY } from "./Puzzle";
import { formatAsList, formatRootDefinition, formatShareText } from "../util/StringFormatting";

export interface SuccessModalProps {
  onClose: () => void;
  hintsUsed: boolean[];
  puzzleConfig: WordData;
  puzzleNumber: string;
  isComplete: boolean;
}

export default function SuccessModal({ onClose, hintsUsed, puzzleConfig, puzzleNumber, isComplete}: SuccessModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const hintMessages = ["Very impressive!", "You figured it out!", "Good one!", "Tough one today."];
  const numHintsUsed = hintsUsed.filter((hintUsed) => hintUsed).length;
  const hintMessage = hintMessages[numHintsUsed];

  const stats = getStats().hintsStats;
  const maxValue = Math.max(...stats, 1);

  const now = new Date();
  const midnightTonight = new Date();
  midnightTonight.setHours(24, 0, 0, 0); 
  const diffMs = midnightTonight.getTime() - now.getTime();
  const hours = String(Math.floor(diffMs / (1000 * 60 * 60))).padStart(2, "0");
  const minutes = String(Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
  const seconds = String(Math.floor((diffMs % (1000 * 60)) / 1000)).padStart(2, "0");

  const shareText = formatShareText(hintsUsed, puzzleNumber, isComplete, now);

  const languagesOfOriginList = puzzleConfig.roots
  .map((root) => root.languageName)
  .reduce<string[]>((acc, item) => {
      if (!acc.includes(item)) acc.push(item);
      return acc;
  }, []);
  const rootLanguages = formatAsList(languagesOfOriginList);
  const shouldShowExplanationSection = puzzleNumber === localStorage.getItem(MOST_RECENTLY_COMPLETED_PUZZLE_KEY);
  const rootHints = formatAsList(puzzleConfig.roots.map((root) => formatRootDefinition(root)));
  const longExplanation = `The word "${puzzleConfig.answer}" comes from the ${rootLanguages} for "${puzzleConfig.clue}", since ${rootHints}`

  const [isClosing, setIsClosing] = useState(false);
    
  const handleClose = () => {
      setIsClosing(true);
      setTimeout(() => { onClose(); }, 150); 
  };

  const modalClass = isClosing ? "helpModalOverlay modalExit" : "helpModalOverlay modalEnter";

  return (
    <div className={modalClass} onClick={handleClose}>
      <div className="helpModalBox" onClick={(e) => e.stopPropagation()}>
        <div className="closeButton" onClick={handleClose}>&times;</div>

        {shouldShowExplanationSection && (
          <div className="successModalBoxes">
            <div className="helpModalHeaderText">
              {hintMessage}
            </div>
          </div>
        )}
        {shouldShowExplanationSection && (
          <div className="successModalBoxes">
            <div className="helpModalText">
              {longExplanation}
            </div>
          </div>
        )}
        {puzzleConfig.authorsNote && shouldShowExplanationSection && (
          <div className="successModalBoxes">
            <div className="helpModalHeaderText">
              {"Author's Note"}
            </div>
          </div>
        )}
        {puzzleConfig.authorsNote && shouldShowExplanationSection && (
          <div className="helpModalText">
            {puzzleConfig.authorsNote}
          </div>
        )}

        <div className="successModalBoxes">
          <div className="helpModalHeaderText">Stats</div>
        </div>

        <div className="streakBox">
          <div className="helpModalText">{"Streak: " + getStreak(puzzleNumber)}</div>
          <div className="helpModalText">{"Best streak: " + getBestStreak()}</div>
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

        <div className="successModalBoxes">
          <div className="helpModalText">{`Next puzzle in: ${hours}:${minutes}:${seconds}`}</div>
        </div>

        <div className="successModalBoxes">
          <ShareTextButtonProps text={shareText}/>
        </div>
      </div>
    </div>
  );
}
