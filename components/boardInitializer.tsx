"use client";
import { useState } from "react";

import { random, floor, divide } from "lodash";

import { LigneType, Board, MatrixCells } from "@/components/board";

import styles from "../app/page.module.css";

export type generateInitialState = () => Promise<{ board: MatrixCells[]; boardSolution: BoardSolution }>;
export type RandomValue = number;
export type RandomSuite = RandomValue[];
export type Matrix3<T> = T[];
export type generateRandomMatrix = () => Matrix3<RandomSuite>;
export type BoardSolution = RandomSuite[];
export type GenerateBoardSolution = () => Promise<BoardSolution>;
export type SudokuSolver = (board: BoardSolution, row: number, column: number) => boolean;
export type IsValidNumber = (board: BoardSolution, row: number, column: number, num: number) => boolean;

export default function BoardInitializer() {
  const [board, setBoard] = useState<MatrixCells[]>();
  const [boardSolution, setBoardSolution] = useState<BoardSolution>();
  const [isLoading, setIsLoading] = useState(false);

  const generateCells = (randomSuite: RandomSuite, lineIndex: number): LigneType => {
    const mask = () => Math.random() > 0.4;

    return randomSuite.map((value, index) => {
      return { value: mask() ? 0 : value, coordX: index, coordY: lineIndex };
    });
  };

  const isValidNumber: IsValidNumber = (board, row, column, num) => {
    // check sur la ligne
    if (board[row].includes(num)) {
      return false;
    }

    // check sur la colonne
    for (let evalRow = 0; evalRow < 9; evalRow++) {
      if (board[evalRow][column] === num) {
        return false;
      }
    }

    // check sur la matrice 3x3
    const matrixXstart = floor(row / 3) * 3;
    const matrixXend = matrixXstart + 3;
    const matrixYstart = floor(column / 3) * 3;
    const matrixYend = matrixYstart + 3;
    for (let i = matrixXstart; i < matrixXend; i++) {
      for (let j = matrixYstart; j < matrixYend; j++) {
        if (board[i][j] === num) {
          return false;
        }
      }
    }

    return true;
  };

  const sudokuSolver: SudokuSolver = (board, row, column) => {
    // All rows have been explored
    if (row === 9) {
      return true;
    }
    // Go to the next row when column is done
    if (column === 9) {
      return sudokuSolver(board, row + 1, 0);
    }
    // Go to next cell if already solved
    if (board[row][column] != 0) {
      return sudokuSolver(board, row, column + 1);
    }

    // Attempt to solve the cell
    for (let i = 1; i < 10; i++) {
      if (isValidNumber(board, row, column, i)) {
        board[row][column] = i;

        // Check if the valid solution works with the rest of the tree
        if (sudokuSolver(board, row, column + 1)) {
          return true;
        }
      }
    }

    // Else reset the tested num
    board[row][column] = 0;
    // Backtrack
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

  const generateBoardSolution: GenerateBoardSolution = async () => {
    const matrices = Array(3)
      .fill(0)
      .map(() => generateRandomMatrix());

    const board: any = [];

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

    const hasSolution = sudokuSolver(board, 0, 0);

    if(!hasSolution) {
      generateBoardSolution();
    }

    return new Promise((resolve) => resolve(board));
  };

  const generateBoard = (boardSolution: BoardSolution): MatrixCells[] => {
    let matrices: any = Array(9)
      .fill(0)
      .map(() =>
        Array(3)
          .fill(0)
          .map(() => Array(3).fill(0))
      );
    const cellBoard = boardSolution.map((line, index) => generateCells(line, index));

    for (let row = 0; row < 9; row++) {
      for (let column = 0; column < 9; column++) {
        matrices[floor(row / 3) * 3 + floor(column / 3)][row % 3][column % 3] = cellBoard[row][column];
      }
    }

    return matrices;
  };

  const initialState: generateInitialState = async () => {
  //  setIsLoading(true);

    try {
      const boardSolution = await generateBoardSolution();
      const board = generateBoard(boardSolution);

      console.log("Board solution", boardSolution);

    //  setIsLoading(false);

      return Promise.resolve({ board, boardSolution });
    } catch (error) {
      console.log(error);

    //  setIsLoading(false);

      return Promise.resolve({ board: [], boardSolution: [] });
    }
  };

  const handleGenerateBoard = async () => {
    setIsLoading(true);
    const initial = await initialState();

    setBoard(initial.board);
    setBoardSolution(initial.boardSolution);
    setIsLoading(false);
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        {isLoading ? (
          <div>Please wait</div>
        ) : (
          <Board initialState={board} boardSolution={boardSolution} onGenerateBoard={handleGenerateBoard} />
        )}
      </div>
    </main>
  );
}
