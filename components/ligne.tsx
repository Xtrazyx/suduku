import { Case, CaseProps } from "./case";

export type LigneProps = {
    yLine: number

}

export function Ligne(props: LigneProps) {
    const { } = props;

    const cases: CaseProps[] = [{ coordX: 5, coordY: 5, value: 4 }, ]

    return (
        <div>
            {cases.map((element: CaseProps) => <Case {...element} />)}
        </div>
    )
}
