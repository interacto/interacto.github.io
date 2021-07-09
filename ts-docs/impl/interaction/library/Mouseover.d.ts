import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import type { PointData } from "../../../api/interaction/PointData";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { PointDataImpl } from "../PointDataImpl";
export declare class MouseoverFSM extends FSMImpl {
    private readonly withBubbling;
    constructor(withBubbling: boolean);
    buildFSM(dataHandler?: MouseoverFSMHandler): void;
}
interface MouseoverFSMHandler extends FSMDataHandler {
    onEnter(event: MouseEvent): void;
}
export declare class Mouseover extends InteractionBase<PointData, PointDataImpl, MouseoverFSM> {
    private readonly handler;
    constructor(withBubbling: boolean);
}
export {};
