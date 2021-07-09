import { isMouseDownEvent } from "./Events";
import { TransitionBase } from "./TransitionBase";
export class PressureTransition extends TransitionBase {
    constructor(srcState, tgtState) {
        super(srcState, tgtState);
    }
    accept(event) {
        return isMouseDownEvent(event);
    }
    getAcceptedEvents() {
        return ["mousedown"];
    }
}
