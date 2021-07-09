import { DoubleClick, DoubleClickFSM } from "./DoubleClick";
import { TerminalState } from "../../fsm/TerminalState";
import { CancellingState } from "../../fsm/CancellingState";
import { StdState } from "../../fsm/StdState";
import { SubFSMTransition } from "../../fsm/SubFSMTransition";
import { FSMImpl } from "../../fsm/FSMImpl";
import { MoveTransition } from "../../fsm/MoveTransition";
import { InteractionBase } from "../InteractionBase";
import { EscapeKeyPressureTransition } from "../../fsm/EscapeKeyPressureTransition";
import { SrcTgtPointsDataImpl } from "../SrcTgtPointsDataImpl";
class DragLockFSM extends FSMImpl {
    constructor() {
        super();
        this.firstDbleClick = new DoubleClickFSM();
        this.sndDbleClick = new DoubleClickFSM();
    }
    set log(log) {
        super.log = log;
        this.firstDbleClick.log = log;
        this.sndDbleClick.log = log;
    }
    reinit() {
        super.reinit();
        this.firstDbleClick.reinit();
        this.sndDbleClick.reinit();
        this.checkButton = undefined;
    }
    fullReinit() {
        super.fullReinit();
        this.firstDbleClick.fullReinit();
        this.sndDbleClick.fullReinit();
    }
    getDataHandler() {
        return this.dataHandler;
    }
    buildFSM(dataHandler) {
        if (this.states.length > 1) {
            return;
        }
        super.buildFSM(dataHandler);
        const cancelDbleClick = new DoubleClickFSM();
        this.firstDbleClick.buildFSM();
        this.sndDbleClick.buildFSM();
        cancelDbleClick.buildFSM();
        const dropped = new TerminalState(this, "dropped");
        const cancelled = new CancellingState(this, "cancelled");
        const locked = new StdState(this, "locked");
        const moved = new StdState(this, "moved");
        this.addState(dropped);
        this.addState(cancelled);
        this.addState(locked);
        this.addState(moved);
        const subTr = new SubFSMTransition(this.initState, locked, this.firstDbleClick);
        subTr.action = () => {
            const checkButton = this.firstDbleClick.getCheckButton();
            this.sndDbleClick.setCheckButton(checkButton);
            cancelDbleClick.setCheckButton(checkButton);
            dataHandler.onFirstDbleClick();
        };
        new SubFSMTransition(locked, cancelled, cancelDbleClick);
        const moveAction = (event) => {
            var _a;
            (_a = this.getDataHandler()) === null || _a === void 0 ? void 0 : _a.onMove(event);
        };
        const movelock = new MoveTransition(locked, moved);
        movelock.action = moveAction;
        const move = new MoveTransition(moved, moved);
        move.action = moveAction;
        new EscapeKeyPressureTransition(locked, cancelled);
        new EscapeKeyPressureTransition(moved, cancelled);
        new SubFSMTransition(moved, dropped, this.sndDbleClick);
    }
}
export class DragLock extends InteractionBase {
    constructor() {
        super(new DragLockFSM(), new SrcTgtPointsDataImpl());
        const handler = {
            "onMove": (evt) => {
                this.data.tgt.copy(evt);
            },
            "onFirstDbleClick": () => {
                this.data.tgt.copy(this.data.src);
            },
            "reinitData": () => {
                this.reinitData();
            }
        };
        new DoubleClick(this.fsm.firstDbleClick, this.data.src);
        new DoubleClick(this.fsm.sndDbleClick, this.data.tgt);
        this.fsm.buildFSM(handler);
    }
}
