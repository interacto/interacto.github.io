import type { FSM } from "./FSM";
export interface State {
    readonly name: string;
    readonly fsm: FSM;
    checkStartingState(): void;
    uninstall(): void;
}
