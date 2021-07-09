import { InteractionBase } from "../InteractionBase";
import { FSMImpl } from "../../fsm/FSMImpl";
import { StdState } from "../../fsm/StdState";
import { TerminalState } from "../../fsm/TerminalState";
import { TouchPressureTransition } from "../../fsm/TouchPressureTransition";
import { TouchMoveTransition } from "../../fsm/TouchMoveTransition";
import { TouchReleaseTransition } from "../../fsm/TouchReleaseTransition";
import { getTouch } from "../../fsm/Events";
import { SrcTgtTouchDataImpl } from "../SrcTgtTouchDataImpl";
export class TouchDnDFSM extends FSMImpl {
    constructor() {
        super();
        this.touchID = undefined;
    }
    buildFSM(dataHandler) {
        if (this.states.length > 1) {
            return;
        }
        super.buildFSM(dataHandler);
        const touched = new StdState(this, "touched");
        const released = new TerminalState(this, "released");
        this.addState(touched);
        this.addState(released);
        const pressure = new TouchPressureTransition(this.initState, touched);
        pressure.action = (event) => {
            this.touchID = event.changedTouches[0].identifier;
            dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.onTouch(event);
        };
        const move = new TouchMoveTransition(touched, touched);
        move.isGuardOK = (event) => event.changedTouches[0].identifier === this.touchID;
        move.action = (event) => {
            dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.onMove(event);
        };
        const release = new TouchReleaseTransition(touched, released);
        release.isGuardOK = (event) => event.changedTouches[0].identifier === this.touchID;
        release.action = (event) => {
            dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.onRelease(event);
        };
        super.buildFSM(dataHandler);
    }
    getTouchId() {
        return this.touchID;
    }
    reinit() {
        super.reinit();
        this.touchID = undefined;
    }
}
export class TouchDnD extends InteractionBase {
    constructor(fsm) {
        super(fsm !== null && fsm !== void 0 ? fsm : new TouchDnDFSM(), new SrcTgtTouchDataImpl());
        this.handler = {
            "onTouch": (evt) => {
                const touch = evt.changedTouches[0];
                this._data.copySrc(touch, evt);
                this._data.copyTgt(touch, evt);
            },
            "onMove": (evt) => {
                this.setTgtData(evt);
            },
            "onRelease": (evt) => {
                this.setTgtData(evt);
            },
            "reinitData": () => {
                this.reinitData();
            }
        };
        this.fsm.buildFSM(this.handler);
    }
    setTgtData(evt) {
        const touch = getTouch(evt.changedTouches, this.data.src.identifier);
        if (touch !== undefined) {
            this._data.copyTgt(touch, evt);
        }
    }
}
