import { RootsData, WordData } from "../assets/WordList";
import { getStreak } from "./Streak";

export const formatAsList = (array: string[]) => {
    return array.length > 1
        ? array.slice(0, -1).join(', ') + ' and ' + array[array.length - 1]
        : array[0];
}

export const formatRootDefinition = (root: RootsData) => {
    return `\"${root.languageWord}\" is ${root.languageName} for \"${root.english}\"`;
}

export const formatShortExplanation = (today: WordData) => {
    return today.roots.map((root) => `\"${root.languageWord}\"`).join(" + ") + ` = ${today.answer}`;
}

export const formatShareText = (hintsUsed: boolean[], puzzleNumber: string, isComplete: boolean, now: Date) => {
    const link = `https://www.lexicongame.net/`;
    if (!isComplete) {
        return `Try out Lexicon!\n${link}`;
    }
    const dayLine = `Lexicon ${now.getMonth() + 1}/${now.getDate()}: Puzzle #${puzzleNumber}`

    const numHintsUsed = hintsUsed.filter((hintUsed) => hintUsed).length;
    const emojis = [];
    if (hintsUsed[0]) {
        emojis.push("\u{1F30D}")
    }
    if (hintsUsed[1]) {
        emojis.push("\u{1F914}")
    }
    const fire = '🔥';
    const noHints = `${fire} I solved it without any hints! ${fire}\n`;
    const someHints = `I solved it with ${numHintsUsed} hint${numHintsUsed == 1 ? "" : "s"}: ${emojis.join(" ")}\n`;
    const hintsText = numHintsUsed === 0 ? noHints : numHintsUsed === 3 ? "" : someHints;
    
    const streak = getStreak(puzzleNumber); 
    const noStreak = 'I had to reveal it today — see if you can beat me!';
    const someStreak = `I'm on a streak of ${fire}${streak}${fire}`;
    const streakText = streak === 0 ? noStreak : someStreak;
    const shareText = `${dayLine}\n\n${hintsText}${streakText}\n${link}`;
    return shareText;
}