import type { Observable } from "rxjs";
import type { OutputState } from "./OutputState";
import type { State } from "./State";
import type { FSMHandler } from "./FSMHandler";
import type { InputState } from "./InputState";
export interface FSM {
    readonly states: ReadonlyArray<State>;
    currentState: OutputState;
    readonly currentStateObservable: Observable<[OutputState, OutputState]>;
    readonly initState: OutputState;
    readonly startingState: State;
    readonly started: boolean;
    inner: boolean;
    currentSubFSM: FSM | undefined;
    log: boolean;
    process(event: Event): boolean;
    onStarting(): void;
    onUpdating(): void;
    onCancelling(): void;
    onTerminating(): void;
    onTimeout(): void;
    stopCurrentTimeout(): void;
    enterStdState(state: InputState & OutputState): void;
    addHandler(handler: FSMHandler): void;
    removeHandler(handler: FSMHandler): void;
    reinit(): void;
    fullReinit(): void;
    uninstall(): void;
}
