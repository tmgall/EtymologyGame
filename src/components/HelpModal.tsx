import { useEffect, useState } from "react";

export default function HelpModal({ onClose }: { onClose: () => void }) {
  const [isClosing, setIsClosing] = useState(false);
  
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 150); 
  };
  
  const modalClass = isClosing ? "helpModalOverlay modalExit" : "helpModalOverlay modalEnter";
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  return (
    <div className={modalClass} onClick={handleClose}>
      <div className="helpModalBox" onClick={(e) => e.stopPropagation()}>
        <div className="closeButton" onClick={handleClose}>
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
            The puzzles get harder as the week goes on, with Monday being the easiest and Sunday being brutal.  
        </p>
        <p className="helpModalText">
            If you're stuck, you can use the available hints.
        </p>
      </div>
    </div>
  )
}
