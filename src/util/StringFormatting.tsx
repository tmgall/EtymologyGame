import { RootsData } from "../assets/WordList";

export const formatAsList = (array: string[]) => {
    return array.length > 1
        ? array.slice(0, -1).join(', ') + ' and ' + array[array.length - 1]
        : array[0];
}

export const formatRootDefinition = (root: RootsData) => {
    return `\"${root.languageWord}\" is ${root.languageName} for \"${root.english}\"`;
}

// hintsUsed is [root hint, meaning hint, answer revealed]; the share text and results screen use the same emojis.
const hintEmojis = (hintsUsed: boolean[]) => {
    const emojis = [];
    if (hintsUsed[0]) {
        emojis.push("\u{1F30D}")
    }
    if (hintsUsed[1]) {
        emojis.push("\u{1F914}")
    }
    return emojis;
}

export const formatResultLine = (hintsUsed: boolean[]) => {
    if (hintsUsed[2]) return "Answer revealed";
    const emojis = hintEmojis(hintsUsed);
    if (emojis.length === 0) return "Solved with no hints \u{1F9E0}";
    return `Solved with ${emojis.length} hint${emojis.length == 1 ? "" : "s"} ${emojis.join(" ")}`;
}

export const formatShareText = (hintsUsed: boolean[], puzzleNumber: string, isComplete: boolean, puzzleDate: Date, streak: number) => {
    const link = `https://www.lexicongame.net/`;
    if (!isComplete) {
        return `Try out Lexicon!\n${link}`;
    }
    const dayLine = `Lexicon ${puzzleDate.getMonth() + 1}/${puzzleDate.getDate()}: Puzzle #${puzzleNumber}`

    const numHintsUsed = hintsUsed.filter((hintUsed) => hintUsed).length;
    const emojis = hintEmojis(hintsUsed);
    const fire = '🔥';
    const brain = '\u{1F9E0}'
    const noHints = `I solved it without any hints! ${brain}\n`;
    const someHints = `I solved it with ${numHintsUsed} hint${numHintsUsed == 1 ? "" : "s"}: ${emojis.join(" ")}\n`;
    const hintsText = numHintsUsed === 0 ? noHints : numHintsUsed === 3 ? "" : someHints;
    
    const noStreak = 'I had to reveal it today — see if you can beat me!';
    const someStreak = `I'm on a streak of ${fire}${streak}${fire}`;
    const streakText = streak === 0 ? noStreak : someStreak;
    const shareText = `${dayLine}\n\n${hintsText}${streakText}\n${link}`;
    return shareText;
}