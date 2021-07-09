import { TerminalState } from "../../fsm/TerminalState";
import { BoxCheckPressedTransition } from "../../fsm/BoxCheckPressedTransition";
import { isCheckBox } from "../../fsm/Events";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { WidgetDataImpl } from "../WidgetDataImpl";
class BoxCheckedFSM extends FSMImpl {
    constructor() {
        super();
    }
    buildFSM(dataHandler) {
        if (this.states.length > 1) {
            return;
        }
        super.buildFSM(dataHandler);
        const checked = new TerminalState(this, "checked");
        this.addState(checked);
        const tr = new BoxCheckPressedTransition(this.initState, checked);
        tr.action = (event) => {
            dataHandler.initToCheckHandler(event);
        };
    }
}
export class BoxChecked extends InteractionBase {
    constructor() {
        super(new BoxCheckedFSM(), new WidgetDataImpl());
        this.handler = {
            "initToCheckHandler": (event) => {
                this._data.copy(event);
            },
            "reinitData": () => {
                this.reinitData();
            }
        };
        this.fsm.buildFSM(this.handler);
    }
    onNewNodeRegistered(node) {
        if (isCheckBox(node)) {
            this.registerActionHandlerInput(node);
        }
    }
    onNodeUnregistered(node) {
        if (isCheckBox(node)) {
            this.unregisterActionHandlerInput(node);
        }
    }
}
