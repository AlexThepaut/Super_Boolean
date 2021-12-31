export enum SuperBoolean {
    TRUE,
    FALSE,
    MOTHERFUCKING_TRUE,
    MOTHERFUCKING_FALSE
}

export enum SuperOperator {
    SUPER_NOT,
    SUPER_OR,
    SUPER_AND,
    SUPER_XOR
}

export class SuperBooleanOperator {
    private static MASQUARADES: Array<Masquarade> = [
        { 'id': SuperBoolean.TRUE, 'state': true, 'motherfucking': false },
        { 'id': SuperBoolean.FALSE, 'state': false, 'motherfucking': false },
        { 'id': SuperBoolean.MOTHERFUCKING_TRUE, 'state': true, 'motherfucking': true },
        { 'id': SuperBoolean.MOTHERFUCKING_FALSE, 'state': false, 'motherfucking': true }
    ];

    public static SUPER_NOT(sp: SuperBoolean): SuperBoolean | null {
        const temp = this.findTheMasquarade(sp);
        return this.findSuperBoolean(temp.motherfucking ? temp.state : !temp.state, !temp.motherfucking);
    }

    public static SUPER_OR(sp1: SuperBoolean | null, sp2: SuperBoolean | null): SuperBoolean | null {
        if (sp1 !== null && sp2 !== null) {
            const tempSp1 = this.findTheMasquarade(sp1);
            const tempSp2 = this.findTheMasquarade(sp2);

            let resultState = false;
            let resultMf = false;
            if (!tempSp1.motherfucking && !tempSp2.motherfucking) {
                resultState = tempSp1.state || tempSp2.state;
            } else if (tempSp1.motherfucking && tempSp2.motherfucking) {
                if (tempSp1.state !== tempSp2.state) return null;
                resultMf = true;
                resultState = tempSp1.state;
            } else {
                resultMf = tempSp1.state === tempSp2.state;
                resultState = tempSp1.motherfucking ? tempSp1.state : tempSp2.state;
            }

            return this.findSuperBoolean(resultState, resultMf);
        }
        return null;
    }

    public static SUPER_AND(sp1: SuperBoolean | null, sp2: SuperBoolean | null): SuperBoolean | null {
        if (sp1 !== null && sp2 !== null) {
            const tempSp1 = this.findTheMasquarade(sp1);
            const tempSp2 = this.findTheMasquarade(sp2);

            let resultState = false;
            let resultMf = false;

            if (!tempSp1.motherfucking && !tempSp2.motherfucking) {
                resultState = tempSp1.state && tempSp2.state;
            } else if (tempSp1.motherfucking && tempSp2.motherfucking) {
                if (tempSp1 !== tempSp2) return null;
                resultMf = true;
                resultState = tempSp1.state;
            } else {
                resultMf = false;
                resultState = tempSp1.motherfucking ? tempSp1.state : tempSp2.state;
            }

            return this.findSuperBoolean(resultState, resultMf);
        }
        return null;
    }

    public static SUPER_XOR(sp1: SuperBoolean, sp2: SuperBoolean): SuperBoolean | null {
        return this.SUPER_OR(this.SUPER_AND(sp1, this.SUPER_NOT(sp2)), this.SUPER_AND(this.SUPER_NOT(sp1), sp2))
    }

    public static SUPER_OPERATOR_TRUTH_TABLE(so: SuperOperator): Array<Array<SuperBoolean | null>> | null {
        let truthTable: Array<Array<SuperBoolean | null>> = [];

        switch (so) {
            case SuperOperator.SUPER_NOT:
                const tempRow: Array<SuperBoolean | null> = [];
                for (const sb of this.MASQUARADES) {
                    tempRow.push(this.SUPER_NOT(sb.id));
                }
                truthTable.push(tempRow);
                break;
            case SuperOperator.SUPER_OR:
                for (const sb1 of this.MASQUARADES) {
                    const tempRow: Array<SuperBoolean | null> = [];
                    for (const sb2 of this.MASQUARADES) {
                        tempRow.push(this.SUPER_OR(sb1.id, sb2.id));
                    }
                    truthTable.push(tempRow);
                }
                break;
            case SuperOperator.SUPER_AND:
                for (const sb1 of this.MASQUARADES) {
                    const tempRow: Array<SuperBoolean | null> = [];
                    for (const sb2 of this.MASQUARADES) {
                        tempRow.push(this.SUPER_AND(sb1.id, sb2.id));
                    }
                    truthTable.push(tempRow);
                }
                break;
            case SuperOperator.SUPER_XOR:
                for (const sb1 of this.MASQUARADES) {
                    const tempRow: Array<SuperBoolean | null> = [];
                    for (const sb2 of this.MASQUARADES) {
                        tempRow.push(this.SUPER_XOR(sb1.id, sb2.id));
                    }
                    truthTable.push(tempRow);
                }
                break;
            default:
                return null;
        }

        return truthTable;
    }

    public static findSuperBoolean(state: boolean, isMotherFucking: boolean): SuperBoolean | null {
        const temp = this.MASQUARADES.find(a => a.state === state && a.motherfucking === isMotherFucking);
        if (temp) return temp.id;
        return SuperBoolean.FALSE;
    }

    private static findTheMasquarade(sp: SuperBoolean): Masquarade {
        const temp = this.MASQUARADES.find(a => a.id === sp);
        if (temp) return temp;
        return this.MASQUARADES[1];
    }
}

class Masquarade {
    id: SuperBoolean = 0;
    state: boolean = false;
    motherfucking: boolean = false;
}
