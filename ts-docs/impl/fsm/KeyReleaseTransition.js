import { isKeyUpEvent } from "./Events";
import { TransitionBase } from "./TransitionBase";
export class KeyReleaseTransition extends TransitionBase {
    constructor(srcState, tgtState) {
        super(srcState, tgtState);
    }
    accept(event) {
        return isKeyUpEvent(event);
    }
    getAcceptedEvents() {
        return ["keyup"];
    }
}
