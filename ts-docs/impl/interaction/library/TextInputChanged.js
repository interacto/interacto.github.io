import { TerminalState } from "../../fsm/TerminalState";
import { isTextInput } from "../../fsm/Events";
import { StdState } from "../../fsm/StdState";
import { TextInputChangedTransition } from "../../fsm/TextInputChangedTransition";
import { TimeoutTransition } from "../../fsm/TimeoutTransition";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { WidgetDataImpl } from "../WidgetDataImpl";
class TextInputChangedFSM extends FSMImpl {
    constructor(timeSet) {
        super();
        this._timeGap = 1000;
        this.timeGapSupplier = () => this.getTimeGap();
        if (timeSet !== undefined) {
            this._timeGap = timeSet;
        }
    }
    getTimeGap() {
        return this._timeGap;
    }
    buildFSM(dataHandler) {
        if (this.states.length > 1) {
            return;
        }
        super.buildFSM(dataHandler);
        const changed = new StdState(this, "changed");
        const ended = new TerminalState(this, "ended");
        this.addState(changed);
        this.addState(ended);
        const trInit = new TextInputChangedTransition(this.initState, changed);
        trInit.action = (event) => {
            dataHandler.initToChangedHandler(event);
        };
        const trChanged = new TextInputChangedTransition(changed, changed);
        trChanged.action = (event) => {
            dataHandler.initToChangedHandler(event);
        };
        new TimeoutTransition(changed, ended, this.timeGapSupplier);
    }
}
export class TextInputChanged extends InteractionBase {
    constructor(timeGap) {
        super(new TextInputChangedFSM(timeGap), new WidgetDataImpl());
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
        if (isTextInput(node)) {
            this.registerActionHandlerInput(node);
        }
    }
    onNodeUnregistered(node) {
        if (isTextInput(node)) {
            this.unregisterActionHandlerInput(node);
        }
    }
}
