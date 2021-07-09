import { TransitionBase } from "./TransitionBase";
export class WidgetTransition extends TransitionBase {
    constructor(srcState, tgtState) {
        super(srcState, tgtState);
    }
    getWidget() {
        return this.widget;
    }
    setWidget(widget) {
        this.widget = widget;
    }
}
