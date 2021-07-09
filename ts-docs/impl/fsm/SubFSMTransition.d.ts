import { TransitionBase } from "./TransitionBase";
import type { FSM } from "../../api/fsm/FSM";
import type { OutputState } from "../../api/fsm/OutputState";
import type { InputState } from "../../api/fsm/InputState";
import type { EventType } from "../../api/fsm/EventType";
export declare class SubFSMTransition extends TransitionBase<Event> {
    private readonly subFSM;
    private readonly subFSMHandler;
    private subStateSubscription?;
    constructor(srcState: OutputState, tgtState: InputState, fsm: FSM);
    private setUpFSMHandler;
    private unsetFSMHandler;
    private cancelsFSM;
    execute(event: Event): InputState | undefined;
    accept(event: Event): event is Event;
    isGuardOK(event: Event): boolean;
    private findTransition;
    getAcceptedEvents(): ReadonlyArray<EventType>;
    uninstall(): void;
}
