export interface WordData {
    clue: string;
    answer: string;
    roots: RootsData[];
    definition: string;
}

export interface RootsData {
    english: string;
    languageName: string;
    languageWord: string;
}

export const WORD_LIST: WordData[] = [
    { 
        clue: "far vision", 
        answer: "television", 
        roots: [{ english: "far", languageName: "Greek", languageWord: "tele-" }, { english: "vision", languageName: "Latin", languageWord: "visio" }],
        definition: "technology with a screen",
    },
    { 
        clue: "life writing", 
        answer: "biography", 
        roots: [{ english: "life", languageName: "Greek", languageWord: "bios" }, { english: "writing", languageName: "Greek", languageWord: "-graphia" }],
        definition: "an account of someone's life",
    },
    { 
        clue: "spiral wing", 
        answer: "helicopter", 
        roots: [{ english: "spiral", languageName: "Greek", languageWord: "bios" }, { english: "wing", languageName: "Greek", languageWord: "pteron" }],
        definition: "a type of aircraft",
    },
    { 
        clue: "lord of the world", 
        answer: "juggernaut", 
        roots: [{ english: "the world", languageName: "Sanskrit", languageWord: "jagat" }, { english: "natha", languageName: "Sanskrit", languageWord: "lord" }],
        definition: "a huge or overwhelming force",
    },
    {
        clue: "small-seeing instrument",
        answer: "microscope", 
        roots: [{ english: "small", languageName: "Latin", languageWord: "micro-" }, { english: "seeing instrument", languageName: "Latin", languageWord: "-scopium" }],
        definition: "an instrument to see very small objects",
    },
    {
        clue: "harbor wave",
        answer: "tsunami", 
        roots: [{ english: "harbor", languageName: "Japanese", languageWord: "tsu" }, { english: "wave", languageName: "Japanese", languageWord: "nami" }],
        definition: "a big wave",
    },
    {
        clue: "joy from harm",
        answer: "Schadenfreude", 
        roots: [{ english: "harm", languageName: "German", languageWord: "Schaden" }, { english: "joy", languageName: "German", languageWord: "Freude" }],
        definition: "joy from harm to others",
    },
    {
        clue: "two wheels",
        answer: "bicycle", 
        roots: [{ english: "two", languageName: "Greek", languageWord: "bi-" }, { english: "wheel", languageName: "Greek", languageWord: "kyklos" }],
        definition: "a two-wheeled transport",
    },
    {
        clue: "flesh devourer",
        answer: "carnivore",
        roots: [{ english: "flesh", languageName: "Latin", languageWord: "carni" }, { english: "devour", languageName: "Latin", languageWord: "vore" }],
        definition: "one that eats meat",
    },
    {
        clue: "beyond reality",
        answer: "surrealism", 
        roots: [{ english: "beyond", languageName: "French", languageWord: "sur" }, { english: "reality", languageName: "French", languageWord: "realisme" }],
        definition: "bizarre and dreamlike art",
    },
    {
        clue: "star sailor",
        answer: "astronaut", 
        roots: [{ english: "star", languageName: "Greek", languageWord: "astro" }, { english: "sailor", languageName: "Greek", languageWord: "naut" }],
        definition: "one exploring space",
    },
    {
        clue: "empty orchestra",
        answer: "karaoke", 
        roots: [{ english: "empty", languageName: "Japanese", languageWord: "kara" }, { english: "orchestra", languageName: "Japanese", languageWord: "oke" }],
        definition: "singing with just the music",
    },
];