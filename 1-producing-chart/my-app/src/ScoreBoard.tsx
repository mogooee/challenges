import styled from "styled-components";
import { SCORE } from "./constants";
import { ChartDataType } from "./ChartMaker";

const ScoreTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  gap: 20px;

  label,
  input {
    border: 1px solid black;
    border-radius: 8px;
    padding: 10px;
  }

  input {
    outline: none;
    text-align: center;
  }
`;

const ControlBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 60px;

  button {
    border: 1px solid black;
    border-radius: 8px;
    padding: 15px;
    cursor: pointer;
    background: inherit;
    &:hover {
      background: lightGray;
    }
  }
`;

interface InputType {
  name: string;
  score: number;
  setScores: React.Dispatch<React.SetStateAction<ChartDataType>>;
}

const isValidScore = (score: number) => {
  if (score < SCORE.MIN || score > SCORE.MAX) return false;
  return true;
};

const Input = ({ name, score, setScores }: InputType) => {
  const blankMsg = "fill in the score";

  const setScore = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newScore = Number(event.target.value);
    if (!isValidScore(newScore)) return;
    setScores((prevScores) => ({ ...prevScores, [name]: newScore }));
  };

  return (
    <>
      <label htmlFor={name}>{name}</label>
      <input id={name} type="number" value={score || ""} placeholder={blankMsg} onChange={setScore}></input>
    </>
  );
};

interface ScoreBoardType {
  scores: ChartDataType;
  setScores: React.Dispatch<React.SetStateAction<ChartDataType>>;
  resetScores: (event: React.MouseEvent<HTMLButtonElement>) => void;
  setChartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScoreBoard = ({ scores, resetScores, setScores, setChartOpen }: ScoreBoardType) => {
  const hasBlankScore: boolean = Object.values(scores).filter((score) => score === 0).length > 0;

  const openChart = () => {
    setChartOpen(true);
  };

  return (
    <div>
      <ScoreTable>
        <span>Student</span>
        <span>Score</span>
        {Object.keys(scores).map((student) => (
          <Input key={student} name={student} score={scores[student]} setScores={setScores} />
        ))}
      </ScoreTable>
      <ControlBox>
        <button disabled={hasBlankScore} onClick={openChart}>
          Make Chart
        </button>
        <button onClick={resetScores}>Reset Data</button>
      </ControlBox>
    </div>
  );
};

export default ScoreBoard;
