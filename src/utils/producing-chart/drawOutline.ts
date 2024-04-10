import { SIZE } from "../../constants/producing-chart";

const drawOutline = (canvas: CanvasRenderingContext2D) => {
  canvas.beginPath();
  canvas.moveTo(0, 0);
  canvas.lineTo(0, SIZE.CANVAS.HEIGHT);
  canvas.lineTo(SIZE.CANVAS.WIDTH, SIZE.CANVAS.HEIGHT);
  canvas.lineTo(SIZE.CANVAS.WIDTH, 0);
  canvas.lineTo(0, 0);
  canvas.stroke();
  canvas.closePath();
};

export default drawOutline;
