import { StateBase } from "./StateBase";
import type { InputState } from "../../api/fsm/InputState";
import type { FSM } from "../../api/fsm/FSM";
export declare class CancellingState extends StateBase implements InputState {
    constructor(stateMachine: FSM, stateName: string);
    enter(): void;
    uninstall(): void;
}
