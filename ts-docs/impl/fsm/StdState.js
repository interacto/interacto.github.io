import { OutputStateBase } from "./OutputStateBase";
export class StdState extends OutputStateBase {
    constructor(stateMachine, stateName) {
        super(stateMachine, stateName);
    }
    enter() {
        this.checkStartingState();
        this.fsm.enterStdState(this);
    }
    exit() {
    }
}
