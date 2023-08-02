import { ChartDataType } from "../components/ChartMaker";
import { ANIMATION, COLORS, SIZE } from "../constants/index";

const drawPieChart = (
  canvas: CanvasRenderingContext2D,
  data: ChartDataType,
  animationId: React.MutableRefObject<number[]>
) => {
  const labels: string[] = Object.keys(data);
  const ratios: number[] = Object.values(data);
  const sum = ratios.reduce((acc, cur) => acc + cur, 0);

  const labelWidth = SIZE.CANVAS.WIDTH / labels.length;
  let startAngle = 0;
  let labelX = SIZE.PIE_CHART.COLOR_BOX,
    labelY = SIZE.CANVAS.HEIGHT - SIZE.PIE_CHART.OFFSET_LABEL_Y;

  const drawPie = (index: number, startAngle: number, endAngle: number, color: string) => {
    let movingAngle = startAngle;

    const RADIAN = Math.PI / 180;
    const [PIE_X, PIE_Y] = [SIZE.CANVAS.WIDTH / 2, SIZE.CANVAS.HEIGHT / 2];

    const animation = () => {
      canvas.beginPath();
      canvas.moveTo(PIE_X, PIE_Y);
      canvas.arc(PIE_X, PIE_Y, SIZE.PIE_CHART.RADIUS, startAngle * RADIAN, movingAngle * RADIAN);
      canvas.stroke();

      if (movingAngle === endAngle) {
        cancelAnimationFrame(animationId[index]);
        return;
      }

      movingAngle = movingAngle < endAngle ? movingAngle + ANIMATION.PIE_CHART_MOVING_ANGLE : endAngle;
      animationId.current[index] = requestAnimationFrame(animation);
    };

    animation();

    // 차트 내 색상 지표
    canvas.beginPath();
    canvas.moveTo(PIE_X, PIE_Y);
    const deg = startAngle + (endAngle - startAngle) / 2;
    const rectX = Math.cos(deg * RADIAN) * SIZE.PIE_CHART.RADIUS * 0.7 + PIE_X;
    const rectY = Math.sin(deg * RADIAN) * SIZE.PIE_CHART.RADIUS * 0.7 + PIE_Y;
    canvas.rect(rectX, rectY, SIZE.PIE_CHART.COLOR_BOX, SIZE.PIE_CHART.COLOR_BOX);
    canvas.fillStyle = color;
    canvas.fill();

    canvas.closePath();
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

  ratios.forEach((ratio, i) => {
    const currentAngle = Math.round((ratio / sum) * 360);
    const endAngle = startAngle + currentAngle;
    drawPie(i, startAngle, endAngle, COLORS[i]);
    drawLabels(labelX, labelY, labels[i]);
    startAngle += currentAngle;
    labelX += labelWidth;
  });
};

export default drawPieChart;
