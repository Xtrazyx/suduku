import { Board, MatrixCells } from "@/components/board";
import styles from "./page.module.css";
import { LigneType } from "@/components/board";
import { random, floor } from "lodash";

export type generateInitialState = () => { board: MatrixCells[], boardSolution: BoardSolution };
export type RandomValue = number;
export type RandomSuite = RandomValue[];
export type Matrix3<T> = T[];
export type generateRandomMatrix = () => Matrix3<RandomSuite>;
export type BoardSolution = RandomSuite[];
export type GenerateBoardSolution = () => BoardSolution;
export type SudokuSolver = (board: BoardSolution, row: number, column: number) => boolean;
export type IsValidNumber = (board: BoardSolution, row: number, column: number, num: number) => boolean;

export default function Home() {
  let solverCall = 0;

  const generateCells = (randomSuite: RandomSuite, lineIndex: number): LigneType => {
    return randomSuite.map((value, index) => {
      return { value, coordX: index, coordY: lineIndex };
    });
  };

  const isValidNumber: IsValidNumber = (board, row, column, num) => {
    console.log("Test validity for", num, "in row", row, "column", column);
    // check sur la ligne
    if (board[row].includes(num)) {
      console.log("Invalid", num, "in row", row);
      return false;
    }

    // check sur la colonne
    for (let evalRow = 0; evalRow < 9; evalRow++) {
      if (board[evalRow][column] === num) {
        console.log("Invalid", num, "in column", column);
        return false;
      }
    }

    // check sur la matrice 3x3
    const matrixXstart = floor(row / 3) * 3;
    const matrixXend = matrixXstart + 3;
    const matrixYstart = floor(column / 3) * 3;
    const matrixYend = matrixYstart + 3;
    console.log("Mx row start", matrixXstart, "Mx column start", matrixYstart);
    for (let i = matrixXstart; i < matrixXend; i++) {
      for (let j = matrixYstart; j < matrixYend; j++) {
        console.log("Test for", "row", i, "col", j, "num", num);
        if (board[i][j] === num) {
          console.log("Invalid", num, "in matrix");
          return false;
        }
      }
    }

    console.log("Test for", "row", row, "col", column, "num", num, "is valid");
    return true;
  };

  const sudokuSolver: SudokuSolver = (board, row, column) => {
    console.log("Solver called", solverCall, " times.");
    solverCall++;
    // All rows have been explored
    if (row === 9) {
      console.log("End of exploration |");
      return true;
    }
    // Go to the next row when column is done
    if (column === 9) {
      console.log(">>> Go next row");
      return sudokuSolver(board, row + 1, 0);
    }
    // Go to next cell if already solved
    if (board[row][column] != 0) {
      console.log("Already solved", board[row][column], "Next cell >>");
      return sudokuSolver(board, row, column + 1);
    }

    // Attempt to solve the cell
    for (let i = 1; i < 10; i++) {
      console.log("Attempt", i);
      if (isValidNumber(board, row, column, i)) {
        board[row][column] = i;
        console.log("check", i, "in x", row, "y", column);
        // Check if the valid solution works with the rest of the tree
        if (sudokuSolver(board, row, column + 1)) {
          console.log("Next cell >>");
          return true;
        }
      }
    }
    console.log("<< Backtracking");
    // Else reset the tested num
    board[row][column] = 0;
    // Backtrack if the attempt has failed
    return false;
  };

  const generateRandomMatrix: generateRandomMatrix = () => {
    const randomSuite: RandomSuite = [];

    for (let i = 0; i < 9; i++) {
      let value = random(1, 9);

      while (randomSuite.includes(value)) {
        value = random(1, 9);
      }

      randomSuite[i] = value;
    }

    const matrix: Matrix3<RandomSuite> = [
      [randomSuite[0], randomSuite[1], randomSuite[2]],
      [randomSuite[3], randomSuite[4], randomSuite[5]],
      [randomSuite[6], randomSuite[7], randomSuite[8]],
    ];

    return matrix;
  };

  const generateBoardSolution: GenerateBoardSolution = () => {
    const matrices = Array(3)
      .fill(0)
      .map(() => generateRandomMatrix());

    const board = [];

    for (let i = 0; i < 9; i++) {
      board[i] = Array(9).fill(0);

      if (i >= 0 && i < 3) {
        board[i].splice(0, 3, ...matrices[0][i]);
      }

      if (i >= 3 && i < 6) {
        board[i].splice(3, 3, ...matrices[1][i - 3]);
      }

      if (i >= 6 && i < 9) {
        board[i].splice(6, 3, ...matrices[2][i - 6]);
      }
    }

    sudokuSolver(board, 0, 0);

    return board;
  };

  const generateBoard = (boardSolution: BoardSolution): MatrixCells[] => {
    let matrices: any = Array(9).fill(0).map(() => Array(3).fill(0).map(() => Array(3).fill(0)));
    const cellBoard = boardSolution.map((line, index) => generateCells(line, index));

    for (let row = 0; row < 9; row++) {
      for (let column = 0; column < 9; column++) {
        matrices[floor(row / 3) * 3 + floor(column / 3)][row % 3][column % 3] = cellBoard[row][column];
      }
    }

    return matrices;
  };

  const initialState: generateInitialState = () => {
    const boardSolution = generateBoardSolution();

    const board = generateBoard(boardSolution);

    console.log("Board solution", boardSolution);

    return { board, boardSolution};
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Board initialState={initialState().board} boardSolution={initialState().boardSolution} />
      </div>
    </main>
  );
}
