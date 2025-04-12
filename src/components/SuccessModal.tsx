import { useEffect, useState } from "react";
import { WordData } from "../assets/WordList";
import { getBestStreak, getStreak } from "../util/Streak";
import { getStats } from "../util/Stats";
import ShareTextButtonProps from "./Share";
import { MOST_RECENTLY_COMPLETED_PUZZLE_KEY } from "./Puzzle";

export interface SuccessModalProps {
  onClose: () => void;
  hintsUsed: number;
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

  const hintMessages = ["Very impressive!", "You know your stuff!", "You figured it out!", "Nice job!", "Just in time.", "Tough one today."];

  const stats = getStats().hintsStats;
  const maxValue = Math.max(...stats, 1);

  const now = new Date();
  const midnightTonight = new Date();
  midnightTonight.setHours(24, 0, 0, 0); 
  const diffMs = midnightTonight.getTime() - now.getTime();
  const hours = String(Math.floor(diffMs / (1000 * 60 * 60))).padStart(2, "0");
  const minutes = String(Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
  const seconds = String(Math.floor((diffMs % (1000 * 60)) / 1000)).padStart(2, "0");

  const emojis = [
    "\u{1F30D}", 
    "\u{1F30D} \u{0031}\u{FE0F}\u{20E3}", 
    "\u{1F30D} \u{0031}\u{FE0F}\u{20E3} \u{0032}\u{FE0F}\u{20E3}",
    "\u{1F30D} \u{0031}\u{FE0F}\u{20E3} \u{0032}\u{FE0F}\u{20E3} \u{1F4D6}",
    "\u{1F30D} \u{0031}\u{FE0F}\u{20E3} \u{0032}\u{FE0F}\u{20E3} \u{1F4D6} \u{26A1}"
  ];

  const fire = '🔥';
  const dateFormatted = `${now.getMonth() + 1}/${now.getDate()}`;
  const dayLine = `Lexicon ${dateFormatted}: Puzzle #${props.today.number}`
  const noHints = `I solved it without any hints!\n`;
  const someHints = `I solved it with ${props.hintsUsed} hint${props.hintsUsed == 1 ? "" : "s"}: ${emojis[props.hintsUsed]}\n`;
  const hintsText = props.hintsUsed === 0 ? noHints : props.hintsUsed === 5 ? "" : someHints;
  const streak = getStreak(props.today.number); 
  const noStreak = 'I had to reveal it today — see if you can beat me!'
  const someStreak = `I'm on a streak of ${fire}${streak}${fire}`
  const link = `https://lexicon-pi.vercel.app/`;
  const shareText: string = !props.isComplete ? `Try out Lexicon!\n${link}` : `${dayLine}\n\n${hintsText}${streak === 0 ? noStreak : someStreak}\n${link}`;

  const shouldShowExplanationSection = props.today.number === localStorage.getItem(MOST_RECENTLY_COMPLETED_PUZZLE_KEY);
  const longExplanation = `The word "${props.today.answer}" comes from the ${props.today.rootLanguages} for "${props.today.clue}", since ${props.today.firstRoot} and ${props.today.secondRoot}.`
  const explanationSection = (
    <div>
      <div className="successModalBoxes">
        <div className="helpModalHeaderText">
          {hintMessages[props.hintsUsed]}
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
        <div className="closeButton" onClick={handleClose}>
          &times;
        </div>

        {shouldShowExplanationSection && explanationSection}

        <div className="successModalBoxes">
          <div className="helpModalHeaderText">
            Stats
          </div>
        </div>

        <div className="streakBox">
          <div className="helpModalText">
            {"Streak: " + getStreak(props.today.number)}
          </div>
          <div className="helpModalText">
            {"Best streak: " + getBestStreak()}
          </div>
        </div>

        <div className="helpModalHeaderText">
          Hints distribution
        </div>

        <div className="statsBox">
          {stats.map((value, index) => (
            <div key={index} className="statsRow">
              <span className="statsIndex">{index}</span>
              <div className="statsBar">
                <div
                  className="statsBarBox" 
                  style={{ width: `${Math.max((value / maxValue) * 100, 7)}%` }}
                >
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="successModalBoxes">
          <div className="helpModalText">
            {`Next puzzle in: ${hours}:${minutes}:${seconds}`}
          </div>
        </div>

        <div className="successModalBoxes">
          <ShareTextButtonProps text={shareText}/>
        </div>
      </div>
    </div>
  );
}
