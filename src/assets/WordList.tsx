export interface WordData {
    clue: string;
    answer: string;
    rootLanguages: string;
    firstRoot: string;
    secondRoot: string;
}

export const WORD_LIST: WordData[] = [
    { clue: "\"far sight\"", answer: "television", rootLanguages: "Greek, Latin", firstRoot: "tele", secondRoot: "visio" }
];