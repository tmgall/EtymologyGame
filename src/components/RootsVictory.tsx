import { CSSProperties, useEffect, useRef } from "react";
import { RootsData } from "../assets/WordList";

export interface RootsVictoryProps {
    roots: RootsData[];
    answer: string;
    onDone: () => void;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Win animation: each root appears, then they slide together and become the answer.
export default function RootsVictory({ roots, answer, onDone }: RootsVictoryProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
    const plusRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const wordRef = useRef<HTMLDivElement>(null);
    const meaningRef = useRef<HTMLDivElement>(null);
    const onDoneRef = useRef(onDone);
    onDoneRef.current = onDone;
    const skipRef = useRef(() => {});

    useEffect(() => {
        let finished = false;
        const running: Animation[] = [];
        const play = (el: Element | null, keyframes: Keyframe[], options: KeyframeAnimationOptions) => {
            if (!el) return Promise.resolve();
            const animation = el.animate(keyframes, { fill: "both", easing: "cubic-bezier(0.2, 0.7, 0.2, 1)", ...options });
            running.push(animation);
            // A cancelled animation rejects its promise; that just means we're skipping ahead.
            return animation.finished.then(() => undefined, () => undefined);
        };
        const finish = () => {
            if (finished) return;
            finished = true;
            running.forEach((animation) => animation.cancel());
            onDoneRef.current();
        };
        skipRef.current = finish;

        const run = async () => {
            const chips = chipRefs.current.filter((chip): chip is HTMLDivElement => chip !== null);
            const pluses = plusRefs.current.filter((plus): plus is HTMLSpanElement => plus !== null);
            const letters = Array.from(wordRef.current?.children ?? []);

            // 1. The roots appear one at a time.
            const stagger = 220;
            await Promise.all([
                ...chips.map((chip, i) => play(chip,
                    [{ opacity: 0, transform: "translateY(16px) scale(0.9)" }, { opacity: 1, transform: "none" }],
                    { duration: 320, delay: 100 + i * stagger })),
                ...pluses.map((plus, i) => play(plus,
                    [{ opacity: 0 }, { opacity: 1 }],
                    { duration: 200, delay: 100 + i * stagger + stagger / 2 })),
            ]);
            await wait(450);
            if (finished) return;

            // 2. They slide into the middle and fade as the word forms.
            const wordBox = wordRef.current?.getBoundingClientRect();
            const centerX = wordBox ? wordBox.left + wordBox.width / 2 : window.innerWidth / 2;
            const centerY = wordBox ? wordBox.top + wordBox.height / 2 : window.innerHeight / 2;
            const merge = chips.map((chip) => {
                const box = chip.getBoundingClientRect();
                const dx = centerX - (box.left + box.width / 2);
                const dy = centerY - (box.top + box.height / 2);
                return play(chip,
                    [{ opacity: 1, transform: "none" }, { opacity: 0, transform: `translate(${dx}px, ${dy}px) scale(0.5)` }],
                    { duration: 420, easing: "cubic-bezier(0.55, 0, 0.75, 0.2)" });
            });
            pluses.forEach((plus) => play(plus, [{ opacity: 1 }, { opacity: 0 }], { duration: 150 }));
            await wait(250);
            if (finished) return;

            // 3. The answer pops in, letter by letter.
            const reveal = [
                play(wordRef.current,
                    [{ opacity: 0, transform: "scale(0.7)" }, { opacity: 1, transform: "scale(1.08)", offset: 0.6 }, { opacity: 1, transform: "scale(1)" }],
                    { duration: 500 }),
                ...letters.map((letter, i) => play(letter,
                    [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }],
                    { duration: 260, delay: i * 30 })),
                play(meaningRef.current, [{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: 350 }),
            ];
            await Promise.all([...merge, ...reveal]);
            await wait(900);
            if (finished) return;

            // 4. Fade out and hand off to the results.
            await play(overlayRef.current, [{ opacity: 1 }, { opacity: 0 }], { duration: 220 });
            finish();
        };
        run();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                finish();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            // Unmounting (or React's dev double-mount) cancels the run without calling onDone.
            finished = true;
            running.forEach((animation) => animation.cancel());
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const letters = [...answer.toUpperCase()];
    const wordStyle = { "--letters": letters.length } as CSSProperties;

    return (
        <div className="victoryOverlay" ref={overlayRef} role="status" onClick={() => skipRef.current()}>
            <span className="visuallyHidden">Solved! The answer is {answer}.</span>
            <div className="victoryStage" aria-hidden="true">
                <div className="victoryRoots">
                    {roots.map((root, i) => (
                        <div key={i} className="victoryRootGroup">
                            {i > 0 && <span className="victoryPlus" ref={(el) => { plusRefs.current[i - 1] = el; }}>+</span>}
                            <div className="victoryRoot" ref={(el) => { chipRefs.current[i] = el; }}>
                                <span className="victoryRootWord">{root.languageWord}</span>
                                <span className="victoryRootMeaning">"{root.english}"</span>
                                <span className="victoryRootLanguage">{root.languageName}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="victoryResult">
                    <div className="victoryWord" ref={wordRef} style={wordStyle}>
                        {letters.map((letter, i) => <span key={i}>{letter}</span>)}
                    </div>
                    <div className="victoryMeaning" ref={meaningRef}>
                        {roots.map((root) => `"${root.english}"`).join(" + ")}
                    </div>
                </div>
            </div>
        </div>
    );
}
