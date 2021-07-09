import { TerminalState } from "../../fsm/TerminalState";
import { isSpinner } from "../../fsm/Events";
import { SpinnerChangedTransition } from "../../fsm/SpinnerChangedTransition";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { StdState } from "../../fsm/StdState";
import { TimeoutTransition } from "../../fsm/TimeoutTransition";
import { WidgetDataImpl } from "../WidgetDataImpl";
export class SpinnerChangedFSM extends FSMImpl {
    static getTimeGap() {
        return SpinnerChangedFSM.timeGap;
    }
    static setTimeGap(timeGapBetweenClicks) {
        if (timeGapBetweenClicks > 0) {
            SpinnerChangedFSM.timeGap = timeGapBetweenClicks;
        }
    }
    buildFSM(dataHandler) {
        if (this.states.length > 1) {
            return;
        }
        super.buildFSM(dataHandler);
        const changed = new StdState(this, "valueChanged");
        const ended = new TerminalState(this, "ended");
        this.addState(changed);
        this.addState(ended);
        const spinnerAction = (event) => {
            dataHandler.initToChangedHandler(event);
        };
        const changedInit = new SpinnerChangedTransition(this.initState, changed);
        changedInit.action = spinnerAction;
        const changedChanged = new SpinnerChangedTransition(changed, changed);
        changedChanged.action = spinnerAction;
        new TimeoutTransition(changed, ended, SpinnerChangedFSM.timeGapSupplier);
    }
}
SpinnerChangedFSM.timeGap = 300;
SpinnerChangedFSM.timeGapSupplier = () => SpinnerChangedFSM.getTimeGap();
export class SpinnerChanged extends InteractionBase {
    constructor() {
        super(new SpinnerChangedFSM(), new WidgetDataImpl());
        this.handler = {
            "initToChangedHandler": (event) => {
                this._data.copy(event);
            },
            "reinitData": () => {
                this.reinitData();
            }
        };
        this.fsm.buildFSM(this.handler);
    }
    onNewNodeRegistered(node) {
        if (isSpinner(node)) {
            this.registerActionHandlerInput(node);
        }
    }
    onNodeUnregistered(node) {
        if (isSpinner(node)) {
            this.unregisterActionHandlerInput(node);
        }
    }
}
