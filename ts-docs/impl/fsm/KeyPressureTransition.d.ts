import type { InputState } from "../../api/fsm/InputState";
import type { OutputState } from "../../api/fsm/OutputState";
import { TransitionBase } from "./TransitionBase";
import type { EventType } from "../../api/fsm/EventType";
export declare class KeyPressureTransition extends TransitionBase<KeyboardEvent> {
    constructor(srcState: OutputState, tgtState: InputState);
    accept(event: Event): event is KeyboardEvent;
    getAcceptedEvents(): ReadonlyArray<EventType>;
}
