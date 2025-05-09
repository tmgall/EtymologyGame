import { useState } from "react";

export interface KeyboardButtonProps {
  keyContent: string;
    onClick: (key: string) => void;
}

const KeyboardButton = ({ keyContent, onClick }: KeyboardButtonProps) => {
    const [isActive, setIsActive] = useState(false);

    const className = keyContent === "Back" || keyContent === "Enter" 
    ? isActive ? "keyboardButtonLongActive" : "keyboardButtonLongNeutral"
    : isActive ? "keyboardButtonShortActive" : "keyboardButtonShortNeutral";
  
    return (
      <div
        onTouchStart={() => setIsActive(true)}
        onTouchEnd={() => setTimeout(() => setIsActive(false), 100)}
        onTouchCancel={() => setTimeout(() => setIsActive(false), 100)}     
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setTimeout(() => setIsActive(false), 100)}
        onMouseLeave={() => setTimeout(() => setIsActive(false), 100)}   
        key={keyContent}
        className={className}
        onClick={() => onClick(keyContent)}
      >
        {keyContent}
      </div>
    );
};

export default KeyboardButton;
