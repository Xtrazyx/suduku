import styles from '../app/page.module.css';

export type CaseProps = {
    coordX?: number;
    coordY?: number;
    value: number;
    isLocked?: boolean;
    isCorrect?: boolean;
}

export function Case(props: CaseProps) {
    const { coordX, coordY, value, isLocked, isCorrect } = props;

    return (
        <div className={styles.case}>
            <div className={styles.valeur}>{value}</div>
        </div>
    )
}
