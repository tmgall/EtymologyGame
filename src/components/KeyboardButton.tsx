import { IoBackspaceOutline } from "react-icons/io5"

export interface KeyboardButtonProps {
  keyContent: string;
    onClick: (key: string) => void;
}

const KeyboardButton = ({ keyContent, onClick }: KeyboardButtonProps) => {
    const className = keyContent === "Enter" ? "keyboardButtonSubmit" : "keyboardButton";

    const submitContent = (
      <div key={keyContent} className={className} onClick={() => { onClick(keyContent) }}>
        {"Enter"}
      </div>
    );

    const content = keyContent === "Back" 
      ? <IoBackspaceOutline className="keyboardIconButton"/> 
      : keyContent === "Enter" ? submitContent
      : <div className={className}>{keyContent}</div>
  
    return (
      <div key={keyContent} className={className} onClick={() => { onClick(keyContent) }}>
        {content}
      </div>
    );
};

export default KeyboardButton;
