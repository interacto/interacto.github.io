import { FSMImpl } from "../../fsm/FSMImpl";
import { StdState } from "../../fsm/StdState";
import { CancellingState } from "../../fsm/CancellingState";
import { TerminalState } from "../../fsm/TerminalState";
import { TimeoutTransition } from "../../fsm/TimeoutTransition";
import { InteractionBase } from "../InteractionBase";
import { PressureTransition } from "../../fsm/PressureTransition";
import { ReleaseTransition } from "../../fsm/ReleaseTransition";
import { PointDataImpl } from "../PointDataImpl";
export class LongPressFSM extends FSMImpl {
    constructor(duration) {
        super();
        if (duration <= 0) {
            throw new Error("Incorrect duration");
        }
        this.duration = duration;
        this.currentButton = undefined;
    }
    buildFSM(dataHandler) {
        if (this.states.length > 1) {
            return;
        }
        super.buildFSM(dataHandler);
        const down = new StdState(this, "down");
        const releasedTooEarly = new CancellingState(this, "releasedEarly");
        const timeouted = new TerminalState(this, "timeouted");
        this.addState(down);
        this.addState(releasedTooEarly);
        this.addState(timeouted);
        const press = new PressureTransition(this.initState, down);
        press.action = (event) => {
            this.currentButton = event.button;
            dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.press(event);
        };
        const release = new ReleaseTransition(down, releasedTooEarly);
        release.isGuardOK = (event) => event.button === this.currentButton;
        new TimeoutTransition(down, timeouted, () => this.duration);
    }
    reinit() {
        super.reinit();
        this.currentButton = undefined;
    }
}
export class LongPress extends InteractionBase {
    constructor(duration) {
        super(new LongPressFSM(duration), new PointDataImpl());
        this.handler = {
            "press": (evt) => {
                this._data.copy(evt);
            },
            "reinitData": () => {
                this.reinitData();
            }
        };
        this.fsm.buildFSM(this.handler);
    }
}
