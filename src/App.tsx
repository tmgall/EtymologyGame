import { useEffect } from "react";
import Puzzle from "./components/Puzzle";
import { getTodaysPuzzleNumber } from "./util/Date";

const App = () => {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
  
    setVh();
    // window.addEventListener('resize', setVh);
  
    // return () => window.removeEventListener('resize', setVh);
  }, []);
  
  const override = undefined;
  const puzzleNumber = override ?? getTodaysPuzzleNumber();
  return (
    <div>
      <div className="app">
        <Puzzle puzzleNumber={puzzleNumber}/>
      </div>
    </div>
  );
};

export default App;
