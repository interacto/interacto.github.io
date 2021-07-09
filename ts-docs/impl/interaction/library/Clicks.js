import { FSMImpl } from "../../fsm/FSMImpl";
import { StdState } from "../../fsm/StdState";
import { TerminalState } from "../../fsm/TerminalState";
import { CancellingState } from "../../fsm/CancellingState";
import { ClickTransition } from "../../fsm/ClickTransition";
import { TimeoutTransition } from "../../fsm/TimeoutTransition";
import { InteractionBase } from "../InteractionBase";
import { PointDataImpl } from "../PointDataImpl";
import { PointsDataImpl } from "../PointsDataImpl";
export class ClicksFSM extends FSMImpl {
    constructor(nbClicks) {
        super();
        if (nbClicks <= 0) {
            throw new Error("The number of clicks must be greater than 1");
        }
        if (nbClicks === 1) {
            throw new Error("For a number of clicks that equals 1, use the Click interaction");
        }
        this.countClicks = 0;
        this.nbClicks = nbClicks;
    }
    reinit() {
        super.reinit();
        this.countClicks = 0;
    }
    buildFSM(dataHandler) {
        if (this.states.length > 1) {
            return;
        }
        super.buildFSM(dataHandler);
        const clicked = new StdState(this, "clicked");
        const ended = new TerminalState(this, "ended");
        const timeouted = new CancellingState(this, "timeouted");
        this.addState(clicked);
        this.addState(ended);
        this.addState(timeouted);
        const firstclick = new ClickTransition(this.initState, clicked);
        firstclick.action = (event) => {
            this.countClicks++;
            dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.click(event);
        };
        const newclick = new ClickTransition(clicked, clicked);
        newclick.action = (event) => {
            this.countClicks++;
            dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.click(event);
        };
        newclick.isGuardOK = (_event) => (this.countClicks + 1) < this.nbClicks;
        const finalclick = new ClickTransition(clicked, ended);
        finalclick.action = (event) => {
            dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.click(event);
        };
        finalclick.isGuardOK = (_event) => (this.countClicks + 1) === this.nbClicks;
        new TimeoutTransition(clicked, timeouted, () => 1000);
    }
}
export class Clicks extends InteractionBase {
    constructor(numberClicks) {
        super(new ClicksFSM(numberClicks), new PointsDataImpl());
        this.handler = {
            "click": (evt) => {
                const pt = new PointDataImpl();
                pt.copy(evt);
                this._data.addPoint(pt);
            },
            "reinitData": () => {
                this.reinitData();
            }
        };
        this.fsm.buildFSM(this.handler);
    }
}
