import { TransitionBase } from "./TransitionBase";
import { isEventType } from "./Events";
export class ClickTransition extends TransitionBase {
    constructor(srcState, tgtState) {
        super(srcState, tgtState);
    }
    accept(event) {
        return event instanceof MouseEvent && isEventType(event.type) && this.getAcceptedEvents().includes(event.type);
    }
    getAcceptedEvents() {
        return ["click", "auxclick"];
    }
}
