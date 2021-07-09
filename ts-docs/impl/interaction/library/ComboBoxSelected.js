import { TerminalState } from "../../fsm/TerminalState";
import { isComboBox } from "../../fsm/Events";
import { ComboBoxTransition } from "../../fsm/ComboBoxTransition";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { WidgetDataImpl } from "../WidgetDataImpl";
class ComboBoxSelectedFSM extends FSMImpl {
    constructor() {
        super();
    }
    buildFSM(dataHandler) {
        if (this.states.length > 1) {
            return;
        }
        super.buildFSM(dataHandler);
        const selected = new TerminalState(this, "selected");
        this.addState(selected);
        const tr = new ComboBoxTransition(this.initState, selected);
        tr.action = (event) => {
            dataHandler.initToSelectedHandler(event);
        };
    }
}
export class ComboBoxSelected extends InteractionBase {
    constructor() {
        super(new ComboBoxSelectedFSM(), new WidgetDataImpl());
        this.handler = {
            "initToSelectedHandler": (event) => {
                this._data.copy(event);
            },
            "reinitData": () => {
                this.reinitData();
            }
        };
        this.fsm.buildFSM(this.handler);
    }
    onNewNodeRegistered(node) {
        if (isComboBox(node)) {
            this.registerActionHandlerInput(node);
        }
    }
    onNodeUnregistered(node) {
        if (isComboBox(node)) {
            this.unregisterActionHandlerInput(node);
        }
    }
}
