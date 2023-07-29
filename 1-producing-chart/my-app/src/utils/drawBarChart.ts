import { ChartDataType } from "../ChartMaker";
import { COLORS, SIZE } from "../constants";

const drawBarChart = (canvas: CanvasRenderingContext2D, data: ChartDataType) => {
  const labels: string[] = Object.keys(data);
  const ratios: number[] = Object.values(data);
  const maxY = Math.max(...ratios);
  const perHeight = (SIZE.BAR_CHART.Y_AXIS - SIZE.BAR_CHART.CHART_Y) / maxY;
  const n = labels.length;

  let x = SIZE.CANVAS.WIDTH / n / 2 / 2;
  const perWidth = SIZE.CANVAS.WIDTH / n;

  const drawXAxis = (x: number, y: number) => {
    canvas.moveTo(0, y);
    canvas.lineTo(x, y);
  };

  const drawBar = (x: number, height: number, color: string) => {
    canvas.rect(x, SIZE.BAR_CHART.Y_AXIS, SIZE.BAR_CHART.BAR_WIDTH, -height);
    canvas.stroke();
    canvas.fillStyle = color;
    canvas.fill();
  };

  const drawLabels = (x: number, label: string) => {
    canvas.fill();
    canvas.font = "14px serif";
    canvas.fillStyle = "black";
    canvas.fillText(label, x, SIZE.CANVAS.HEIGHT - SIZE.BAR_CHART.LABELS_HEIGHT);
  };

  ratios.forEach((ratio, i) => {
    canvas.beginPath();
    drawXAxis(SIZE.CANVAS.WIDTH, SIZE.BAR_CHART.Y_AXIS);
    drawBar(x, perHeight * ratio, COLORS[i]);
    drawLabels(x, labels[i]);
    x += perWidth;
  });
};

export default drawBarChart;
