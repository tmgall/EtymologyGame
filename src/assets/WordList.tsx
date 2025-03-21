export interface WordData {
    number: string;
    clue: string;
    answer: string;
    rootLanguages: string;
    firstRoot: string;
    secondRoot: string;
    definition: string;
    shortExplanation: string;
    longExplanation: string;
}

export const WORD_LIST: WordData[] = [
    { 
        number: "1", 
        clue: "far vision", 
        answer: "television", 
        rootLanguages: "Greek, Latin", 
        firstRoot: "\"tele-\" is Greek for \"far\"", 
        secondRoot: "\"visio\" is Latin for \"vision\"",
        definition: "technology with a screen",
        shortExplanation: "\"tele-\" + \"visio\" = \"television\"",
        longExplanation: "The word \"television\" comes from the Greek and Latin for \"far vision\", since \"tele-\" means \"far\" and \"visio\" means \"vision\"."
    },
    { 
        number: "2", 
        clue: "life writing", 
        answer: "biography", 
        rootLanguages: "Greek", 
        firstRoot: "\"bios\" is Greek for \"life\"", 
        secondRoot: "\"-graphia\" is Greek for \"writing\"",
        definition: "an account of someone's life",
        shortExplanation: "\"bios\" + \"-graphia\" = \"biography\"",
        longExplanation: "The word \"biography\" comes from the Greek for \"life writing\", since \"bios\" means \"life\" and \"-graphia\" means \"writing\"."
    },
    { 
        number: "3", 
        clue: "spiral wing", 
        answer: "helicopter", 
        rootLanguages: "Greek", 
        firstRoot: "\"helix\" is Greek for \"spiral\"", 
        secondRoot: "\"pteron\" is Greek for \"wing\"",
        definition: "a type of aircraft",
        shortExplanation: "\"helix\" + \"pteron\" = \"helicopter\"",
        longExplanation: "The word \"helicopter\" comes from the Greek for \"spiral wing\", since \"helix\" means \"spiral\" and \"pteron\" means \"wing\"."
    },
    { 
        number: "4", 
        clue: "lord of the world", 
        answer: "juggernaut", 
        rootLanguages: "Sanskrit", 
        firstRoot: "\"jagat\" is Sanskrit for \"the world\"", 
        secondRoot: "\"natha\" is Sanskrit for \"lord\"",
        definition: "a huge or overwhelming force",
        shortExplanation: "\"jagat\" + \"natha\" = \"juggernaut\"",
        longExplanation: "The word \"juggernaut\" comes from the Sanskrit for \"lord of the world\", since \"jagat\" means \"world\" and \"natha\" means \"lord\"."
    },
    {
        number: "5",
        clue: "instrument for seeing the small",
        answer: "microscopic", 
        rootLanguages: "Latin", 
        firstRoot: "\"micro-\" is Latin for \"small\"", 
        secondRoot: "\"-scopium\" is Latin for \"instrument for seeing\"",
        definition: "an instrument to see very small objects",
        shortExplanation: "\"micro-\" + \"-scopium\" = \"microscope\"",
        longExplanation: "The word \"microscope\" comes from the Latin for \"instrument for seeing the small\", since \"micro-\" means \"the small\" and \"-scopium\" means \"an instrument for seeing\""
    }
];