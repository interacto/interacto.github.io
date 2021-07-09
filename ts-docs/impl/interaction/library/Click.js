import { TerminalState } from "../../fsm/TerminalState";
import { ClickTransition } from "../../fsm/ClickTransition";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { PointDataImpl } from "../PointDataImpl";
export class ClickFSM extends FSMImpl {
    constructor() {
        super();
    }
    buildFSM(dataHandler) {
        if (this.states.length > 1) {
            return;
        }
        super.buildFSM(dataHandler);
        const clicked = new TerminalState(this, "clicked");
        this.addState(clicked);
        const clickt = new ClickTransition(this.initState, clicked);
        clickt.action = (event) => {
            this.setCheckButton(event.button);
            dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.initToClicked(event);
        };
        clickt.isGuardOK = (event) => this.checkButton === undefined || event.button === this.checkButton;
    }
    getCheckButton() {
        var _a;
        return (_a = this.checkButton) !== null && _a !== void 0 ? _a : -1;
    }
    setCheckButton(buttonToCheck) {
        if (this.checkButton === undefined) {
            this.checkButton = buttonToCheck;
        }
    }
    reinit() {
        super.reinit();
        this.checkButton = undefined;
    }
}
export class Click extends InteractionBase {
    constructor(fsm, data) {
        super(fsm !== null && fsm !== void 0 ? fsm : new ClickFSM(), data !== null && data !== void 0 ? data : new PointDataImpl());
        this.handler = {
            "initToClicked": (evt) => {
                this._data.copy(evt);
            },
            "reinitData": () => {
                this.reinitData();
            }
        };
        this.fsm.buildFSM(this.handler);
    }
}
