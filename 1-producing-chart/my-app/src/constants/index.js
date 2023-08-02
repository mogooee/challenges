const STUDENTS = ["Alex", "Tom", "Ryan", "Don", "Emma"];

const SIZE = {
  CANVAS: {
    WIDTH: 400,
    HEIGHT: 400,
  },
  PIE_CHART: {
    RADIUS: 135,
    COLOR_BOX: 15,
    OFFSET_LABEL_X: 5,
    OFFSET_LABEL_Y: 30,
    LABELS_HEIGHT: 25,
  },
  BAR_CHART: {
    BAR_WIDTH: 25,
    X_AXIS: 300,
    Y_AXIS: 340,
    CHART_X: 50,
    CHART_Y: 80,
    LABELS_HEIGHT: 30,
    OFFSET_VALUE: 10,
  },
};

const COLORS = ["#4287f5", "#f55442", "#f5c842", "#b0f542", "#8142f5", "#f54284"];

const SCORE = {
  MIN: 0,
  MAX: 9999,
};

const ANIMATION = {
  BAR_CHART_MOVING_HEIGHT: 5,
  PIE_CHART_MOVING_ANGLE: 1,
};

export { STUDENTS, SCORE, SIZE, COLORS, ANIMATION };
