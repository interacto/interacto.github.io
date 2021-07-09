import { TerminalState } from "../../fsm/TerminalState";
import { isDatePicker } from "../../fsm/Events";
import { DatePickedTransition } from "../../fsm/DatePickedTransition";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { WidgetDataImpl } from "../WidgetDataImpl";
class DatePickedFSM extends FSMImpl {
    constructor() {
        super();
    }
    buildFSM(dataHandler) {
        if (this.states.length > 1) {
            return;
        }
        super.buildFSM(dataHandler);
        const picked = new TerminalState(this, "picked");
        this.addState(picked);
        const tr = new DatePickedTransition(this.initState, picked);
        tr.action = (event) => {
            dataHandler.initToPickedHandler(event);
        };
    }
}
export class DatePicked extends InteractionBase {
    constructor() {
        super(new DatePickedFSM(), new WidgetDataImpl());
        this.handler = {
            "initToPickedHandler": (event) => {
                this._data.copy(event);
            },
            "reinitData": () => {
                this.reinitData();
            }
        };
        this.fsm.buildFSM(this.handler);
    }
    onNewNodeRegistered(node) {
        if (isDatePicker(node)) {
            this.registerActionHandlerInput(node);
        }
    }
    onNodeUnregistered(node) {
        if (isDatePicker(node)) {
            this.unregisterActionHandlerInput(node);
        }
    }
}
