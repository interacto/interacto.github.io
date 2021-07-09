import { StateBase } from "./StateBase";
import type { OutputState } from "../../api/fsm/OutputState";
import type { FSM } from "../../api/fsm/FSM";
import type { Transition } from "../../api/fsm/Transition";
export declare abstract class OutputStateBase extends StateBase implements OutputState {
    protected readonly _transitions: Array<Transition<Event>>;
    protected constructor(stateMachine: FSM, stateName: string);
    process(event: Event): boolean;
    clearTransitions(): void;
    get transitions(): ReadonlyArray<Transition<Event>>;
    addTransition(tr: Transition<Event>): void;
    abstract exit(): void;
    uninstall(): void;
}
