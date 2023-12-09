'use client'
import { useState } from "react";
import { CaseProps } from "./case";
import { Matrix3 } from "@/app/page";
import { Matrix } from "./matrix";
import styles from '../app/page.module.css';

export type LigneType = CaseProps[];
export type MatrixCells = Matrix3<LigneType>;

export type BoardProps = {
  initialState: MatrixCells[];
};

export function Board(props: BoardProps) {
  const { initialState } = props;

  const [board, setBoard] = useState(initialState);

  return (
    <div className={styles.board}>
        {board.map((matrix, index) => <Matrix key={index} data={matrix} index={index} />)}
    </div>
  );
}
