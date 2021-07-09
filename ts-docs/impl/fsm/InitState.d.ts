import { OutputStateBase } from "./OutputStateBase";
import type { FSM } from "../../api/fsm/FSM";
export declare class InitState extends OutputStateBase {
    constructor(stateMachine: FSM, stateName: string);
    exit(): void;
}
