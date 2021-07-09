import { TerminalState } from "../../fsm/TerminalState";
import { isHyperLink } from "../../fsm/Events";
import { HyperLinkTransition } from "../../fsm/HyperLinkTransition";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { WidgetDataImpl } from "../WidgetDataImpl";
class HyperLinkClickedFSM extends FSMImpl {
    constructor() {
        super();
    }
    buildFSM(dataHandler) {
        if (this.states.length > 1) {
            return;
        }
        super.buildFSM(dataHandler);
        const clicked = new TerminalState(this, "clicked");
        this.addState(clicked);
        const tr = new HyperLinkTransition(this.initState, clicked);
        tr.action = (event) => {
            dataHandler.initToClickedHandler(event);
        };
    }
}
export class HyperLinkClicked extends InteractionBase {
    constructor() {
        super(new HyperLinkClickedFSM(), new WidgetDataImpl());
        this.handler = {
            "initToClickedHandler": (event) => {
                this._data.copy(event);
            },
            "reinitData": () => {
                this.reinitData();
            }
        };
        this.fsm.buildFSM(this.handler);
    }
    onNewNodeRegistered(node) {
        if (isHyperLink(node)) {
            this.registerActionHandlerInput(node);
        }
    }
    onNodeUnregistered(node) {
        if (isHyperLink(node)) {
            this.unregisterActionHandlerInput(node);
        }
    }
}
