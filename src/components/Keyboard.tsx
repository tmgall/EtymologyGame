export interface KeyboardProps {
    onKeyPress: (key: string) => void;
    onBackspace: () => void;
    onSubmit: () => void;
}

const Keyboard = ({ onKeyPress, onBackspace, onSubmit }: KeyboardProps) => {
    const keys = [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Back"]
    ];

    const onClick = (key: string) => {
        if (key === "Back") {
            onBackspace();
        } else if (key === "Enter") {
            onSubmit();
        } else {
            onKeyPress(key);
        }
    }
  
    return (
      <div className="keyboard">
        {keys.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="keyboardRow"
          >
            {row.map((key, index) => (
              <button
                key={index}
                className="keyboardButton"
                onClick={() => onClick(key)}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  };
  
  export default Keyboard;
  