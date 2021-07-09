import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import type { KeysData } from "../../../api/interaction/KeysData";
import { FSMImpl } from "../../fsm/FSMImpl";
import { KeysDataImpl } from "../KeysDataImpl";
import { InteractionBase } from "../InteractionBase";
export declare class KeysPressedFSM extends FSMImpl {
    private readonly currentCodes;
    constructor();
    buildFSM(dataHandler?: KeysPressedFSMHandler): void;
    reinit(): void;
}
interface KeysPressedFSMHandler extends FSMDataHandler {
    onKeyPressed(event: KeyboardEvent): void;
}
export declare class KeysPressed extends InteractionBase<KeysData, KeysDataImpl, KeysPressedFSM> {
    private readonly handler;
    constructor();
}
export {};
