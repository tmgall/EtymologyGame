import { useState } from "react";
import { IoBackspaceOutline } from "react-icons/io5";
import { IoReturnDownBackSharp } from "react-icons/io5";

export interface KeyboardButtonProps {
  keyContent: string;
    onClick: (key: string) => void;
}

const KeyboardButton = ({ keyContent, onClick }: KeyboardButtonProps) => {
    const [isActive, setIsActive] = useState(false);

    const className = keyContent === "Back" || keyContent === "Enter" 
    ? isActive ? "keyboardButtonLongActive" : "keyboardButtonLongNeutral"
    : isActive ? "keyboardButtonShortActive" : "keyboardButtonShortNeutral";

    const content = keyContent === "Back" 
      ? <IoBackspaceOutline className="keyboardIconButton"/> 
      : keyContent === "Enter" ? <IoReturnDownBackSharp className="keyboardIconButton"/> 
      : <div className={className}>{keyContent}</div>
  
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
        {content}
      </div>
    );
};

export default KeyboardButton;
