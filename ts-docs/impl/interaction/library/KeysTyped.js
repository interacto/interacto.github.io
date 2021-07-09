import { TerminalState } from "../../fsm/TerminalState";
import { StdState } from "../../fsm/StdState";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { TimeoutTransition } from "../../fsm/TimeoutTransition";
import { KeysDataImpl } from "../KeysDataImpl";
import { KeyReleaseTransition } from "../../fsm/KeyReleaseTransition";
export class KeysTypedFSM extends FSMImpl {
    constructor() {
        super();
    }
    static getTimeGap() {
        return KeysTypedFSM.timeGap;
    }
    buildFSM(dataHandler) {
        if (this.states.length > 1) {
            return;
        }
        super.buildFSM(dataHandler);
        const keyup = new StdState(this, "keyup");
        const timeouted = new TerminalState(this, "timeouted");
        this.addState(keyup);
        this.addState(timeouted);
        const action = (event) => {
            dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.onKeyTyped(event);
        };
        const keyupInit = new KeyReleaseTransition(this.initState, keyup);
        const keyupSeq = new KeyReleaseTransition(keyup, keyup);
        keyupInit.action = action;
        keyupSeq.action = action;
        new TimeoutTransition(keyup, timeouted, KeysTypedFSM.timeGapSupplier);
    }
}
KeysTypedFSM.timeGap = 1000;
KeysTypedFSM.timeGapSupplier = () => KeysTypedFSM.getTimeGap();
export class KeysTyped extends InteractionBase {
    constructor(logger) {
        super(new KeysTypedFSM(), new KeysDataImpl(), logger);
        const handler = {
            "onKeyTyped": (event) => {
                this._data.addKey(event);
            },
            "reinitData": () => {
                this.reinitData();
            }
        };
        this.fsm.buildFSM(handler);
    }
}
