import { FSMImpl } from "../../fsm/FSMImpl";
import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import { InteractionBase } from "../InteractionBase";
import type { PointData } from "../../../api/interaction/PointData";
import { PointDataImpl } from "../PointDataImpl";
export declare class LongPressFSM extends FSMImpl {
    private readonly duration;
    private currentButton?;
    constructor(duration: number);
    buildFSM(dataHandler?: LongPressFSMHandler): void;
    reinit(): void;
}
interface LongPressFSMHandler extends FSMDataHandler {
    press(evt: MouseEvent): void;
}
export declare class LongPress extends InteractionBase<PointData, PointDataImpl, LongPressFSM> {
    private readonly handler;
    constructor(duration: number);
}
export {};
