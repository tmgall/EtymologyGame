import { useEffect, useState } from "react";

export default function SimilarityModal({ onClose, similarity }: { onClose: () => void; similarity: number }) {
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
            You're nearly there
        </h2>
        <p className="similarityModalText">   
            {`Your answer is just ${similarity} letter${similarity > 1 ? "s" : ""} off.`}
        </p>
        <p className="similarityModalText">   
            Make sure to check your spelling and verify your guess is the right number of letters.
        </p>
        <p className="similarityModalText">   
            If that doesn't work, try other variations of the word.
        </p>
      </div>
    </div>
  )
}
