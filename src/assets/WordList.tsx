export interface WordData {
    number: string;
    clue: string;
    answer: string;
    rootLanguages: string;
    firstRoot: string;
    secondRoot: string;
    shortExplanation: string;
}

export const WORD_LIST: WordData[] = [
    { 
        number: "1", 
        clue: "far vision", 
        answer: "television", 
        rootLanguages: "Greek, Latin", 
        firstRoot: "\"tele-\" is Greek for \"far\"", 
        secondRoot: "\"visio\" is Latin for \"vision\"",
        shortExplanation: "\"tele-\" + \"visio\" = \"television\""
    },
    { 
        number: "2", 
        clue: "life writing", 
        answer: "biography", 
        rootLanguages: "Greek", 
        firstRoot: "\"bios\" is Greek for \"life\"", 
        secondRoot: "\"-graphia\" is Greek for \"writing\"",
        shortExplanation: "\"bios\" + \"-graphia\" = \"biography\""
    },
    { 
        number: "3", 
        clue: "spiral wing", 
        answer: "helicopter", 
        rootLanguages: "Greek", 
        firstRoot: "\"helix\" is Greek for \"spiral\"", 
        secondRoot: "\"pteron\" is Greek for \"wing\"",
        shortExplanation: "\"helix\" + \"pteron\" = \"helicopter\""
    },
    { 
        number: "4", 
        clue: "lord of the world", 
        answer: "juggernaut", 
        rootLanguages: "Sanskrit", 
        firstRoot: "\"jagat\" is Sanskrit for \"the world\"", 
        secondRoot: "\"natha\" is Sanskrit for \"lord\"",
        shortExplanation: "\"jagat\" + \"natha\" = \"juggernaut\""
    }
];