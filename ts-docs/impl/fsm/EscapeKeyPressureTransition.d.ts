import type { InputState } from "../../api/fsm/InputState";
import type { OutputState } from "../../api/fsm/OutputState";
import { KeyPressureTransition } from "./KeyPressureTransition";
export declare class EscapeKeyPressureTransition extends KeyPressureTransition {
    constructor(srcState: OutputState, tgtState: InputState);
    isGuardOK(event: KeyboardEvent): boolean;
}
