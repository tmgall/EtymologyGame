const Keyboard = () => {
    const keys = [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["Z", "X", "C", "V", "B", "N", "M", "Back"]
    ];
  
    return (
      <div className="flex flex-col gap-2 w-full max-w-96 mx-auto">
        {keys.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex w-full justify-center gap-1"
          >
            {row.map((key, index) => (
              <button
                key={index}
                className="flex-1 h-12 bg-gray-200 rounded-md text-center text-lg font-semibold hover:bg-gray-300 active:bg-gray-400"
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
  