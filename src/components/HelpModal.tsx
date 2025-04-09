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
    <div className="helpModalOverlay" onClick={onClose}>
      <div className="helpModalBox" onClick={(e) => e.stopPropagation()}>
        <div className="closeButton" onClick={onClose}>
            &times;
        </div>
        <h2 className="helpModalHeaderText">
          How to Play
        </h2>
        <p className="helpModalText">   
            Welcome to Lexicon!
        </p>
        <p className="helpModalText">
            Your goal is to guess the secret word. The clue is the literal meaning of the word based on its etymology, i.e. its root words. 
        </p>
        <p className="helpModalText">
          For example, the clue "far vision" would mean the answer is television, since "television" comes from the Greek "tele" (meaning "far") and Latin "visio" (meaning "vision").
        </p>
        <p className="helpModalText">
            If you're stuck, you can use the available hints.
        </p>
      </div>
    </div>
  )
}
