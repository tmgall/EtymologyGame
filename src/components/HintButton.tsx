import { LAST_ROOT_HINTS_KEY } from "./Puzzle";

export interface HintButtonProps {
    puzzleNumber: string;
    hint: string;
    storageKey: string;
    puzzleIsComplete: boolean;
    revealed: boolean;
    disabled: boolean;
    setShowHint: () => void;
    hintText: string;
    isRootHintButton?: boolean;
    rootNumber?: number;
}

const HintButton = ({ puzzleNumber, hint, storageKey, puzzleIsComplete, revealed, disabled, setShowHint, hintText, isRootHintButton, rootNumber }: HintButtonProps) => {
    const styleClass = "hintButtonBase " 
        + (revealed ? "hintButtonRevealed" : disabled  ? "hintButtonDisabled" : "hintButton");
    return (
        <div
            className={styleClass}
            onClick={() => { 
                if (!revealed && !disabled) {
                    setShowHint()
                }
                if (!puzzleIsComplete) {
                    if (storageKey !== LAST_ROOT_HINTS_KEY) {
                        localStorage.setItem(storageKey, puzzleNumber);
                    } else {
                        const lastRootsShown = localStorage.getItem(LAST_ROOT_HINTS_KEY);
                        const rootsShown: string[] = lastRootsShown ? lastRootsShown.split(",") : [];
                        const maxLength = Math.max(rootsShown.length, (rootNumber ?? 0) + 1);
                        const maxRootsShown = Array(maxLength).fill(0);
                        for (let i = 0; i < maxLength; i += 1) {
                            if (i == rootNumber) {
                                maxRootsShown[i] = puzzleNumber;
                            } else if (i < rootsShown.length) {
                                maxRootsShown[i] = rootsShown[i];
                            }
                        }
                        localStorage.setItem(LAST_ROOT_HINTS_KEY, maxRootsShown.join(","));
                    }
                }
            }}
        >
            {revealed ? hint : hintText}
        </div>
    );
};

export default HintButton;