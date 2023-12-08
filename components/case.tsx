export type CaseProps = {
    coordX: number;
    coordY: number;
    value: number;
    isLocked?: boolean;
    isCorrect?: boolean;
}

export function Case(props: CaseProps) {
    const { coordX, coordY, value, isLocked, isCorrect } = props;

    return (
        <div>
            <div>value:{value}</div>
            <div>coordX:{coordX}</div>
            <div>coordY:{coordY}</div>
        </div>
    )
}
