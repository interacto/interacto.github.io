import { StateBase } from "./StateBase";
export class CancellingState extends StateBase {
    constructor(stateMachine, stateName) {
        super(stateMachine, stateName);
    }
    enter() {
        this.fsm.onCancelling();
    }
    uninstall() {
    }
}
