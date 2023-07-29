import { ChartDataType } from "ChartMaker";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { SIZE } from "./constants";
import ToggleBtn from "./ToggleBtn";
import drawBarChart from "./utils/drawBarChart";
import drawPieChart from "./utils/drawPieChart";

const Outline = styled.div`
  border: 1px solid black;
  border-radius: 8px;
`;

const ControlBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export type ChartModeType = "PIE" | "BAR";

interface ChartType {
  data: ChartDataType;
  setChartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Chart = ({ data, setChartOpen }: ChartType) => {
  const [mode, setMode] = useState<ChartModeType>("PIE");

  const toggleMode = () => {
    setMode((prevMode) => {
      if (prevMode === "PIE") return "BAR";
      return "PIE";
    });
  };

  useEffect(() => {
    const canvas = document.getElementById("chart");
    const ctx = (canvas as HTMLCanvasElement).getContext("2d");
    if (!(ctx instanceof CanvasRenderingContext2D)) return;
    ctx.clearRect(0, 0, SIZE.CANVAS.WIDTH, SIZE.CANVAS.HEIGHT);
    if (mode === "PIE") {
      drawPieChart(ctx, data);
    } else if (mode === "BAR") {
      drawBarChart(ctx, data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
    <>
      <ControlBox>
        <button onClick={() => setChartOpen(false)}>back</button>
        <ToggleBtn mode={mode} onClick={toggleMode}></ToggleBtn>
      </ControlBox>
      <Outline>
        <canvas id="chart" width={SIZE.CANVAS.WIDTH} height={SIZE.CANVAS.HEIGHT}></canvas>
      </Outline>
    </>
  );
};

export default Chart;
