import { InteractionBase } from "../InteractionBase";
import { FSMImpl } from "../../fsm/FSMImpl";
import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import type { TapData } from "../../../api/interaction/TapData";
import { TapDataImpl } from "../TapDataImpl";
declare class TapFSM extends FSMImpl {
    private countTaps;
    private readonly nbTaps;
    constructor(nbTaps: number);
    buildFSM(dataHandler?: TapFSMHandler): void;
    reinit(): void;
}
interface TapFSMHandler extends FSMDataHandler {
    tap(evt: TouchEvent): void;
}
export declare class Tap extends InteractionBase<TapData, TapDataImpl, TapFSM> {
    private readonly handler;
    constructor(numberTaps: number);
}
export {};
