import { ChartDataType } from "components/ChartMaker";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { SIZE } from "../constants";
import ToggleBtn from "./ToggleBtn";
import drawBarChart from "utils/drawBarChart";
import drawPieChart from "utils/drawPieChart";
import drawOutline from "utils/drawOutline";

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
  const animationId = useRef([0]);

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
    animationId.current.forEach((id) => {
      cancelAnimationFrame(id);
    });
    ctx.clearRect(0, 0, SIZE.CANVAS.WIDTH, SIZE.CANVAS.HEIGHT);
    drawOutline(ctx);
    if (mode === "PIE") {
      drawPieChart(ctx, data, animationId);
    } else if (mode === "BAR") {
      drawBarChart(ctx, data, animationId);
    }
  }, [mode, data]);

  return (
    <>
      <ControlBox>
        <button onClick={() => setChartOpen(false)}>back</button>
        <ToggleBtn mode={mode} onClick={toggleMode}></ToggleBtn>
      </ControlBox>
      <canvas id="chart" width={SIZE.CANVAS.WIDTH} height={SIZE.CANVAS.HEIGHT}></canvas>
    </>
  );
};

export default Chart;
