/*
- This code will solve a maze as if you were walking blindfolded with your right hand on the
  right hand wall and your left hand in front of you.
- For every step it will check the value of the position to its right, then its front, then its left in 
  that order. 
- It will turn and move towards the first open position 
- If a path is found to the exit it will return true
- If the amount of steps taken exceeds the number of positions in the matrix, it will assume
  no solution exists and return false*/

function mazeSolver(maze) {
  let [x, y] = [0, 0];
  let steps = 0;
  const n = maze.length;

  let forward = [1, 0]; // direction facing, initial direction is south

  //right hand is a function of which ever direction you are facing (d)
  const right = (d) => {
    return [d[1], -1 * d[0]];
  };

  //left is a function of the direction you're facing (d)
  const left = (d) => {
    return [-1 * d[1], d[0]];
  };

  const checkRight = (x, y) => {
    [x, y] = move([x, y], right(forward));
    try {
      return maze[x][y] === 0;
    } catch (error) {
      return false;
    }
  };

  const checkFront = (x, y) => {
    [x, y] = move([x, y], forward);
    try {
      return maze[x][y] === 0;
    } catch (error) {
      return false;
    }
  };

  //Move specified by direction
  const move = (position, direction) =>
    position.map((i, j) => position[j] + direction[j]);

  while ((x != n - 1 || y != n - 1) && steps < n * n) {
    if (checkRight(x, y)) {
      forward = right(forward); //turn right
      [x, y] = move([x, y], forward);
      steps += 1;
    } else if (checkFront(x, y)) {
      [x, y] = move([x, y], forward);
      steps += 1;
    } else {
      forward = left(forward); //turn left
    }
  }

  if (x === n - 1 && y === n - 1) {
    return true;
  } else {
    return false;
  }
}

const maze = [
  [0, 1, 1, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 1, 1, 1, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 1, 1, 0],
  [0, 1, 1, 0, 1, 0, 0, 0],
  [0, 1, 0, 0, 1, 1, 1, 0],
  [0, 1, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0],
];

console.log(mazeSolver(maze));
