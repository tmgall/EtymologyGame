import { useEffect } from "react";

export default function HelpModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-white p-6 rounded-lg shadow-xl max-w-xs w-full h-auto border">
        <button
          className="absolute top-4 right-6 text-3xl font-bold text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-2">How to Play</h2>
        <p className="text-gray-700 mb-2 text-sm">
            Welcome to Lexicon! 
        </p>
        <p className="text-gray-700 mb-2 text-sm">
            Your goal is to guess the secret word. The clue is the literal meaning of the word based on its etymology, i.e. its root words. 
            For example, the clue "far vision" would mean the answer is television, since "television" comes from the Greek and Latin "tele" (meaning "far") and "visio" (meaning "vision").
        </p>
        <p></p>
        <p className="text-gray-700 mb-2 text-sm">
            After each guess, you'll get to see if you have any letters correct, so you know if you're on the right track.
            If you're stuck, you can use the available hints.
        </p>
      </div>
    </div>
  );
}
