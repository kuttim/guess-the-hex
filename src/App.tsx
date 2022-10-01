import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState<string>();
  const [answers, setAnswers] = useState<string[]>([]);
  const [isWrong, setIsWrong] = useState<boolean>(false);

  const generateColors = () => {
    const correctColor = getRandomHexColor();
    setColor(correctColor);
    setAnswers(
      Array.from({ length: 3 }, () => getRandomHexColor())
        .concat(correctColor)
        .sort(() => Math.random() - 0.5)
    );
  };

  useEffect(() => {
    generateColors();
  }, []);

  const getRandomHexColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };
  const checkAnswer = (answer: string) => {
    if (answer === color) {
      setIsWrong(false);
      generateColors();
    } else {
      setIsWrong(true);
    }
  };

  return (
    <>
      <div className="App">
        <div className="color" style={{ backgroundColor: color }}></div>
      </div>
      <div className="buttons">
        <br />
        {answers.map((answer) => (
          <button key={answer} onClick={() => checkAnswer(answer)}>
            {answer}
          </button>
        ))}
        <br />
        <h1>
          {isWrong && <div>Wrong answer</div>}
          {!isWrong && <div>Correct answer</div>}
        </h1>
      </div>
    </>
  );
}

export default App;
