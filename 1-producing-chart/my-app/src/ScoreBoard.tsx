import { SCORE } from "./constants";

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
