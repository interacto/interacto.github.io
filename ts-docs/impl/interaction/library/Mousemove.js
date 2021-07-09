import { TerminalState } from "../../fsm/TerminalState";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { PointDataImpl } from "../PointDataImpl";
import { MousemoveTransition } from "../../fsm/MousemoveTransition";
export class MousemoveFSM extends FSMImpl {
    constructor() {
        super();
    }
    buildFSM(dataHandler) {
        if (this.states.length > 1) {
            return;
        }
        super.buildFSM(dataHandler);
        const moved = new TerminalState(this, "moved");
        this.addState(moved);
        const move = new MousemoveTransition(this.initState, moved);
        move.action = (event) => {
            dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.onMove(event);
        };
    }
}
export class Mousemove extends InteractionBase {
    constructor() {
        super(new MousemoveFSM(), new PointDataImpl());
        this.handler = {
            "onMove": (evt) => {
                this._data.copy(evt);
            },
            "reinitData": () => {
                this.reinitData();
            }
        };
        this.fsm.buildFSM(this.handler);
    }
}
