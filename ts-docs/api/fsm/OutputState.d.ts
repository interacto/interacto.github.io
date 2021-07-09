import type { State } from "./State";
import type { Transition } from "./Transition";
export interface OutputState extends State {
    readonly transitions: ReadonlyArray<Transition<Event>>;
    exit(): void;
    process(event: Event): boolean;
    addTransition(tr: Transition<Event>): void;
}
export declare function isOutputStateType(obj: State | undefined): obj is OutputState;
