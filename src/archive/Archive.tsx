import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { WORD_LIST } from "../assets/WordList";
import { getTodaysPuzzleNumber } from "../util/Date";
import { getAllPuzzles, PuzzleData } from "../util/db";

const LAUNCH_DATE = new Date("November 17, 2025 00:00:00");
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

const puzzleNumberForDate = (date: Date): number | null => {
  // Compare calendar days. Using Math.round absorbs the 1-hour DST drift
  // that occurs when the launch date and target date straddle a DST change.
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const launch = new Date(
    LAUNCH_DATE.getFullYear(),
    LAUNCH_DATE.getMonth(),
    LAUNCH_DATE.getDate()
  );
  const days = Math.round(
    (d.getTime() - launch.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (days < 0) return null;
  return days + 1;
};

interface PuzzleStatus {
  isSolved: boolean;
  isStarted: boolean;
  hintsUsed: number;
}

const Archive = () => {
  const [statusMap, setStatusMap] = useState<Map<number, PuzzleStatus>>(new Map());
  const todaysPuzzleNumber = getTodaysPuzzleNumber();
  const maxAvailablePuzzle = Math.min(todaysPuzzleNumber, WORD_LIST.length);

  useEffect(() => {
    const fetchData = async () => {
      const allPuzzleData: PuzzleData[] = await getAllPuzzles();
      const map = new Map<number, PuzzleStatus>();
      allPuzzleData.forEach((p) => {
        map.set(p.puzzleNumber, {
          isSolved: p.puzzleCompleted || false,
          isStarted: p.puzzleCompleted !== undefined,
          hintsUsed:
            (p.originUsed ? 1 : 0) +
            (p.extraHintUsed ? 1 : 0) +
            (p.puzzleRevealed ? 1 : 0),
        });
      });
      setStatusMap(map);
    };
    fetchData();
  }, []);

  // Build list of months from current month back to launch month (newest first).
  const months = useMemo(() => {
    const list: { year: number; month: number }[] = [];
    const today = new Date();
    let y = today.getFullYear();
    let m = today.getMonth();
    const launchY = LAUNCH_DATE.getFullYear();
    const launchM = LAUNCH_DATE.getMonth();
    while (y > launchY || (y === launchY && m >= launchM)) {
      list.push({ year: y, month: m });
      m--;
      if (m < 0) {
        m = 11;
        y--;
      }
    }
    return list;
  }, []);

  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);

  const solvedCount = Array.from(statusMap.values()).filter((s) => s.isSolved).length;

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

      <div className="archiveStats">
        {solvedCount} of {maxAvailablePuzzle} solved
      </div>

      <div className="archiveLegend">
        <span className="archiveLegendItem">
          <span className="archiveLegendSwatch solved" />
          Solved
        </span>
        <span className="archiveLegendItem">
          <span className="archiveLegendSwatch started" />
          Started
        </span>
        <span className="archiveLegendItem">
          <span className="archiveLegendSwatch today" />
          Today
        </span>
        <span className="archiveLegendItem">
          <span className="archiveLegendSwatch available" />
          Unplayed
        </span>
      </div>

      <div className="archiveCalendar">
        {months.map(({ year, month }) => {
          const daysInMonth = new Date(year, month + 1, 0).getDate();
          const firstDayWeekday = new Date(year, month, 1).getDay();
          const cells: React.ReactNode[] = [];

          for (let i = 0; i < firstDayWeekday; i++) {
            cells.push(
              <div key={`empty-${i}`} className="archiveDayCell empty" />
            );
          }

          for (let day = 1; day <= daysInMonth; day++) {
            const cellDate = new Date(year, month, day);
            cellDate.setHours(0, 0, 0, 0);
            const pn = puzzleNumberForDate(cellDate);
            const isFuture = cellDate.getTime() > todayMidnight.getTime();
            const isPreLaunch = pn === null;
            const isToday = pn !== null && pn === todaysPuzzleNumber;
            const isAvailable =
              pn !== null && pn <= maxAvailablePuzzle && !isFuture;
            const status = pn !== null ? statusMap.get(pn) : undefined;
            const isSolved = status?.isSolved || false;
            const isStarted = !isSolved && (status?.isStarted || false);

            const classes = [
              "archiveDayCell",
              isPreLaunch && "preLaunch",
              isFuture && "future",
              isAvailable && "available",
              isToday && "today",
              isSolved && "solved",
              isStarted && "started",
            ]
              .filter(Boolean)
              .join(" ");

            const content = (
              <>
                <span className="archiveDayNumber">{day}</span>
                {pn !== null && !isPreLaunch && !isFuture && (
                  <span className="archiveDayPuzzle">#{pn}</span>
                )}
              </>
            );

            if (isAvailable) {
              const linkTo = isToday ? "/" : `/archive/${pn}`;
              const hintText = status
                ? ` · ${status.hintsUsed} hint${status.hintsUsed === 1 ? "" : "s"}`
                : "";
              const statusText = isSolved
                ? ` · Solved${hintText}`
                : isStarted
                ? ` · Started${hintText}`
                : "";
              const title = `Puzzle #${pn}${statusText}`;
              cells.push(
                <Link
                  to={linkTo}
                  key={day}
                  className={classes}
                  title={title}
                  aria-label={title}
                >
                  {content}
                </Link>
              );
            } else {
              cells.push(
                <div key={day} className={classes} aria-hidden={isPreLaunch || isFuture}>
                  {content}
                </div>
              );
            }
          }

          return (
            <div className="archiveMonth" key={`${year}-${month}`}>
              <div className="archiveMonthHeader">
                {MONTH_NAMES[month]} {year}
              </div>
              <div className="archiveWeekdays">
                {WEEKDAY_LABELS.map((label, i) => (
                  <div key={i} className="archiveWeekday">
                    {label}
                  </div>
                ))}
              </div>
              <div className="archiveMonthGrid">{cells}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Archive;
