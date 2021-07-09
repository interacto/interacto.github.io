import type { OutputState } from "../../api/fsm/OutputState";
import type { InputState } from "../../api/fsm/InputState";
import type { Transition } from "../../api/fsm/Transition";
import type { EventType } from "../../api/fsm/EventType";
export declare abstract class TransitionBase<E extends Event> implements Transition<E> {
    readonly src: OutputState;
    readonly tgt: InputState;
    protected constructor(srcState: OutputState, tgtState: InputState);
    execute(event: Event): InputState | undefined;
    action(_event?: E): void;
    abstract accept(event: Event): event is E;
    isGuardOK(_event: E): boolean;
    abstract getAcceptedEvents(): ReadonlyArray<EventType>;
    get target(): InputState;
    uninstall(): void;
}
