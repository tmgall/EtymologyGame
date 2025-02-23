const AnswerSquares = () => {
    const numBoxes = 10;
  
    return (
        <div className="flex w-full max-w-96 gap-2 my-6">
            {Array.from({ length: numBoxes }).map((_, index) => (
            <   div key={index} className="flex-1 w-full h-10 border-2 border-gray-500 rounded flex items-center justify-center text-lg font-bold">
            </div>
            ))}
        </div>
    );
  };
  
  export default AnswerSquares;