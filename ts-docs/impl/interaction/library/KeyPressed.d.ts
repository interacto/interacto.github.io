import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import type { KeyData } from "../../../api/interaction/KeyData";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { KeyDataImpl } from "../KeyDataImpl";
export declare class KeyPressedFSM extends FSMImpl {
    private readonly modifiersAccepted;
    constructor(modifierAccepted: boolean);
    buildFSM(dataHandler?: KeyPressedFSMHandler): void;
    reinit(): void;
}
interface KeyPressedFSMHandler extends FSMDataHandler {
    onKeyPressed(event: KeyboardEvent): void;
}
export declare class KeyPressed extends InteractionBase<KeyData, KeyDataImpl, KeyPressedFSM> {
    private readonly handler;
    constructor(modifierAccepted: boolean, fsm?: KeyPressedFSM);
}
export {};
