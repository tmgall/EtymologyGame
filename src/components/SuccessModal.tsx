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

  const emojis = [
    "\u{1F30D}", 
    "\u{1F30D} \u{0031}\u{FE0F}\u{20E3}", 
    "\u{1F30D} \u{0031}\u{FE0F}\u{20E3} \u{0032}\u{FE0F}\u{20E3}",
    "\u{1F30D} \u{0031}\u{FE0F}\u{20E3} \u{0032}\u{FE0F}\u{20E3} \u{1F4D6}",
    "\u{1F30D} \u{0031}\u{FE0F}\u{20E3} \u{0032}\u{FE0F}\u{20E3} \u{1F4D6} \u{26A1}"
  ];

  const fire = '🔥'
  const dateFormatted = `${now.getMonth() + 1}/${now.getDate()}`;
  const dayLine = `Lexicon ${dateFormatted}: Puzzle #${props.today.number}`
  const noHints = `I solved today's Lexicon with 0 hints!`;
  const someHints = `I solved today\'s Lexicon with ${props.hintsUsed + 1} hints: ${emojis[props.hintsUsed]}` 
  const streak = `I'm on a streak of ${fire}${getStreak(props.today.number)}${fire}`
  const link = `Play today's puzzle: https://lexicon-pi.vercel.app/`;
  const shareText: string = `${dayLine}\n\n${props.hintsUsed === 0 ? noHints : someHints}\n${streak}\n${link}`;

  console.log(shareText)

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0" onClick={props.onClose} />

      <div className="helpModal">
      <button
          className="absolute top-4 right-6 text-3xl font-bold text-gray-600 hover:text-gray-900 cursor-pointer"
          onClick={props.onClose}
        >
          &times;
        </button>
        <div className="w-full max-w-md justify-center items-center flex">
          <div className="helpModalHeaderText">
            {hintMessages[props.hintsUsed]}
          </div>
        </div>

        <div className="w-full max-w-md justify-center items-center flex">
          <div className="helpModalText">
            {props.today.longExplanation}
          </div>
        </div>

        <div className="w-full max-w-md justify-center items-center flex">
          <div className="helpModalHeaderText">
            Stats
          </div>
        </div>

        <div className="flex gap-2 justify-center items-center">
          <div className="successModalText">
            {"Streak: " + getStreak(props.today.number)}
          </div>
          <div className="successModalText">
            {"Best streak: " + getBestStreak()}
          </div>
        </div>

        <div className="helpModalText">
          Hints distribution
        </div>

        <div className="w-full max-w-md space-y-2 mb-2">
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

        <div className="w-full flex items-center justify-center">
          <div className="successModalText">
            {`Next puzzle in: ${hours}:${minutes}:${seconds}`}
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <ShareTextButtonProps text={shareText}/>
        </div>
      </div>
    </div>
  );
}
