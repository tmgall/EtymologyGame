import Puzzle from "./components/Puzzle";
import { getTodaysPuzzleNumber } from "./util/Date";

const App = () => {
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
