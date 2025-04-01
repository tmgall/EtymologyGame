export interface WordData {
    number: string;
    clue: string;
    answer: string;
    rootLanguages: string;
    firstRoot: string;
    secondRoot: string;
    definition: string;
    shortExplanation: string;
}

export const WORD_LIST: WordData[] = [
    { 
        number: "1", 
        clue: "far vision", 
        answer: "television", 
        rootLanguages: "Greek and Latin", 
        firstRoot: "\"tele-\" is Greek for \"far\"", 
        secondRoot: "\"visio\" is Latin for \"vision\"",
        definition: "technology with a screen",
        shortExplanation: "\"tele-\" + \"visio\" = \"television\"",
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
    },
    {
        number: "5",
        clue: "small-seeing instrument",
        answer: "microscope", 
        rootLanguages: "Latin", 
        firstRoot: "\"micro-\" is Latin for \"small\"", 
        secondRoot: "\"-scopium\" is Latin for \"seeing instrument\"",
        definition: "an instrument to see very small objects",
        shortExplanation: "\"micro-\" + \"-scopium\" = \"microscope\"",
    },
    {
        number: "6",
        clue: "harbor wave",
        answer: "tsunami", 
        rootLanguages: "Japanese", 
        firstRoot: "\"tsu\" is Japanese for \"harbor\"", 
        secondRoot: "\"nami\" is Japanese for \"wave\"",
        definition: "a big wave",
        shortExplanation: "\"tsu\" + \"nami\" = \"tsunami\"",
    },
    {
        number: "7",
        clue: "joy from harm",
        answer: "Schadenfreude", 
        rootLanguages: "German", 
        firstRoot: "\"Schaden\" is German for \"harm\"", 
        secondRoot: "\"Freude\" is German for \"joy\"",
        definition: "joy from harm to others",
        shortExplanation: "\"Schaden\" + \"Freude\" = \"Schadenfreude\"",
    },
    {
        number: "8",
        clue: "two wheels",
        answer: "bicycle", 
        rootLanguages: "Greek", 
        firstRoot: "\"bi-\" is Greek for \"two\"", 
        secondRoot: "\"kyklos\" is Greek for \"wheel\"",
        definition: "a two-wheeled transport",
        shortExplanation: "\"bi-\" + \"kyklos\" = \"bicycle\"",
    },
    {
        number: "9",
        clue: "flesh devourer",
        answer: "carnivore",
        rootLanguages: "Latin", 
        firstRoot: "\"carni\" is Latin for \"flesh\"", 
        secondRoot: "\"vore\" is Latin for \"devour\"",
        definition: "one that eats meat",
        shortExplanation: "\"carni\" + \"vore\" = \"carnivore\"",
    },
    {
        number: "10",
        clue: "beyond reality",
        answer: "surrealism", 
        rootLanguages: "French", 
        firstRoot: "\"sur\" is French for \"beyond\"", 
        secondRoot: "\"realisme\" is French for \"reality\"",
        definition: "bizarre and dreamlike art",
        shortExplanation: "\"sur\" + \"realisme\" = \"surrealism\"",
    },
];