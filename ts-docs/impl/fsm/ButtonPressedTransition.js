import { isButton } from "./Events";
import { TransitionBase } from "./TransitionBase";
export class ButtonPressedTransition extends TransitionBase {
    constructor(srcState, tgtState) {
        super(srcState, tgtState);
    }
    accept(e) {
        return e.target !== null && isButton(e.target);
    }
    getAcceptedEvents() {
        return ["click", "auxclick"];
    }
}
