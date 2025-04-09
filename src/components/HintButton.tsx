export interface HintButtonProps {
    number: string;
    hint: string;
    storageKey: string;
    puzzleIsComplete: boolean;
    revealed: boolean;
    disabled: boolean;
    setShowHint: (showHint: boolean) => void;
    hintText: string;
}

const HintButton = ({ number, hint, storageKey, puzzleIsComplete, revealed, disabled, setShowHint, hintText }: HintButtonProps) => {
    const styleClass = revealed ? "hintButtonRevealed" : disabled ? "hintButtonDisabled" : "hintButton";
    return (
        <div
            className={styleClass}
            onClick={() => { 
                if (!revealed && !disabled) {
                    setShowHint(true)
                }
                if (!puzzleIsComplete) {
                    localStorage.setItem(storageKey, number);
                }
            }}
        >
            {revealed ? hint : hintText}
        </div>
    );
};

export default HintButton;