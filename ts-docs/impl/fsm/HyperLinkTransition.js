import { isHyperLink } from "./Events";
import { TransitionBase } from "./TransitionBase";
export class HyperLinkTransition extends TransitionBase {
    constructor(srcState, tgtState) {
        super(srcState, tgtState);
    }
    accept(event) {
        return event.target !== null && isHyperLink(event.target);
    }
    getAcceptedEvents() {
        return ["click", "auxclick"];
    }
}
