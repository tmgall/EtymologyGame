export interface WordData {
    clue: string;
    answer: string;
    roots: RootsData[];
    definition: string;
    authorsNote?: string;
}

export interface RootsData {
    english: string;
    languageName: string;
    languageWord: string;
}

// 3 easy, 2 medium, 2 hard per week
export const WORD_LIST: WordData[] = [
    // New week
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
        clue: "start from",
        answer: "originate", 
        roots: [{ english: "beginning, source", languageName: "Latin", languageWord: "originem" }],
        definition: "begin at",
    },
    { 
        clue: "spiral wing", 
        answer: "helicopter", 
        roots: [{ english: "spiral", languageName: "Greek", languageWord: "bios" }, { english: "wing", languageName: "Greek", languageWord: "pteron" }],
        definition: "a type of aircraft",
    },
    {
        clue: "harbor wave",
        answer: "tsunami", 
        roots: [{ english: "harbor", languageName: "Japanese", languageWord: "tsu" }, { english: "wave", languageName: "Japanese", languageWord: "nami" }],
        definition: "a big wave",
    },
    { 
        clue: "lord of the world", 
        answer: "juggernaut", 
        roots: [{ english: "the world", languageName: "Sanskrit", languageWord: "jagat" }, { english: "lord", languageName: "Sanskrit", languageWord: "natha" }],
        definition: "a huge or overwhelming force",
    },
    {
        clue: "joy from harm",
        answer: "Schadenfreude", 
        roots: [{ english: "harm", languageName: "German", languageWord: "Schaden" }, { english: "joy", languageName: "German", languageWord: "Freude" }],
        definition: "joy from harm to others",
    },
    // New week
    {
        clue: "small-seeing instrument",
        answer: "microscope", 
        roots: [{ english: "small", languageName: "Latin", languageWord: "micro-" }, { english: "seeing instrument", languageName: "Latin", languageWord: "-scopium" }],
        definition: "an instrument to see very small objects",
    },
    {
        clue: "flesh devourer",
        answer: "carnivore",
        roots: [{ english: "flesh", languageName: "Latin", languageWord: "carni" }, { english: "devour", languageName: "Latin", languageWord: "vore" }],
        definition: "one that eats meat",
    },
    {
        clue: "measurement of three angles",
        answer: "trigonometry",
        roots: [{ english: "three", languageName: "Greek", languageWord: "tri"}, { english: "angles", languageName: "Greek", languageWord: "gonia"}, { english: "measurement", languageName: "Greek", languageWord: "metron"}],
        definition: "a branch of math",
    },
    {
        clue: "running back again",
        answer: "palindrome",
        roots: [{ english: "again", languageName: "Greek", languageWord: "palin"}, { english: "running", languageName: "Greek", languageWord: "dromos"}],
        definition: "a word the same backwards",
    },
    {
        clue: "forbidden",
        answer: "taboo",
        roots: [{ english: "forbidden", languageName: "Tongan", languageWord: "tapu"}],
        definition: "socially unacceptable",
        authorsNote: "This word appears in many Polynesian languages, not just Tongan."
    },
    {
        clue: "journey",
        answer: "safari",
        roots: [{ english: "journey", languageName: "Arabic", languageWord: "safar"}],
        definition: "expedition to hunt in Africa",
    },
    {
        clue: "army cry",
        answer: "slogan",
        roots: [{ english: "army", languageName: "Gaelic", languageWord: "slua"}, { english: "cry", languageName: "Gaelic", languageWord: "ghairm"}],
        definition: "a memorable phrase or motto"
    },
    // New week
    {
        clue: "two wheels",
        answer: "bicycle", 
        roots: [{ english: "two", languageName: "Greek", languageWord: "bi-" }, { english: "wheel", languageName: "Greek", languageWord: "kyklos" }],
        definition: "a two-wheeled transport",
    },
    {
        clue: "star sailor",
        answer: "astronaut", 
        roots: [{ english: "star", languageName: "Greek", languageWord: "astro" }, { english: "sailor", languageName: "Greek", languageWord: "naut" }],
        definition: "one exploring space",
    },
    {
        clue: "beyond reality",
        answer: "surrealism", 
        roots: [{ english: "beyond", languageName: "French", languageWord: "sur" }, { english: "reality", languageName: "French", languageWord: "realisme" }],
        definition: "bizarre and dreamlike art",
    },
    {
        clue: "Sax's sound",
        answer: "saxophone",
        roots: [{ english: "Sax (surname)", languageName: "French", languageWord: "Sax"}, { english: "sound", languageName: "Greek", languageWord: "phone"}],
        definition: "type of woodwind instrument",
    },
    {
        clue: "empty orchestra",
        answer: "karaoke", 
        roots: [{ english: "empty", languageName: "Japanese", languageWord: "kara" }, { english: "orchestra", languageName: "Japanese", languageWord: "oke" }],
        definition: "singing with just the music",
    },
    {
        clue: "fast walker",
        answer: "giraffe",
        roots: [{english: "fast walker",languageName: "Arabic",languageWord: "zarafa"}],
        definition: "a tall, long-necked animal"
    },
    {
        clue: "know apart",
        answer: "Diagnosis",
        roots: [{english: "apart",languageName: "Greek",languageWord: "dia"},{english: "knowledge",languageName: "Greek",languageWord: "gnosis"}],
        definition: "identification of a condition or problem"
    },
    // New week
    {
        clue: "one marriage",
        answer: "monogamy",
        roots: [{ english: "one", languageName: "Greek", languageWord: "monos"}, { english: "marriage", languageName: "Greek", languageWord: "gamos"}],
        definition: "one marriage at one time",
    },
    {
        clue: "fear of spiders",
        answer: "arachnophobia",
        roots: [{ english: "spider", languageName: "Greek", languageWord: "arakhne"}, { english: "fear", languageName: "Greek", languageWord: "phobia"}],
        definition: "literally fear of spiders",
    },
    {
        clue: "hand writing",
        answer: "manuscript",
        roots: [{english: "hand",languageName: "Latin",languageWord: "manus"},{english: "to write",languageName: "Latin",languageWord: "scribere"}],
        definition: "a handwritten document"
    },
    {
        clue: "self moving",
        answer: "automaton",
        roots: [{english: "self",languageName: "Greek",languageWord: "auto"},{english: "moving",languageName: "Greek",languageWord: "matos"}],
        definition: "a machine that moves by itself"
    },
    {
        clue: "the spirit/essence",
        answer: "alcohol",
        roots: [{ english: "the", languageName: "Arabic", languageWord: "al" },{ english: "chemical spirit/essence", languageName: "Arabic", languageWord: "kohl" }],
        definition: "a drinkable intoxicating liquid",
        authorsNote: "There are several translations of \"kohl\", but I opted for this one since it's the closest to the English understanding of the term."
    },
    {
        clue: "sensing together",
        answer: "synesthesia",
        roots: [{ english: "together", languageName: "Greek", languageWord: "syn" }, { english: "sensation", languageName: "Greek", languageWord: "aisthesis" }],
        definition: "condition where the senses blend together"
    },
    {
        clue: "way of adapting the spirit",
        answer: "aikido",
        roots: [{ english: "together", languageName: "Japanese", languageWord: "ai" }, { english: "spirit", languageName: "Japanese", languageWord: "ki" }, { english: "way/path", languageName: "Japanese", languageWord: "do" }],
        definition: "Japanese martial art focused on harmony"
    },
    // New week
    {
        clue: "fire mountain",
        answer: "volcano",
        roots: [{ english: "fire, burning", languageName: "Latin", languageWord: "vulcanus" }],
        definition: "a mountain that erupts molten rock"
    },
    {
        clue: "ice hill",
        answer: "iceberg",
        roots: [{ english: "ice", languageName: "English", languageWord: "ice" }, { english: "hill/mountain", languageName: "Old Norse", languageWord: "berg" }],
        definition: "a large floating mass of ice"
    },
    {
        clue: "middle earth",
        answer: "Mediterranean",
        roots: [{ english: "middle", languageName: "Latin", languageWord: "medius" }, { english: "earth", languageName: "Latin", languageWord: "terra" }],
        definition: "region surrounding a large inland sea"
    },
    {
        clue: "house management",
        answer: "economy",
        roots: [{ english: "house", languageName: "Greek", languageWord: "oikos" }, { english: "manage/keep", languageName: "Greek", languageWord: "nemein" }],
        definition: "management of resources or wealth"
    },
    {
        clue: "study of secrets",
        answer: "cryptology",
        roots: [{ english: "secret", languageName: "Greek", languageWord: "kryptos" }, { english: "study", languageName: "Greek", languageWord: "logia" }],
        definition: "study of codes and secret communication"
    },
    {
        clue: "gold flower",
        answer: "chrysanthemum",
        roots: [{ english: "gold", languageName: "Greek", languageWord: "khrysos"}, { english: "flower", languageName: "Greek", languageWord: "anthemon"}],
        definition: "a variety of golden flower"
    },
    {
        clue: "the soda ashes",
        answer: "alkaline",
        roots: [{ english: "the", languageName: "Arabic", languageWord: "al"},{ english: "ashes of saltwort", languageName: "Arabic", languageWord: "qaly" }],
        definition: "having a high pH"
    },
    // new week
    {
        clue: "hundred foot",
        answer: "centipede",
        roots: [{ english: "hundred", languageName: "Latin", languageWord: "centum" }, { english: "foot", languageName: "Latin", languageWord: "ped" }],
        definition: "insect with many legs"
    },
    {
        clue: "mind healer",
        answer: "psychiatrist",
        roots: [{ english: "mind", languageName: "Greek", languageWord: "psyche" }, { english: "healing, care", languageName: "Greek", languageWord: "iatreia" }],
        definition: "a doctor specializing in mental health"
    },
    {
        clue: "the sun stands still",
        answer: "solstice",
        roots: [{ english: "sun", languageName: "Latin", languageWord: "sol" }, { english: "stand still", languageName: "Latin", languageWord: "sistere" }],
        definition: "when the sun reaches its highest or lowest point",
    }, 
    {
        clue: "the king is helpless",
        answer: "checkmate",
        roots: [{ english: "king", languageName: "Persian", languageWord: "shah"}, { english: "helpless, astonished", languageName: "Persian", languageWord: "mat"}],
        definition: "a losing position in chess"
    },
    {
        clue: "sacred carvings",
        answer: "hieroglyphics",
        roots: [{ english: "sacred", languageName: "Greek", languageWord: "hieros"}, { english: "carving", languageName: "Greek", languageWord: "glyph"}],
        definition: "ancient Egyptian writing",
    },
    {
        clue: "expert, sorcerer",
        answer: "kahuna",
        roots: [{ english: "master, sorcerer, doctor", languageName: "Hawaiian", languageWord: "kahuna"}],
        definition: "a very important person",
        authorsNote: "This word has many definitions, but all attribute to word to referencing some form of expert."
    },
    {
        clue: "fart goblin",
        answer: "pumpernickel",
        roots: [{ english: "fart", languageName: "German", languageWord: "pumpern"}, { english: "goblin, devil", languageName: "German", languageWord: "nickel"}],
        definition: "type of dark rye bread",
        authorsNote: "I know this is a very difficult one... but I saw \"fart goblin\" and knew I had to include it."
    },
    // new week
    {
        clue: "power from the people",
        answer: "democracy",
        roots: [{ english: "people", languageName: "Greek", languageWord: "demos" }, { english: "power", languageName: "Greek", languageWord: "kratia" }],
        definition: "government ruled by the people"
    },
    {
        clue: "earth heat",
        answer: "geothermal",
        roots: [{ english: "earth", languageName: "Greek", languageWord: "geo" }, { english: "heat", languageName: "Greek", languageWord: "therme" }],
        definition: "pertaining to heat from the earth"
    },
    {
        clue: "viewing all",
        answer: "panorama",
        roots: [{ english: "all", languageName: "Greek", languageWord: "pan" }, { english: "view", languageName: "Greek", languageWord: "horama" }],
        definition: "a wide view of a surrounding area",
    },
    {
        clue: "hide away from",
        answer: "abscond",
        roots: [{ english: "away from", languageName: "Latin", languageWord: "ab" }, { english: "hide", languageName: "Latin", languageWord: "condere" }],
        definition: "depart suddenly"
    },
    {
        clue: "smoked chili",
        answer: "chipotle",
        roots: [{ english: "chili", languageName: "Nahuatl", languageWord: "chilli"}, { english: "smoke", languageName: "Nahuatl", languageWord: "poctli"}],
        definition: "a smoke-dried chili pepper"
    },
    {
        clue: "warrior wearing a bearskin shirt",
        answer: "berserker",
        roots: [{ english: "bear", languageName: "Old Norse", languageWord: "ber"}, { english: "shirt", languageName: "Old Norse", languageWord: "serkr"}],
        definition: "a Norse warrior"
    },
    {
        clue: "season",
        answer: "monsoon",
        roots: [{ english: "season", languageName: "Arabic", languageWord: "mausim" }],
        definition: "seasonal heavy rains"
    },
    // new week
    {
        clue: "folding paper",
        answer: "origami", 
        roots: [{ english: "folding", languageName: "Japanese", languageWord: "ori" }, { english: "paper", languageName: "Japanese", languageWord: "kami" }],
        definition: "the art of paper folding",
    },
    {
        clue: "turning",
        answer: "tornado",
        roots: [{ english: "to turn", languageName: "Spanish", languageWord: "tornar"}],
        definition: "a rotating storm"
    },
    {
        clue: "sound picture",
        answer: "sonogram",
        roots: [{ english: "sound", languageName: "Latin", languageWord: "sonus"}, { english: "picture", languageName: "Latin", languageWord: "-gram"}],
        definition: "medical imaging using sound"
    },
    {
        clue: "wanderer",
        answer: "planet",
        roots: [{ english: "wanderer", languageName: "Greek", languageWord: "planetos"}],
        definition: "celestial body that orbits a star",
        authorsNote: "This may be my favorite word origin; thinking of a planet as something that wanders is so poetic to me."
    },
    {
        clue: "ring",
        answer: "bagel",
        roots: [{ english: "ring", languageName: "Yiddish", languageWord: "beygl"}],
        definition: "a ring-shaped bread roll"
    },
    {
        clue: "singing wolf",
        answer: "cantaloupe",
        roots: [{ english: "sing", languageName: "Latin", languageWord: "canta"}, { english: "wolf", languageName: "Latin", languageWord: "lupus"}],
        definition: "a small melon",
        authorsNote: "Cantaloupe is named after the region where it was first grown, Cantalupo." 
    },
    {
        clue: "with a key",
        answer: "conclave",
        roots: [{ english: "with", languageName: "Latin", languageWord: "con" }, { english: "key", languageName: "Latin", languageWord: "clavis" }],
        definition: "where cardinals elect a new pope",
        authorsNote: "\"With a key\" refers to the fact that the cardinals are locked in the room."
    }
];
