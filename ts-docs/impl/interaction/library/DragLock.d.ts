import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import { DoubleClickFSM } from "./DoubleClick";
import { FSMImpl } from "../../fsm/FSMImpl";
import type { SrcTgtPointsData } from "../../../api/interaction/SrcTgtPointsData";
import { InteractionBase } from "../InteractionBase";
import { SrcTgtPointsDataImpl } from "../SrcTgtPointsDataImpl";
import type { PointData } from "../../../api/interaction/PointData";
declare class DragLockFSM extends FSMImpl {
    readonly firstDbleClick: DoubleClickFSM;
    readonly sndDbleClick: DoubleClickFSM;
    protected checkButton?: number;
    constructor();
    set log(log: boolean);
    reinit(): void;
    fullReinit(): void;
    getDataHandler(): DragLockFSMHandler | undefined;
    buildFSM(dataHandler: DragLockFSMHandler): void;
}
interface DragLockFSMHandler extends FSMDataHandler {
    onMove(event: MouseEvent): void;
    onFirstDbleClick(): void;
}
export declare class DragLock extends InteractionBase<SrcTgtPointsData<PointData>, SrcTgtPointsDataImpl, DragLockFSM> {
    constructor();
}
export {};
