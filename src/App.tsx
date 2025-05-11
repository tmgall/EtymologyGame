import { useEffect } from "react";
import Puzzle from "./components/Puzzle";
import { getTodaysPuzzleNumber } from "./util/Date";

const App = () => {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
  
    // Set on load and after layout stabilizes
    window.addEventListener('load', setVh);
    setTimeout(setVh, 100); // in case 'load' is too early
    setVh();
  
    // Optional: Debounced resize listener (fires once after resize ends)
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(setVh, 150);
    };
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('load', setVh);
      window.removeEventListener('resize', handleResize);
    };
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
