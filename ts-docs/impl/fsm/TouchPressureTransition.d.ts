import type { OutputState } from "../../api/fsm/OutputState";
import type { InputState } from "../../api/fsm/InputState";
import { TransitionBase } from "./TransitionBase";
import type { EventType } from "../../api/fsm/EventType";
export declare class TouchPressureTransition extends TransitionBase<TouchEvent> {
    constructor(srcState: OutputState, tgtState: InputState);
    accept(evt: Event): evt is TouchEvent;
    getAcceptedEvents(): ReadonlyArray<EventType>;
}
