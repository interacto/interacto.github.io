import { Click, ClickFSM } from "./Click";
import { TerminalState } from "../../fsm/TerminalState";
import { CancellingState } from "../../fsm/CancellingState";
import { StdState } from "../../fsm/StdState";
import { SubFSMTransition } from "../../fsm/SubFSMTransition";
import { FSMImpl } from "../../fsm/FSMImpl";
import { TimeoutTransition } from "../../fsm/TimeoutTransition";
import { MoveTransition } from "../../fsm/MoveTransition";
import { InteractionBase } from "../InteractionBase";
import { PointDataImpl } from "../PointDataImpl";
export class DoubleClickFSM extends FSMImpl {
    constructor() {
        super();
        this.firstClickFSM = new ClickFSM();
        this.sndClickFSM = new ClickFSM();
    }
    static getTimeGap() {
        return DoubleClickFSM.timeGap;
    }
    static setTimeGap(timeGapBetweenClicks) {
        if (timeGapBetweenClicks > 0) {
            DoubleClickFSM.timeGap = timeGapBetweenClicks;
        }
    }
    set log(log) {
        super.log = log;
        this.firstClickFSM.log = log;
        this.sndClickFSM.log = log;
    }
    buildFSM(dataHandler) {
        if (this.states.length > 1) {
            return;
        }
        super.buildFSM(dataHandler);
        this.firstClickFSM.buildFSM();
        this.sndClickFSM.buildFSM();
        const dbleclicked = new TerminalState(this, "dbleclicked");
        const cancelled = new CancellingState(this, "cancelled");
        const clicked = new StdState(this, "clicked");
        this.addState(clicked);
        this.addState(dbleclicked);
        this.addState(cancelled);
        this.startingState = dbleclicked;
        const firstClick = new SubFSMTransition(this.initState, clicked, this.firstClickFSM);
        firstClick.action = () => {
            this.setCheckButton(this.firstClickFSM.getCheckButton());
        };
        const move = new MoveTransition(clicked, cancelled);
        move.isGuardOK = (event) => (this.checkButton === undefined || event instanceof MouseEvent &&
            event.button === this.checkButton);
        new TimeoutTransition(clicked, cancelled, DoubleClickFSM.timeGapSupplier);
        new SubFSMTransition(clicked, dbleclicked, this.sndClickFSM);
    }
    setCheckButton(buttonToCheck) {
        if (this.checkButton === undefined) {
            this.checkButton = buttonToCheck;
        }
        this.sndClickFSM.setCheckButton(buttonToCheck);
    }
    getCheckButton() {
        var _a;
        return (_a = this.checkButton) !== null && _a !== void 0 ? _a : -1;
    }
    fullReinit() {
        super.fullReinit();
        this.firstClickFSM.fullReinit();
        this.sndClickFSM.fullReinit();
    }
    reinit() {
        super.reinit();
        this.firstClickFSM.reinit();
        this.sndClickFSM.reinit();
        this.checkButton = undefined;
    }
}
DoubleClickFSM.timeGap = 300;
DoubleClickFSM.timeGapSupplier = () => DoubleClickFSM.getTimeGap();
export class DoubleClick extends InteractionBase {
    constructor(fsm, data) {
        super(fsm !== null && fsm !== void 0 ? fsm : new DoubleClickFSM(), data !== null && data !== void 0 ? data : new PointDataImpl());
        new Click(this.fsm.firstClickFSM, this._data);
        this.fsm.buildFSM(this);
    }
}
