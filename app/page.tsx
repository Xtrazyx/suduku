import { Board, MatrixCells } from "@/components/board";
import styles from "./page.module.css";
import { LigneType } from "@/components/board";
import { random } from "lodash";

export type generateInitialState = () => MatrixCells[];
export type RandomValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0;
export type RandomSuite = RandomValue[];
export type Matrix3<T> = T[];
export type generateRandomMatrix = () => Matrix3<RandomSuite>;
export type BoardSolution = RandomSuite[];
export type GenerateBoardSolution = () => BoardSolution;
export type SudokuSolver = (board: BoardSolution, row: number, column: number) => boolean;
export type IsValidNumber = (board: BoardSolution, row: number, column: number, num: number) => boolean;

export default function Home() {
  const generateCells = (randomSuite: RandomSuite): LigneType => {
    return randomSuite.map((value, index) => {
      return { value, coordX: index, coordY: 1 };
    });
  };

  const isValidNumber: IsValidNumber = (board, row, column, num) => true;

  const sudokuSolver: SudokuSolver = (board, row, column) => {
    if (row === 9) return true;
    if (column === 9) return sudokuSolver(board, row + 1, column);
    if (board[row][column] != 0) return sudokuSolver(board, row, column + 1);

    for(let i = 1; i < 10; i++) {
      if(isValidNumber(board, row, column, i)) {
        board[row][column] = i as RandomValue;
      }
    }

    return false;
  }

  const generateRandomMatrix: generateRandomMatrix = () => {
    const randomSuite: RandomSuite = [];

    for (let i = 0; i < 9; i++) {
      let value = random(1, 9) as RandomValue;

      while (randomSuite.includes(value)) {
        value = random(1, 9) as RandomValue;
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
        board[i].splice(3, 3, ...matrices[1][i-3]);
      }

      if (i >= 6 && i < 9) {
        board[i].splice(6, 3, ...matrices[2][i-6]);
      }
    }

    console.log('board', board);

    return board;
  };

  const generateBoard = (boardSolution: BoardSolution): MatrixCells[] => {
    return [];
  }

  const initialState: generateInitialState = () => {
    const boardSolution = generateBoardSolution();

    const board = generateBoard(boardSolution);

    console.log('Board solution', board);

    return board;
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Board initialState={initialState()} />
      </div>
    </main>
  );
}
