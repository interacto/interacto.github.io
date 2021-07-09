import { isDatePicker } from "./Events";
import { TransitionBase } from "./TransitionBase";
export class DatePickedTransition extends TransitionBase {
    constructor(srcState, tgtState) {
        super(srcState, tgtState);
    }
    accept(event) {
        return event.target !== null && isDatePicker(event.target);
    }
    getAcceptedEvents() {
        return ["input"];
    }
}
