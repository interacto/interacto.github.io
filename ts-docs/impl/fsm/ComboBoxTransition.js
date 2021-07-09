import { isComboBox } from "./Events";
import { TransitionBase } from "./TransitionBase";
export class ComboBoxTransition extends TransitionBase {
    constructor(srcState, tgtState) {
        super(srcState, tgtState);
    }
    accept(event) {
        return event.target !== null && isComboBox(event.target);
    }
    getAcceptedEvents() {
        return ["input"];
    }
}
