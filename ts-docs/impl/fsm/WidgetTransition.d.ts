import { TransitionBase } from "./TransitionBase";
import type { OutputState } from "../../api/fsm/OutputState";
import type { InputState } from "../../api/fsm/InputState";
export declare abstract class WidgetTransition<T> extends TransitionBase<Event> {
    protected widget: T;
    protected constructor(srcState: OutputState, tgtState: InputState);
    getWidget(): T;
    setWidget(widget: T): void;
}
