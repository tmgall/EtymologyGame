import { useState } from "react";
import Keyboard from "./components/Keyboard";
import AnswerSquares from "./components/AnswerSquares";

const App = () => {
  const clue = "\"far sight\""; // Placeholder clue text
  const [showOrigin, setShowOrigin] = useState(false); // Toggle for language origin
  const languageOrigin = "Greek, Latin"; // Placeholder language origin
  const firstRoot = "tele"; // Placeholder first root
  const [showRoot1, setShowRoot1] = useState(false); // Toggle for first root
  const secondRoot = "visio"; // Placeholder first root
  const [showRoot2, setShowRoot2] = useState(false); // Toggle for first root

  return (
    <div className="flex flex-col items-center justify-between min-h-dvh w-full p-4">
      {/* Title */}
      <h1 className="text-5xl font-bold mt-4">Name Placeholder</h1>

      <p className="text-3xl text-gray-700 mt-2 text-center max-w-md">{clue}</p>

      <button
        className="mt-2 px-4 py-2 border-2 border-gray-500 rounded text-gray-700 hover:bg-gray-100 active:bg-gray-200"
        onClick={() => setShowOrigin(!showOrigin)}
      >
        {showOrigin ? languageOrigin : "Language(s) of origin"}
      </button>

      <button
        className="mt-2 px-4 py-2 border-2 border-gray-500 rounded text-gray-700 hover:bg-gray-100 active:bg-gray-200"
        onClick={() => setShowRoot1(!showRoot1)}
      >
        {showRoot1 ? firstRoot : "First root"}
      </button>

      <button
        className="mt-2 px-4 py-2 border-2 border-gray-500 rounded text-gray-700 hover:bg-gray-100 active:bg-gray-200"
        onClick={() => setShowRoot2(!showRoot2)}
      >
        {showRoot2 ? secondRoot : "Second root"}
      </button>

      <AnswerSquares />

      <Keyboard />

      <footer className="w-full text-center text-gray-600 text-sm mt-4 pb-2">
        <div className="flex justify-center gap-4">
          <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
          <a href="/terms-of-service" className="hover:underline">Terms of Service</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
