import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
          Welcome to Lexicon!
        </h2>
        <p className="helpModalText">
            Your goal is to guess the secret word given the literal meaning of the word based on its etymology, i.e. its root words, and a hint to its actual meaning. 
        </p>
        <p className="helpModalText">
          For example, the clue "far vision" would mean the answer is television, since "television" comes from the Greek "tele" (meaning "far") and Latin "visio" (meaning "vision").
        </p>
        <p className="helpModalText">
            The puzzles get harder as the week goes on, with Monday being the easiest and Sunday being the hardest. If you're stuck, you can use the available hints. 
        </p>
        <hr className="divider" />
        <Link to="/privacy-policy" className="backToHomeButton">Privacy Policy</Link>
        <br></br>
        <Link to="/terms-of-service" className="backToHomeButton">Terms of Service</Link>
        <br></br>
        <Link to="/contact" className="backToHomeButton">Contact</Link>
      </div>
    </div>
  )
}
