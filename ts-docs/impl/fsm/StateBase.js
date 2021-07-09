export class StateBase {
    constructor(stateMachine, stateName) {
        this.fsm = stateMachine;
        this.name = stateName;
    }
    checkStartingState() {
        if (!this.fsm.started && this.fsm.startingState === this) {
            this.fsm.onStarting();
        }
    }
    uninstall() {
    }
}
