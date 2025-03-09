import { useEffect } from "react";
import { WordData } from "../assets/WordList";
import { getStreak } from "../util/Streak";

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
        <div className="helpModelText">
          {"Streak: " + getStreak(props.today.number)}
        </div>
      </div>
    </div>
  );
}
