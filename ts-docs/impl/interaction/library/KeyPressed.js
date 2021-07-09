import { TerminalState } from "../../fsm/TerminalState";
import { KeyPressureTransition } from "../../fsm/KeyPressureTransition";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { KeyDataImpl } from "../KeyDataImpl";
export class KeyPressedFSM extends FSMImpl {
    constructor(modifierAccepted) {
        super();
        this.modifiersAccepted = modifierAccepted;
    }
    buildFSM(dataHandler) {
        if (this.states.length > 1) {
            return;
        }
        super.buildFSM(dataHandler);
        const pressed = new TerminalState(this, "pressed");
        this.addState(pressed);
        const kp = new KeyPressureTransition(this.initState, pressed);
        kp.action = (event) => {
            dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.onKeyPressed(event);
        };
        kp.isGuardOK = (event) => this.modifiersAccepted ||
            (!event.altKey && !event.ctrlKey && !event.shiftKey && !event.metaKey);
    }
    reinit() {
        super.reinit();
    }
}
export class KeyPressed extends InteractionBase {
    constructor(modifierAccepted, fsm) {
        super(fsm !== null && fsm !== void 0 ? fsm : new KeyPressedFSM(modifierAccepted), new KeyDataImpl());
        this.handler = {
            "onKeyPressed": (event) => {
                this._data.copy(event);
            },
            "reinitData": () => {
                this.reinitData();
            }
        };
        this.fsm.buildFSM(this.handler);
    }
}
