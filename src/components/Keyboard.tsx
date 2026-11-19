import KeyboardButton from "./KeyboardButton";

export interface KeyboardProps {
    onKeyPress: (key: string) => void;
    onBackspace: () => void;
    onSubmit: () => void;
}

// Mirrors the iPhone layout: every letter key is the same width, the middle
// row is indented by half a key, and Enter/Back are wider on the bottom row.
const ROWS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Back"],
];

const Keyboard = ({ onKeyPress, onBackspace, onSubmit }: KeyboardProps) => {
    const onClick = (key: string) => {
        if (key === "Back") {
            onBackspace();
        } else if (key === "Enter") {
            onSubmit();
        } else {
            onKeyPress(key);
        }
    };

    return (
        <div className="keyboard">
            {ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className={rowIndex === 1 ? "keyboardRow keyboardRowIndented" : "keyboardRow"}>
                    {row.map((keyContent) => (
                        <KeyboardButton key={keyContent} keyContent={keyContent} onClick={onClick} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Keyboard;
