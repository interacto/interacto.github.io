import { StateBase } from "./StateBase";
export class TerminalState extends StateBase {
    constructor(stateMachine, stateName) {
        super(stateMachine, stateName);
    }
    enter() {
        this.checkStartingState();
        this.fsm.onTerminating();
    }
}
