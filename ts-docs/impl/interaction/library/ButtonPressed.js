import { ButtonPressedTransition } from "../../fsm/ButtonPressedTransition";
import { TerminalState } from "../../fsm/TerminalState";
import { isButton } from "../../fsm/Events";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { WidgetDataImpl } from "../WidgetDataImpl";
class ButtonPressedFSM extends FSMImpl {
    constructor() {
        super();
    }
    buildFSM(dataHandler) {
        if (this.states.length > 1) {
            return;
        }
        super.buildFSM(dataHandler);
        const pressed = new TerminalState(this, "pressed");
        this.addState(pressed);
        const tr = new ButtonPressedTransition(this.initState, pressed);
        tr.action = (event) => {
            dataHandler.initToPressedHandler(event);
        };
    }
}
export class ButtonPressed extends InteractionBase {
    constructor() {
        super(new ButtonPressedFSM(), new WidgetDataImpl());
        this.handler = {
            "initToPressedHandler": (event) => {
                this._data.copy(event);
            },
            "reinitData": () => {
                this.reinitData();
            }
        };
        this.fsm.buildFSM(this.handler);
    }
    onNewNodeRegistered(node) {
        if (isButton(node)) {
            this.registerActionHandlerClick(node);
        }
    }
    onNodeUnregistered(node) {
        if (isButton(node)) {
            this.unregisterActionHandlerClick(node);
        }
    }
}
