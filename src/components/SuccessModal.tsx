import { useEffect } from "react";
import { WordData } from "../assets/WordList";
import { getBestStreak, getStreak } from "../util/Streak";
import { getStats } from "../util/Stats";
import ShareTextButtonProps from "./Share";

export interface SuccessModalProps {
  onClose: () => void;
  hintsUsed: number;
  today: WordData;
}

export default function SuccessModal(props: SuccessModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") props.onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [props.onClose]);

  const hintMessages = ["Very impressive!", "You know your stuff!", "You figured it out!", "Nice job!", "Tough one today."];

  const stats = getStats().hintsStats;
  const maxValue = Math.max(...stats, 1);

  const now = new Date();
  const midnightTonight = new Date();
  midnightTonight.setHours(24, 0, 0, 0); 
  const diffMs = midnightTonight.getTime() - now.getTime();
  const hours = String(Math.floor(diffMs / (1000 * 60 * 60))).padStart(2, "0");
  const minutes = String(Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
  const seconds = String(Math.floor((diffMs % (1000 * 60)) / 1000)).padStart(2, "0");

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0" onClick={props.onClose} />

      <div className="helpModal">
        <div className="helpModalText">
          {hintMessages[props.hintsUsed]}
        </div>

        <div className="helpModalText">
          {props.today.longExplanation}
        </div>

        <div className="helpModalText">
          Stats
        </div>

        <div className="helpModalText">
          {"Streak: " + getStreak(props.today.number)}
        </div>

        <div className="helpModalText">
          {"Best streak: " + getBestStreak()}
        </div>

        <div className="helpModalText">
          Hints distribution
        </div>

        <div className="w-full max-w-md space-y-2">
          {stats.map((value, index) => (
            <div key={index} className="flex items-center">
              <span className="w-2 text-right text-sm font-bold text-sky-900">{index}</span>
              <div className="ml-2 flex-1 bg-sky-100 overflow-hidden">
                <div
                  className="bg-sky-900 text-sky-100 text-xs font-bold h-6 flex items-center justify-end pr-2" 
                  style={{ width: `${Math.max((value / maxValue) * 100, 9)}%` }}
                >
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="helpModalText">
          {`Next puzzle in: ${hours}:${minutes}:${seconds}`}
        </div>
        <div className="w-full flex items-center justify-center">
          <ShareTextButtonProps text="testing"/>
        </div>
      </div>
    </div>
  );
}
