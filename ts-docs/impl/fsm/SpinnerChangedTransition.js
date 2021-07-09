import { isSpinner } from "./Events";
import { TransitionBase } from "./TransitionBase";
export class SpinnerChangedTransition extends TransitionBase {
    constructor(srcState, tgtState) {
        super(srcState, tgtState);
    }
    accept(event) {
        return event.target !== null && isSpinner(event.target);
    }
    getAcceptedEvents() {
        return ["input"];
    }
}
