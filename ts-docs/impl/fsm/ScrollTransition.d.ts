import type { InputState } from "../../api/fsm/InputState";
import type { OutputState } from "../../api/fsm/OutputState";
import { TransitionBase } from "./TransitionBase";
import type { EventType } from "../../api/fsm/EventType";
export declare class ScrollTransition extends TransitionBase<UIEvent> {
    constructor(srcState: OutputState, tgtState: InputState);
    accept(event: Event): event is UIEvent;
    getAcceptedEvents(): ReadonlyArray<EventType>;
}
