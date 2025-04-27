export interface WordData {
    clue: string;
    answer: string;
    roots: RootsData[];
    definition: string;
    difficulty: string;
    authorsNote?: string;
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
        difficulty: "Easy",
    },
    { 
        clue: "life writing", 
        answer: "biography", 
        roots: [{ english: "life", languageName: "Greek", languageWord: "bios" }, { english: "writing", languageName: "Greek", languageWord: "-graphia" }],
        definition: "an account of someone's life",
        difficulty: "Easy",
    },
    { 
        clue: "spiral wing", 
        answer: "helicopter", 
        roots: [{ english: "spiral", languageName: "Greek", languageWord: "bios" }, { english: "wing", languageName: "Greek", languageWord: "pteron" }],
        definition: "a type of aircraft",
        difficulty: "Medium",
    },
    { 
        clue: "lord of the world", 
        answer: "juggernaut", 
        roots: [{ english: "the world", languageName: "Sanskrit", languageWord: "jagat" }, { english: "natha", languageName: "Sanskrit", languageWord: "lord" }],
        definition: "a huge or overwhelming force",
        difficulty: "Hard",
    },
    {
        clue: "small-seeing instrument",
        answer: "microscope", 
        roots: [{ english: "small", languageName: "Latin", languageWord: "micro-" }, { english: "seeing instrument", languageName: "Latin", languageWord: "-scopium" }],
        definition: "an instrument to see very small objects",
        difficulty: "Easy",
    },
    {
        clue: "measurement of three angles",
        answer: "trigonometry",
        roots: [{ english: "three", languageName: "Greek", languageWord: "tri"}, { english: "angles", languageName: "Greek", languageWord: "gonia"}, { english: "measurement", languageName: "Greek", languageWord: "metron"}],
        definition: "a branch of math",
        difficulty: "Easy",
    },
    {
        clue: "harbor wave",
        answer: "tsunami", 
        roots: [{ english: "harbor", languageName: "Japanese", languageWord: "tsu" }, { english: "wave", languageName: "Japanese", languageWord: "nami" }],
        definition: "a big wave",
        difficulty: "Medium",
    },
    {
        clue: "start from",
        answer: "originate", 
        roots: [{ english: "beginning, source", languageName: "Latin", languageWord: "originem" }],
        definition: "begin at",
        difficulty: "Easy",
    },
    {
        clue: "joy from harm",
        answer: "Schadenfreude", 
        roots: [{ english: "harm", languageName: "German", languageWord: "Schaden" }, { english: "joy", languageName: "German", languageWord: "Freude" }],
        definition: "joy from harm to others",
        difficulty: "Hard",
    },
    {
        clue: "two wheels",
        answer: "bicycle", 
        roots: [{ english: "two", languageName: "Greek", languageWord: "bi-" }, { english: "wheel", languageName: "Greek", languageWord: "kyklos" }],
        definition: "a two-wheeled transport",
        difficulty: "Easy",
    },
    {
        clue: "flesh devourer",
        answer: "carnivore",
        roots: [{ english: "flesh", languageName: "Latin", languageWord: "carni" }, { english: "devour", languageName: "Latin", languageWord: "vore" }],
        definition: "one that eats meat",
        difficulty: "Easy",
    },
    {
        clue: "beyond reality",
        answer: "surrealism", 
        roots: [{ english: "beyond", languageName: "French", languageWord: "sur" }, { english: "reality", languageName: "French", languageWord: "realisme" }],
        definition: "bizarre and dreamlike art",
        difficulty: "Easy",
    },
    {
        clue: "star sailor",
        answer: "astronaut", 
        roots: [{ english: "star", languageName: "Greek", languageWord: "astro" }, { english: "sailor", languageName: "Greek", languageWord: "naut" }],
        definition: "one exploring space",
        difficulty: "Easy",
    },
    {
        clue: "empty orchestra",
        answer: "karaoke", 
        roots: [{ english: "empty", languageName: "Japanese", languageWord: "kara" }, { english: "orchestra", languageName: "Japanese", languageWord: "oke" }],
        definition: "singing with just the music",
        difficulty: "Medium",
    },
    {
        clue: "one marriage",
        answer: "monogamy",
        roots: [{ english: "one", languageName: "Greek", languageWord: "monos"}, { english: "marriage", languageName: "Greek", languageWord: "gamos"}],
        definition: "one marriage at one time",
        difficulty: "Easy",
    },
    {
        clue: "Sax's sound",
        answer: "saxophone",
        roots: [{ english: "Sax (surname)", languageName: "French", languageWord: "Sax"}, { english: "sound", languageName: "Greek", languageWord: "phone"}],
        definition: "type of woodwind instrument",
        difficulty: "Easy",
    },
    {
        clue: "forbidden",
        answer: "taboo",
        roots: [{ english: "forbidden", languageName: "Tongan", languageWord: "tapu"}],
        definition: "socially unacceptable",
        difficulty: "Medium",
    },
    {
        clue: "fear of spiders",
        answer: "arachnophobia",
        roots: [{ english: "spider", languageName: "Greek", languageWord: "arakhne"}, { english: "fear", languageName: "Greek", languageWord: "phobia"}],
        definition: "literally fear of spiders",
        difficulty: "Easy",
    },
    {
        clue: "journey",
        answer: "safari",
        roots: [{ english: "journey", languageName: "Arabic", languageWord: "safar"}],
        definition: "expedition to hunt in Africa",
        difficulty: "Hard",
    },
    {
        clue: "running back again",
        answer: "palindrome",
        roots: [{ english: "again", languageName: "Greek", languageWord: "palin"}, { english: "running", languageName: "Greek", languageWord: "dromos"}],
        definition: "a word the same backwards",
        difficulty: "Medium",
    }
];