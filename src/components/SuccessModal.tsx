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
  today: WordData;
  isComplete: boolean;
}

export default function SuccessModal(props: SuccessModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") props.onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [props.onClose]);

  const hintMessages = ["Very impressive!", "You know your stuff!", "You figured it out!", "Nice job!", "Good one!"];
  const hintMessage = props.hintsUsed[props.hintsUsed.length - 1] 
    ? "Tough one today." 
    : props.hintsUsed[props.hintsUsed.length - 2] 
    ? "Just in time." 
    : hintMessages[props.hintsUsed.filter((hintUsed) => hintUsed).length];

  const stats = getStats().hintsStats;
  const maxValue = Math.max(...stats, 1);

  const now = new Date();
  const midnightTonight = new Date();
  midnightTonight.setHours(24, 0, 0, 0); 
  const diffMs = midnightTonight.getTime() - now.getTime();
  const hours = String(Math.floor(diffMs / (1000 * 60 * 60))).padStart(2, "0");
  const minutes = String(Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
  const seconds = String(Math.floor((diffMs % (1000 * 60)) / 1000)).padStart(2, "0");

  const shareText = formatShareText(props.hintsUsed, props.today.number, props.isComplete, now);

  const rootLanguages = formatAsList(props.today.roots.map((root) => root.languageName));
  const shouldShowExplanationSection = props.today.number === localStorage.getItem(MOST_RECENTLY_COMPLETED_PUZZLE_KEY);
  const rootHints = formatAsList(props.today.roots.map((root) => formatRootDefinition(root)));
  const longExplanation = `The word "${props.today.answer}" comes from the ${rootLanguages} for "${props.today.clue}", since ${rootHints}`
  const explanationSection = (
    <div>
      <div className="successModalBoxes">
        <div className="helpModalHeaderText">
          {hintMessage}
        </div>
      </div>

      <div className="successModalBoxes">
        <div className="helpModalText">
          {longExplanation}
        </div>
      </div>
    </div>
  );

  const [isClosing, setIsClosing] = useState(false);
    
  const handleClose = () => {
      setIsClosing(true);
      setTimeout(() => {
        props.onClose();
      }, 150); 
  };

  const modalClass = isClosing ? "helpModalOverlay modalExit" : "helpModalOverlay modalEnter";

  return (
    <div className={modalClass} onClick={handleClose}>
      <div className="helpModalBox" onClick={(e) => e.stopPropagation()}>
        <div className="closeButton" onClick={handleClose}>&times;</div>

        {shouldShowExplanationSection && explanationSection}

        <div className="successModalBoxes">
          <div className="helpModalHeaderText">Stats</div>
        </div>

        <div className="streakBox">
          <div className="helpModalText">{"Streak: " + getStreak(props.today.number)}</div>
          <div className="helpModalText">{"Best streak: " + getBestStreak()}</div>
        </div>

        <div className="helpModalHeaderText">Hints distribution</div>

        <div className="statsBox">
          {stats.map((value, index) => (
            <div key={index} className="statsRow">
              <span className="statsIndex">{index}</span>
              <div className="statsBar">
                <div className="statsBarBox" style={{ width: `${Math.max((value / maxValue) * 100, 7)}%` }}>
                  {value}
                </div>
              </div>
            </div>
          ))}
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
