import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import type { PointData } from "../../../api/interaction/PointData";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { PointDataImpl } from "../PointDataImpl";
export declare class MouseoutFSM extends FSMImpl {
    private readonly withBubbling;
    constructor(withBubbling: boolean);
    buildFSM(dataHandler?: MouseoutFSMHandler): void;
}
interface MouseoutFSMHandler extends FSMDataHandler {
    onExit(event: MouseEvent): void;
}
export declare class Mouseout extends InteractionBase<PointData, PointDataImpl, MouseoutFSM> {
    private readonly handler;
    constructor(withBubbling: boolean);
}
export {};
