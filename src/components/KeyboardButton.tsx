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
        onPointerDown={() => setIsActive(true)}
        onPointerUp={() => setIsActive(false)}
        onPointerCancel={() => setIsActive(false)}
        onPointerLeave={() => setIsActive(false)}
        key={keyContent}
        className={className}
        onClick={() => {
          setIsActive(false)
          onClick(keyContent)
        }}
      >
        {keyContent}
      </div>
    );
};

export default KeyboardButton;
