import { TerminalState } from "../../fsm/TerminalState";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { PointDataImpl } from "../PointDataImpl";
import { MouseoutTransition } from "../../fsm/MouseoutTransition";
import { MouseleaveTransition } from "../../fsm/MouseleaveTransition";
export class MouseoutFSM extends FSMImpl {
    constructor(withBubbling) {
        super();
        this.withBubbling = withBubbling;
    }
    buildFSM(dataHandler) {
        if (this.states.length > 1) {
            return;
        }
        super.buildFSM(dataHandler);
        const exited = new TerminalState(this, "exited");
        this.addState(exited);
        let exit;
        if (this.withBubbling) {
            exit = new MouseoutTransition(this.initState, exited);
        }
        else {
            exit = new MouseleaveTransition(this.initState, exited);
        }
        exit.action = (event) => {
            dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.onExit(event);
        };
    }
}
export class Mouseout extends InteractionBase {
    constructor(withBubbling) {
        super(new MouseoutFSM(withBubbling), new PointDataImpl());
        this.handler = {
            "onExit": (evt) => {
                this._data.copy(evt);
            },
            "reinitData": () => {
                this.reinitData();
            }
        };
        this.fsm.buildFSM(this.handler);
    }
}
