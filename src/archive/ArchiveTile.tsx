import { Link } from "react-router-dom";

interface ArchiveTileProps {
    todaysPuzzleNumber: number;
    puzzleNumber: number;
    date: string;
    dayOfWeek: string;
    difficulty: string;
    isSolved: boolean;
    isStarted: boolean;
    hintsUsed: number;
}

const ArchiveTile = ({ todaysPuzzleNumber, puzzleNumber, date, dayOfWeek, difficulty, isSolved, isStarted, hintsUsed }: ArchiveTileProps) => {
    const linkTo = puzzleNumber === todaysPuzzleNumber ? '/' : `/archive/${puzzleNumber}`;
    return (
        <Link to={linkTo} className={`archiveTile ${isSolved ? 'solved' : ''}`}>
            <span className="archiveTileTitle">Puzzle #{puzzleNumber}</span>
            <div className="archiveTileSubHeader">
                <span>{dayOfWeek}</span>
                <span className="archiveTileDate">{date}</span>
            </div>
            <div className="archiveTileFooter">
                <span className="archiveTileDifficulty">{difficulty}</span>
                {isSolved && <span className="archiveTileSolved">
                    Completed &bull; {hintsUsed} Hint{hintsUsed === 1 ? '' : 's'}
                </span>}
                {!isSolved && isStarted && <span className="archiveTileSolved">
                    Started &bull; {hintsUsed} Hint{hintsUsed === 1 ? '' : 's'}
                </span>}
            </div>
        </Link>
    )
}

export default ArchiveTile;