'use client'
import { useState } from "react";
import { CaseProps } from "./case";
import { BoardSolution, Matrix3 } from "@/app/page";
import { Matrix } from "./matrix";
import styles from '../app/page.module.css';
import { BoardContextProvider } from "./bordContext";

export type LigneType = CaseProps[];
export type MatrixCells = Matrix3<LigneType>;

export type BoardProps = {
  initialState: MatrixCells[];
  boardSolution: BoardSolution;
};

export function Board(props: BoardProps) {
  const { initialState, boardSolution } = props;

  const [board, setBoard] = useState(initialState);

  return (
    <div className={styles.board}>
      <BoardContextProvider value={{ solution: boardSolution }}>
        {board.map((matrix, index) => <Matrix key={index} data={matrix} index={index} />)}
      </BoardContextProvider>
    </div>
  );
}
