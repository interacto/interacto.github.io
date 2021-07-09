import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import type { KeyData } from "../../../api/interaction/KeyData";
import { FSMImpl } from "../../fsm/FSMImpl";
import { KeyDataImpl } from "../KeyDataImpl";
import { InteractionBase } from "../InteractionBase";
export declare class KeyTypedFSM extends FSMImpl {
    private checkKey?;
    buildFSM(dataHandler?: KeyTypedFSMHandler): void;
    reinit(): void;
}
interface KeyTypedFSMHandler extends FSMDataHandler {
    onKeyTyped(event: KeyboardEvent): void;
}
export declare class KeyTyped extends InteractionBase<KeyData, KeyDataImpl, KeyTypedFSM> {
    private readonly handler;
    constructor();
}
export {};
