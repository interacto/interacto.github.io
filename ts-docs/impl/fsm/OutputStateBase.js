import { StateBase } from "./StateBase";
export class OutputStateBase extends StateBase {
    constructor(stateMachine, stateName) {
        super(stateMachine, stateName);
        this._transitions = [];
    }
    process(event) {
        return this.transitions.find(tr => {
            try {
                return tr.execute(event) !== undefined;
            }
            catch (ignored) {
                return false;
            }
        }) !== undefined;
    }
    clearTransitions() {
        this._transitions.length = 0;
    }
    get transitions() {
        return [...this._transitions];
    }
    addTransition(tr) {
        this._transitions.push(tr);
    }
    uninstall() {
        super.uninstall();
        this.transitions.forEach(tr => {
            tr.uninstall();
        });
        this._transitions.length = 0;
    }
}
