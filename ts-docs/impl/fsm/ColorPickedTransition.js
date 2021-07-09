import { isColorChoice } from "./Events";
import { TransitionBase } from "./TransitionBase";
export class ColorPickedTransition extends TransitionBase {
    constructor(srcState, tgtState) {
        super(srcState, tgtState);
    }
    accept(event) {
        return event.target !== null && isColorChoice(event.target);
    }
    getAcceptedEvents() {
        return ["input"];
    }
}
