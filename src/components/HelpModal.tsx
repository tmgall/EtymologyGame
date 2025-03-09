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

      <div className="helpModal">
        <button
          className="absolute top-4 right-6 text-3xl font-bold text-gray-600 hover:text-gray-900 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="helpModalHeaderText">How to Play</h2>
        <p className="helpModalText">   
            Welcome to Lexicon! 
        </p>
        <p className="helpModalText">
            Your goal is to guess the secret word. The clue is the literal meaning of the word based on its etymology, i.e. its root words. 
            For example, the clue "far vision" would mean the answer is television, since "television" comes from the Greek "tele" (meaning "far") and Latin "visio" (meaning "vision").
        </p>
        <p></p>
        <p className="helpModalText">
            If you're stuck, you can use the available hints.
        </p>
      </div>
    </div>
  );
}
