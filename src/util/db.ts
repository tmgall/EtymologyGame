const DB_NAME = 'LexiconDB';
const STORE_NAME = 'puzzles';
const DB_VERSION = 1;

export interface PuzzleData {
  puzzleNumber: number;
  originUsed: boolean;
  extraHintUsed: boolean;
  puzzleRevealed: boolean;
  puzzleCompleted: boolean;
  puzzleCompletedOnTime: boolean;
  streakAtTime: number;
  bestStreak: number;
}

export const blankPuzzleData = (puzzleNumber: number, streak: number, bestStreak: number): PuzzleData => {
  return {
    puzzleNumber: puzzleNumber,
    originUsed: false,
    extraHintUsed: false,
    puzzleRevealed: false,
    puzzleCompleted: false,
    puzzleCompletedOnTime: false,
    streakAtTime: streak,
    bestStreak: bestStreak,
  };
}

let db: IDBDatabase;

export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'puzzleNumber' });
      }
    };
  });
};

export const savePuzzle = (data: PuzzleData): Promise<number> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(data);
    
    request.onsuccess = () => resolve(request.result as number);
    request.onerror = () => reject(request.error);
  });
};

export const getPuzzle = (puzzleNumber: number): Promise<PuzzleData | undefined> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(puzzleNumber);
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getAllPuzzles = (): Promise<PuzzleData[]> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const updatePuzzleField = async (
  puzzleNumber: number,
  field: keyof Omit<PuzzleData, 'puzzleNumber'>,
  value: boolean | number
): Promise<void> => {
  const puzzle = await getPuzzle(puzzleNumber);
  if (puzzle) {
    puzzle[field] = value as never;
    await savePuzzle(puzzle);
  }
};

export const getPuzzleCount = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.count();
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getNumHintsUsed = (puzzleNumber: number): Promise<number> => {
  return getPuzzle(puzzleNumber).then((puzzle) => {
    if (puzzle) {
      return (puzzle.originUsed ? 1 : 0) + (puzzle.extraHintUsed ? 1 : 0) + (puzzle.puzzleRevealed ? 1 : 0);
    }
    return 0;
  });
}

export const markPuzzleCompleted = async (puzzleNumber: number): Promise<void> => {
  const puzzle = await getPuzzle(puzzleNumber);
  if (puzzle) {
    puzzle.puzzleCompleted = true;
    puzzle.puzzleCompletedOnTime = true;
    await savePuzzle(puzzle);
  }
};
