import { TerminalState } from "../../fsm/TerminalState";
import { ScrollTransition } from "../../fsm/ScrollTransition";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { ScrollDataImpl } from "../ScrollDataImpl";
export class ScrollFSM extends FSMImpl {
    buildFSM(dataHandler) {
        if (this.states.length > 1) {
            return;
        }
        super.buildFSM(dataHandler);
        const scrolled = new TerminalState(this, "scrolled");
        this.addState(scrolled);
        const scroll = new ScrollTransition(this.initState, scrolled);
        scroll.action = (event) => {
            dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.initToScroll(event);
        };
    }
}
export class Scroll extends InteractionBase {
    constructor() {
        super(new ScrollFSM(), new ScrollDataImpl());
        this.handler = {
            "initToScroll": (event) => {
                this._data.setScrollData(event);
            },
            "reinitData": () => {
                this.reinitData();
            }
        };
        this.fsm.buildFSM(this.handler);
    }
}
