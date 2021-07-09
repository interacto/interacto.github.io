import { InteractionBase } from "../InteractionBase";
import { FSMImpl } from "../../fsm/FSMImpl";
import { TerminalState } from "../../fsm/TerminalState";
import { StdState } from "../../fsm/StdState";
import { TimeoutTransition } from "../../fsm/TimeoutTransition";
import { CancellingState } from "../../fsm/CancellingState";
import { TouchReleaseTransition } from "../../fsm/TouchReleaseTransition";
import { TapDataImpl } from "../TapDataImpl";
import { TouchDataImpl } from "../TouchDataImpl";
class TapFSM extends FSMImpl {
    constructor(nbTaps) {
        super();
        this.nbTaps = nbTaps;
        this.countTaps = 0;
    }
    buildFSM(dataHandler) {
        if (this.states.length > 1) {
            return;
        }
        super.buildFSM(dataHandler);
        const touched = new StdState(this, "touched");
        const ended = new TerminalState(this, "ended");
        const timeouted = new CancellingState(this, "timeouted");
        this.addState(touched);
        this.addState(ended);
        this.addState(timeouted);
        const touchInit = new TouchReleaseTransition(this.initState, ended);
        const touchInitAction = (event) => {
            dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.tap(event);
        };
        touchInit.action = touchInitAction;
        touchInit.isGuardOK = (_event) => this.nbTaps === 1;
        const touchTouched = new TouchReleaseTransition(this.initState, touched);
        touchTouched.action = (event) => {
            this.countTaps++;
            dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.tap(event);
        };
        touchTouched.isGuardOK = (_event) => this.nbTaps > 1;
        const touchTouchedTouched = new TouchReleaseTransition(touched, touched);
        touchTouchedTouched.action = (event) => {
            this.countTaps++;
            dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.tap(event);
        };
        touchTouchedTouched.isGuardOK = (_event) => (this.countTaps + 1) < this.nbTaps;
        const touchEnded = new TouchReleaseTransition(touched, ended);
        touchEnded.action = touchInitAction;
        touchEnded.isGuardOK = (_event) => (this.countTaps + 1) === this.nbTaps;
        new TimeoutTransition(touched, timeouted, () => 1000);
    }
    reinit() {
        super.reinit();
        this.countTaps = 0;
    }
}
export class Tap extends InteractionBase {
    constructor(numberTaps) {
        super(new TapFSM(numberTaps), new TapDataImpl());
        this.handler = {
            "tap": (evt) => {
                if (evt.changedTouches.length > 0) {
                    const touch = new TouchDataImpl();
                    touch.copy(TouchDataImpl.mergeTouchEventData(evt.changedTouches[0], evt));
                    this._data.addTapData(touch);
                }
            },
            "reinitData": () => {
                this.reinitData();
            }
        };
        this.fsm.buildFSM(this.handler);
    }
}
