import type { InputState } from "../../api/fsm/InputState";
import type { OutputState } from "../../api/fsm/OutputState";
import { TransitionBase } from "./TransitionBase";
import type { EventType } from "../../api/fsm/EventType";
export declare class ClickTransition extends TransitionBase<MouseEvent> {
    constructor(srcState: OutputState, tgtState: InputState);
    accept(event: Event): event is MouseEvent;
    getAcceptedEvents(): ReadonlyArray<EventType>;
}
