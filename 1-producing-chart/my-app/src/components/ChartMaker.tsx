import { useState } from "react";
import styled from "styled-components";
import Chart from "./Chart";
import { STUDENTS } from "../constants";
import ScoreBoard from "./ScoreBoard";

const StyledChart = styled.div`
  min-height: 100vh;
  display: grid;
  justify-content: center;
  align-content: center;
  gap: 20px;
  text-align: center;
  font-family: monospace;

  button {
    border: 1px solid black;
    border-radius: 8px;
    padding: 10px;
    cursor: pointer;
    background: inherit;
    &:hover {
      background: lightGray;
    }
  }
`;

export const Box = styled.div`
  border: 1px solid black;
  border-radius: 8px;
  padding: 20px;
`;

const Head = styled(Box)`
  font-weight: 600;
  font-size: 25px;
`;

const Body = styled(Box)`
  width: 300px;
  height: 450px;
  padding: 35px 20px;
  font-size: 15px;
`;

export interface ChartDataType {
  [name: string]: number;
}

const ChartMaker = () => {
  const initScores = STUDENTS.reduce((prev, cur) => ({ ...prev, [cur]: 0 }), {});
  const [scores, setScores] = useState<ChartDataType>(initScores);
  const [chartOpen, setChartOpen] = useState<boolean>(false);

  const resetScores = () => {
    setScores(initScores);
  };

  return (
    <StyledChart>
      <Head>Games Score Chart</Head>
      <Body>
        {chartOpen ? (
          <Chart data={scores} setChartOpen={setChartOpen} />
        ) : (
          <ScoreBoard scores={scores} resetScores={resetScores} setScores={setScores} setChartOpen={setChartOpen} />
        )}
      </Body>
    </StyledChart>
  );
};

export default ChartMaker;
