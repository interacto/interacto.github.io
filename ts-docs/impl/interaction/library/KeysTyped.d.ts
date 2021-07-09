import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import type { KeysData } from "../../../api/interaction/KeysData";
import { KeysDataImpl } from "../KeysDataImpl";
import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import type { Logger } from "../../../api/logging/Logger";
export declare class KeysTypedFSM extends FSMImpl {
    private static readonly timeGap;
    private static readonly timeGapSupplier;
    private static getTimeGap;
    constructor();
    buildFSM(dataHandler?: KeyTypedFSMHandler): void;
}
interface KeyTypedFSMHandler extends FSMDataHandler {
    onKeyTyped(event: Event): void;
}
export declare class KeysTyped extends InteractionBase<KeysData, KeysDataImpl, KeysTypedFSM> {
    constructor(logger?: Logger);
}
export {};
