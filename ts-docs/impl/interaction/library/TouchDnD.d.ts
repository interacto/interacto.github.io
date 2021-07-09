import { InteractionBase } from "../InteractionBase";
import { FSMImpl } from "../../fsm/FSMImpl";
import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import { SrcTgtTouchDataImpl } from "../SrcTgtTouchDataImpl";
import type { SrcTgtPointsData } from "../../../api/interaction/SrcTgtPointsData";
import type { TouchData } from "../../../api/interaction/TouchData";
export declare class TouchDnDFSM extends FSMImpl {
    private touchID?;
    constructor();
    buildFSM(dataHandler?: TouchDnDFSMHandler): void;
    getTouchId(): number | undefined;
    reinit(): void;
}
export interface TouchDnDFSMHandler extends FSMDataHandler {
    onTouch(event: TouchEvent): void;
    onMove(event: TouchEvent): void;
    onRelease(event: TouchEvent): void;
}
export declare class TouchDnD extends InteractionBase<SrcTgtPointsData<TouchData>, SrcTgtTouchDataImpl, TouchDnDFSM> {
    private readonly handler;
    constructor(fsm?: TouchDnDFSM);
    private setTgtData;
}
