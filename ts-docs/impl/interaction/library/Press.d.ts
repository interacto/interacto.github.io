import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import type { PointData } from "../../../api/interaction/PointData";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { PointDataImpl } from "../PointDataImpl";
export declare class PressFSM extends FSMImpl {
    buildFSM(dataHandler?: PressFSMHandler): void;
}
interface PressFSMHandler extends FSMDataHandler {
    initToPress(event: MouseEvent): void;
}
export declare class Press extends InteractionBase<PointData, PointDataImpl, PressFSM> {
    private readonly handler;
    constructor();
}
export {};
