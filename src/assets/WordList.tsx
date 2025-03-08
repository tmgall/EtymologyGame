export interface WordData {
    clue: string;
    answer: string;
    rootLanguages: string;
    firstRoot: string;
    secondRoot: string;
}

export const WORD_LIST: WordData[] = [
    { clue: "far sight", answer: "television", rootLanguages: "Greek, Latin", firstRoot: "tele", secondRoot: "visio" },
    { clue: "life writing", answer: "biography", rootLanguages: "Greek", firstRoot: "bios", secondRoot: "graphia" },
    { clue: "spiral wing", answer: "helicopter", rootLanguages: "Greek", firstRoot: "helix", secondRoot: "pteron" },
    { clue: "world lord", answer: "juggernaut", rootLanguages: "Sanskrit", firstRoot: "jagat", secondRoot: "natha" }
];