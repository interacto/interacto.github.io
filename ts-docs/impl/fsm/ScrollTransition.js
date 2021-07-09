import { isScrollEvent } from "./Events";
import { TransitionBase } from "./TransitionBase";
export class ScrollTransition extends TransitionBase {
    constructor(srcState, tgtState) {
        super(srcState, tgtState);
    }
    accept(event) {
        return isScrollEvent(event);
    }
    getAcceptedEvents() {
        return ["scroll"];
    }
}
