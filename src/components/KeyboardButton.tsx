import { useState } from "react";
import { IoBackspaceOutline } from "react-icons/io5";

export interface KeyboardButtonProps {
    keyContent: string;
    onClick: (key: string) => void;
}

const KeyboardButton = ({ keyContent, onClick }: KeyboardButtonProps) => {
    // Track presses ourselves rather than relying on CSS :active, which mobile browsers apply inconsistently.
    const [pressedBy, setPressedBy] = useState<string | null>(null);
    const isBack = keyContent === "Back";
    const isEnter = keyContent === "Enter";
    const isLetter = !isBack && !isEnter;
    const className = ["keyboardKey", !isLetter && "keyboardKeyWide", pressedBy && "keyboardKeyPressed"].filter(Boolean).join(" ");
    const release = () => setPressedBy(null);

    return (
        <button
            type="button"
            className={className}
            aria-label={isBack ? "Delete" : keyContent}
            // Keys are never tab stops, so a physical Enter always submits the guess.
            tabIndex={-1}
            onMouseDown={(e) => e.preventDefault()}
            onPointerDown={(e) => setPressedBy(e.pointerType)}
            onPointerUp={release}
            onPointerCancel={release}
            onPointerLeave={release}
            onClick={() => onClick(keyContent)}
        >
            {isBack ? <IoBackspaceOutline className="keyboardIconButton" /> : keyContent}
            {/* Like iOS, show an enlarged letter above the key while a finger is on it. */}
            {isLetter && pressedBy === "touch" && <span className="keyPopup" aria-hidden="true">{keyContent}</span>}
        </button>
    );
};

export default KeyboardButton;
