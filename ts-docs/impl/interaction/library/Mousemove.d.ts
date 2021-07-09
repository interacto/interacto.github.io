import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import type { PointData } from "../../../api/interaction/PointData";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { PointDataImpl } from "../PointDataImpl";
export declare class MousemoveFSM extends FSMImpl {
    constructor();
    buildFSM(dataHandler?: MousemoveFSMHandler): void;
}
interface MousemoveFSMHandler extends FSMDataHandler {
    onMove(event: MouseEvent): void;
}
export declare class Mousemove extends InteractionBase<PointData, PointDataImpl, MousemoveFSM> {
    private readonly handler;
    constructor();
}
export {};
