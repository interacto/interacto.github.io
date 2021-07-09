import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import type { SrcTgtPointsData } from "../../../api/interaction/SrcTgtPointsData";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { SrcTgtPointsDataImpl } from "../SrcTgtPointsDataImpl";
import type { PointData } from "../../../api/interaction/PointData";
declare class DnDFSM extends FSMImpl {
    private readonly cancellable;
    private buttonToCheck?;
    constructor(cancellable: boolean);
    buildFSM(dataHandler: DnDFSMHandler): void;
    private configureCancellation;
    reinit(): void;
}
interface DnDFSMHandler extends FSMDataHandler {
    onPress(event: Event): void;
    onDrag(event: Event): void;
    onRelease(event: Event): void;
}
export declare class DnD extends InteractionBase<SrcTgtPointsData<PointData>, SrcTgtPointsDataImpl, DnDFSM> {
    private readonly handler;
    constructor(cancellable: boolean);
}
export {};
