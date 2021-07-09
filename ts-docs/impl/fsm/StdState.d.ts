import { OutputStateBase } from "./OutputStateBase";
import type { InputState } from "../../api/fsm/InputState";
import type { FSM } from "../../api/fsm/FSM";
export declare class StdState extends OutputStateBase implements InputState {
    constructor(stateMachine: FSM, stateName: string);
    enter(): void;
    exit(): void;
}
