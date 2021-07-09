import { isTextInput } from "./Events";
import { TransitionBase } from "./TransitionBase";
export class TextInputChangedTransition extends TransitionBase {
    constructor(srcState, tgtState) {
        super(srcState, tgtState);
    }
    accept(event) {
        return event.target !== null && isTextInput(event.target);
    }
    getAcceptedEvents() {
        return ["input"];
    }
}
