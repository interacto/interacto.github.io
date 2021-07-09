import { TerminalState } from "../../fsm/TerminalState";
import { isColorChoice } from "../../fsm/Events";
import { ColorPickedTransition } from "../../fsm/ColorPickedTransition";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { WidgetDataImpl } from "../WidgetDataImpl";
class ColorPickedFSM extends FSMImpl {
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
        const tr = new ColorPickedTransition(this.initState, picked);
        tr.action = (event) => {
            dataHandler.initToPickedHandler(event);
        };
    }
}
export class ColorPicked extends InteractionBase {
    constructor() {
        super(new ColorPickedFSM(), new WidgetDataImpl());
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
        if (isColorChoice(node)) {
            this.registerActionHandlerInput(node);
        }
    }
    onNodeUnregistered(node) {
        if (isColorChoice(node)) {
            this.unregisterActionHandlerInput(node);
        }
    }
}
