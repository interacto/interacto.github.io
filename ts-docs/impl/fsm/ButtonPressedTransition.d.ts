import type { OutputState } from "../../api/fsm/OutputState";
import type { InputState } from "../../api/fsm/InputState";
import { TransitionBase } from "./TransitionBase";
import type { EventType } from "../../api/fsm/EventType";
export declare class ButtonPressedTransition extends TransitionBase<Event> {
    constructor(srcState: OutputState, tgtState: InputState);
    accept(e: Event): e is Event;
    getAcceptedEvents(): ReadonlyArray<EventType>;
}
