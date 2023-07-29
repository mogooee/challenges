import { ChartDataType } from "../ChartMaker";
import { COLORS, SIZE } from "../constants/index";

const drawPieChart = (canvas: CanvasRenderingContext2D, data: ChartDataType) => {
  const labels: string[] = Object.keys(data);
  const ratios: number[] = Object.values(data);
  const sum = ratios.reduce((acc, cur) => acc + cur, 0);
  const pieRatio = ratios.map((ratio) => Math.round((ratio / sum) * 360));

  const labelWidth = SIZE.CANVAS.WIDTH / labels.length;
  let startAngle = 0;
  let labelX = SIZE.PIE_CHART.COLOR_BOX,
    labelY = SIZE.CANVAS.HEIGHT - SIZE.PIE_CHART.OFFSET_LABEL_Y;

  const drawPie = (startAngle: number, endAngle: number, color: string) => {
    const RADIAN = Math.PI / 180;
    const [PIE_X, PIE_Y] = [SIZE.CANVAS.WIDTH / 2, SIZE.CANVAS.HEIGHT / 2];
    canvas.beginPath();
    canvas.moveTo(PIE_X, PIE_Y);
    canvas.arc(PIE_X, PIE_Y, SIZE.PIE_CHART.RADIUS, startAngle * RADIAN, endAngle * RADIAN);
    canvas.fillStyle = color;
    canvas.fill();
    canvas.stroke();
  };

  const drawLabels = (x: number, y: number, label: string) => {
    canvas.rect(
      x - SIZE.PIE_CHART.OFFSET_LABEL_X,
      y - SIZE.PIE_CHART.OFFSET_LABEL_Y,
      SIZE.PIE_CHART.COLOR_BOX,
      SIZE.PIE_CHART.COLOR_BOX
    );
    canvas.fill();
    canvas.font = "14px serif";
    canvas.fillStyle = "black";
    canvas.fillText(label, x, y);
  };

  pieRatio.forEach((currentAngle, i) => {
    const endAngle = startAngle + currentAngle;
    drawPie(startAngle, endAngle, COLORS[i]);
    drawLabels(labelX, labelY, labels[i]);
    startAngle += currentAngle;
    labelX += labelWidth;
  });
};

export default drawPieChart;
