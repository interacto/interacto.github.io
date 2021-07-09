import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { StdState } from "../../fsm/StdState";
import { TerminalState } from "../../fsm/TerminalState";
import { TouchPressureTransition } from "../../fsm/TouchPressureTransition";
import { TouchReleaseTransition } from "../../fsm/TouchReleaseTransition";
import { CancellingState } from "../../fsm/CancellingState";
import { TouchMoveTransition } from "../../fsm/TouchMoveTransition";
import { SrcTgtTouchDataImpl } from "../SrcTgtTouchDataImpl";
export class PanFSM extends FSMImpl {
    constructor(horizontal, minLength, pxTolerance) {
        super();
        this.touchID = undefined;
        this.stableAxe = undefined;
        this.moveAxe = undefined;
        this.horizontal = horizontal;
        this.minLength = minLength;
        this.pxTolerance = pxTolerance;
    }
    getPanDistance(x, y) {
        const moveAxe2 = this.horizontal ? x : y;
        return this.moveAxe === undefined ? 0 : Math.abs(this.moveAxe - moveAxe2);
    }
    isStable(x, y) {
        const stableAxe2 = this.horizontal ? y : x;
        return this.stableAxe === undefined ? false : Math.abs(this.stableAxe - stableAxe2) <= this.pxTolerance;
    }
    buildFSM(dataHandler) {
        if (this.states.length > 1) {
            return;
        }
        super.buildFSM(dataHandler);
        const touched = new StdState(this, "touched");
        const moved = new StdState(this, "moved");
        const released = new TerminalState(this, "released");
        const cancelled = new CancellingState(this, "cancelled");
        this.addState(touched);
        this.addState(moved);
        this.addState(released);
        this.addState(cancelled);
        this.startingState = moved;
        const press = new TouchPressureTransition(this.initState, touched);
        press.action = (event) => {
            this.setInitialValueOnTouch(event);
            dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.touch(event);
        };
        const releaseTouched = new TouchReleaseTransition(touched, cancelled);
        releaseTouched.isGuardOK = (event) => event.changedTouches[0].identifier === this.touchID;
        this.configMove(touched, cancelled, moved, dataHandler);
        this.configRelease(moved, cancelled, released, dataHandler);
    }
    configMove(touched, cancelled, moved, dataHandler) {
        const isGuardMoveKO = (evt) => evt.changedTouches[0].identifier === this.touchID &&
            !this.isStable(evt.changedTouches[0].clientX, evt.changedTouches[0].clientY);
        const moveTouched = new TouchMoveTransition(touched, cancelled);
        moveTouched.isGuardOK = isGuardMoveKO;
        const moveCancelled = new TouchMoveTransition(moved, cancelled);
        moveCancelled.isGuardOK = isGuardMoveKO;
        const isGuardMoveOK = (evt) => evt.changedTouches[0].identifier === this.touchID &&
            this.isStable(evt.changedTouches[0].clientX, evt.changedTouches[0].clientY);
        const actionMoveOK = (event) => {
            dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.panning(event);
        };
        const moveTouchedOK = new TouchMoveTransition(touched, moved);
        moveTouchedOK.isGuardOK = isGuardMoveOK;
        moveTouchedOK.action = actionMoveOK;
        const moveMovedOK = new TouchMoveTransition(moved, moved);
        moveMovedOK.isGuardOK = isGuardMoveOK;
        moveMovedOK.action = actionMoveOK;
    }
    configRelease(moved, cancelled, released, dataHandler) {
        const releaseMoved = new TouchReleaseTransition(moved, cancelled);
        releaseMoved.isGuardOK = (evt) => evt.changedTouches[0].identifier === this.touchID &&
            !this.checkFinalPanConditions(evt);
        const releaseFinal = new TouchReleaseTransition(moved, released);
        releaseFinal.isGuardOK = (evt) => evt.changedTouches[0].identifier === this.touchID &&
            this.checkFinalPanConditions(evt);
        releaseFinal.action = (event) => {
            dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.panned(event);
        };
    }
    setInitialValueOnTouch(evt) {
        const touch = evt.changedTouches[0];
        this.touchID = touch.identifier;
        this.moveAxe = this.horizontal ? touch.clientX : touch.clientY;
        this.stableAxe = this.horizontal ? touch.clientY : touch.clientX;
    }
    checkFinalPanConditions(evt) {
        return this.getPanDistance(evt.changedTouches[0].clientX, evt.changedTouches[0].clientY) >= this.minLength;
    }
    reinit() {
        super.reinit();
        this.touchID = undefined;
        this.stableAxe = undefined;
        this.moveAxe = undefined;
    }
}
export class Pan extends InteractionBase {
    constructor(horizontal, minLength, pxTolerance, fsm) {
        super(fsm !== null && fsm !== void 0 ? fsm : new PanFSM(horizontal, minLength, pxTolerance), new SrcTgtTouchDataImpl());
        this.handler = {
            "touch": (evt) => {
                const touch = evt.changedTouches[0];
                this._data.copySrc(touch, evt);
                this._data.copyTgt(touch, evt);
            },
            "panning": (evt) => {
                this._data.copyTgt(evt.changedTouches[0], evt);
            },
            "panned": (evt) => {
                this._data.copyTgt(evt.changedTouches[0], evt);
            },
            "reinitData": () => {
                this.reinitData();
            }
        };
        this.fsm.buildFSM(this.handler);
    }
}
