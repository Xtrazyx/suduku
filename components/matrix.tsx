import styles from '../app/page.module.css';
import { LigneType, MatrixCells } from "./board";
import { Ligne } from "./ligne";

export type MatrixProps = {
  data: MatrixCells;
  index: number;
};

export function Matrix(props: MatrixProps) {
  const { data, index } = props;
 
  return (
    <div className={styles.matrix}>
      {data.map((ligne: LigneType, ligneIndex) => (
        <Ligne key={`${index}_${ligneIndex}`} cases={ligne} />
      ))}
    </div>
  );
}
