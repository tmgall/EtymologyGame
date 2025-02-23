const Keyboard = () => {
    const keys = [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["Try", "Z", "X", "C", "V", "B", "N", "M", "Back"]
    ];
  
    return (
      <div className="flex flex-col gap-2 w-full max-w-96 mx-auto mt-2">
        {keys.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex w-full justify-center gap-1"
          >
            {row.map((key, index) => (
              <button
                key={index}
                className="keyboardButton"
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
  