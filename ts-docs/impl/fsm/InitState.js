import { OutputStateBase } from "./OutputStateBase";
export class InitState extends OutputStateBase {
    constructor(stateMachine, stateName) {
        super(stateMachine, stateName);
    }
    exit() {
        this.checkStartingState();
    }
}
