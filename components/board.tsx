"use client";
import { useState } from "react";
import { CaseProps } from "./case";
import { BoardSolution, Matrix3 } from "@/components/boardInitializer";
import { Matrix } from "./matrix";
import styles from "../app/page.module.css";
import { BoardContextProvider } from "./bordContext";

export type LigneType = CaseProps[];
export type MatrixCells = Matrix3<LigneType>;

export type BoardProps = {
  initialState?: MatrixCells[];
  boardSolution?: BoardSolution;
  onGenerateBoard: () => void;
};

export function Board(props: BoardProps) {
  const { initialState, boardSolution, onGenerateBoard } = props;

  const handleClick = () => {
    onGenerateBoard();
  };

  return (
    <div>
      <div>
        <button onClick={handleClick}>Generate board</button>
      </div>
      <div className={styles.board}>
        <BoardContextProvider value={{ solution: boardSolution || [[]] }}>
          {initialState?.map((matrix, index) => (
            <Matrix key={index} data={matrix} index={index} />
          ))}
        </BoardContextProvider>
      </div>
    </div>
  );
}
