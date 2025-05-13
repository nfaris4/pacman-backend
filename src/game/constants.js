export const level1Map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 1, 2, 2, 5, 2, 1],
  [1, 2, 1, 2, 1, 2, 1, 2, 2, 1],
  [1, 2, 1, 3, 2, 2, 1, 2, 2, 1],
  [1, 2, 2, 2, 0, 2, 2, 2, 2, 1],
  [1, 2, 1, 2, 2, 2, 1, 2, 5, 1],
  [1, 2, 1, 2, 2, 3, 1, 1, 2, 1],
  [1, 2, 1, 1, 1, 1, 1, 3, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 4, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export const level2Map = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,1,2,2,5,2,1],
  [1,2,1,2,1,2,1,1,2,1],
  [1,2,1,0,2,2,1,2,2,1],
  [1,2,2,2,1,2,2,2,2,1],
  [1,5,1,2,2,2,1,2,5,1],
  [1,2,1,2,2,3,1,1,2,1],
  [1,2,1,1,1,1,1,3,2,1],
  [1,2,2,2,2,2,2,2,4,1],
  [1,1,1,1,1,1,1,1,1,1],
];

export const level3Map = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,1,2,2,5,2,1],
  [1,2,1,2,1,2,1,1,2,1],
  [1,2,1,3,2,2,1,2,2,1],
  [1,2,2,2,1,2,2,2,2,1],
  [1,5,1,2,0,2,1,2,5,1],
  [1,2,1,2,2,3,1,1,2,1],
  [1,2,1,1,1,1,1,3,2,1],
  [1,2,2,2,2,2,2,2,4,1],
  [1,1,1,1,1,1,1,1,1,1],
];

export const configGame = {
  ROWS: 10,
  COLUMNS: 10,
  IMAGE_SIZE: 32,
  EXTRA_SIZE_HEIGHT: 300,
  SPEED_PACMAN: 32,
  LIVES_PACMAN: 3,
  map: level1Map
};

export const levels = [
  {
    map: level1Map,
    timeLimit: 60,
    pointsToWin: 10,
    speed: 10
  },
  {
    map: level2Map,
    timeLimit: 45,
    pointsToWin: 20,
    speed: 8
  },
  {
    map: level3Map,
    timeLimit: 30,
    pointsToWin: 30,
    speed: 6
  }
];

// Calcular dimensions
configGame.WIDTH_CANVAS = configGame.IMAGE_SIZE * configGame.COLUMNS;
configGame.HEIGHT_CANVAS = configGame.IMAGE_SIZE * configGame.ROWS;
