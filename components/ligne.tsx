import { Case, CaseProps } from "./case";
import styles from "../app/page.module.css";

export type LigneProps = {
  cases: CaseProps[];
};

export function Ligne(props: LigneProps) {
  return (
    <div className={styles.ligne}>
      {props.cases.map((element: CaseProps) => (
        <Case
          key={`${element.coordX}_${element.coordY}`}
          coordX={element.coordX}
          coordY={element.coordY}
          value={element.value}
        />
      ))}
    </div>
  );
}
