import { useState } from "react";
import Keyboard from "./components/Keyboard";
import { WORD_LIST } from "./assets/WordList";
import { Link } from "react-router-dom";

const App = () => {
  const today = WORD_LIST[0];
  const [showOrigin, setShowOrigin] = useState(false);
  const [showRoot1, setShowRoot1] = useState(false);
  const [showRoot2, setShowRoot2] = useState(false);
  const [guess, setGuess] = useState<string[]>(Array(8).fill(""));
  const [selectedIndex, setSelectedIndex] = useState<number>();

  return (
    <div className="flex flex-col items-center justify-between min-h-dvh w-full p-4">
      <h1 className="text-6xl font-bold mt-4 max-w-96 mb-4">Lexicon</h1>

      <p className="font-bold text-3xl text-gray-700 mt-2 text-center max-w-md mb-4">{"Clue: literally, " + today.clue}</p>

      <div className="flex w-full max-w-96 gap-2 mb-4">
            {Array.from({ length: today.answer.length }).map((_, index) => (
                <button 
                  key={index} 
                  className={selectedIndex == index ? "answerLetterTileSelected" : "answerLetterTile"}
                  onClick={() => setSelectedIndex(index)}
                >
                    {guess[index]}  
                </button>
            ))}
        </div>

      <button
        className="hintButton"
        onClick={() => setShowOrigin(!showOrigin)}
      >
        {showOrigin ? "Language(s) of origin: " + today.rootLanguages : "Hint 1: language(s) of origin"}
      </button>

      <button
        className="hintButton"
        onClick={() => setShowRoot1(!showRoot1)}
      >
        {showRoot1 ? "First root: " + today.firstRoot : "Hint 2: first root"}
      </button>

      <button
        className="hintButton"
        onClick={() => setShowRoot2(!showRoot2)}
      >
        {showRoot2 ? "Second root: " + today.secondRoot : "Hint 3: second root"}
      </button>
      
      <button
        className="hintButton"
        onClick={() => {}}
      >
        {"Reveal answer"}
      </button>

      <Keyboard />

      <footer className="w-full text-center text-gray-600 text-sm mt-4 pb-2">
        <div className="flex justify-center gap-4">
          <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:underline">Terms of Service</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>
      </footer>
    </div>
  );
};

export default App;
