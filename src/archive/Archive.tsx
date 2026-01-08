import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import ArchiveTile from "./ArchiveTile";
import { WORD_LIST } from "../assets/WordList";
import { getTodaysPuzzleNumber, getDateFromPuzzleNumber } from "../util/Date";
import { getAllPuzzles, PuzzleData } from "../util/db";

const getDifficulty = (puzzleNumber: number) => {
  const dayIndex = puzzleNumber % 7;
  if (dayIndex === 0 || dayIndex === 6) return "Hard";
  if (dayIndex === 1 || dayIndex === 2) return "Easy";
  return "Medium";
};

const getDayOfWeek = (puzzleNumber: number) => {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return dayNames[puzzleNumber % 7]
};

const Archive = () => {
  const [puzzles, setPuzzles] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const todaysPuzzleNumber = getTodaysPuzzleNumber();
      const allPuzzleData: PuzzleData[] = await getAllPuzzles();
      const puzzleList = WORD_LIST
        .slice(0, todaysPuzzleNumber)
        .map((puzzleConfig, index) => {
          const puzzleData = allPuzzleData.find((p) => p.puzzleNumber === index + 1);
          return {
            clue: puzzleConfig.clue,
            puzzleNumber: index + 1,
            date: getDateFromPuzzleNumber(index + 1),
            dayOfWeek: getDayOfWeek(index + 1),
            difficulty: getDifficulty(index + 1),
            isSolved: puzzleData?.puzzleCompleted || false,
            isStarted: puzzleData?.puzzleCompleted != undefined,
            hintsUsed: (puzzleData?.originUsed ? 1 : 0) + (puzzleData?.extraHintUsed ? 1 : 0) + (puzzleData?.puzzleRevealed ? 1 : 0),
          };
        })
        .reverse();
      setPuzzles(puzzleList);
    };
    fetchData();
  }, []);

  return (
    <div className="support">
        <div className="header">
            <div className="headerText">
                <span className="headerName">archive</span>
            </div>
            <div className="headerButtons">
                <Link to="/" className="headerButton" aria-label="Back to Home">
                    <IoHome className="headerIconButton archiveHomeIcon" />
                </Link>
            </div>
        </div>
        <div className="archiveList">
            {
                puzzles.map((puzzle) => (
                    <ArchiveTile
                        todaysPuzzleNumber={getTodaysPuzzleNumber()}
                        key={puzzle.puzzleNumber}
                        puzzleNumber={puzzle.puzzleNumber}
                        date={puzzle.date}
                        dayOfWeek={puzzle.dayOfWeek}
                        difficulty={puzzle.difficulty}
                        isSolved={puzzle.isSolved}
                        isStarted={puzzle.isStarted}
                        hintsUsed={puzzle.hintsUsed}
                    />
                ))
            }
        </div>
    </div>
  );
};

export default Archive;
