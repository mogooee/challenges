import { ChartDataType } from "../components/ChartMaker";
import { COLORS, SIZE } from "../constants";

const drawBarChart = (canvas: CanvasRenderingContext2D, data: ChartDataType) => {
  const labels: string[] = Object.keys(data);
  const ratios: number[] = Object.values(data);
  const maxY = Math.max(...ratios);
  const n = labels.length;
  const perWidth = SIZE.CANVAS.WIDTH / n;
  let x = perWidth / 2 / 2;

  const drawXAxis = (x: number, y: number) => {
    canvas.moveTo(0, y);
    canvas.lineTo(x, y);
  };

  const drawText = (text: string, x: number, y: number) => {
    const stringHalfLen = (SIZE.BAR_CHART.BAR_WIDTH - canvas.measureText(text).width) / 2;
    canvas.font = "14px serif";
    canvas.fillStyle = "black";
    canvas.fillText(text, x + stringHalfLen, y);
  };

  const drawBar = (x: number, y: number, height: number, color: string) => {
    canvas.rect(x, y, SIZE.BAR_CHART.BAR_WIDTH, -height);
    canvas.stroke();
    canvas.fillStyle = color;
    canvas.fill();
  };

  ratios.forEach((ratio, i) => {
    const perHeight = (SIZE.BAR_CHART.Y_AXIS - SIZE.BAR_CHART.CHART_Y) / maxY;
    const barHeight = perHeight * ratio;

    canvas.beginPath();
    drawXAxis(SIZE.CANVAS.WIDTH, SIZE.BAR_CHART.Y_AXIS);
    drawBar(x, SIZE.BAR_CHART.Y_AXIS, barHeight, COLORS[i]);
    drawText(String(ratio), x, SIZE.BAR_CHART.Y_AXIS - barHeight - SIZE.BAR_CHART.OFFSET_VALUE);
    drawText(labels[i], x, SIZE.CANVAS.HEIGHT - SIZE.BAR_CHART.LABELS_HEIGHT);

    x += perWidth;
  });
};

export default drawBarChart;
