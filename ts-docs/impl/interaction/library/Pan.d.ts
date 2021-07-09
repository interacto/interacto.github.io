import { FSMImpl } from "../../fsm/FSMImpl";
import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import { InteractionBase } from "../InteractionBase";
import { SrcTgtTouchDataImpl } from "../SrcTgtTouchDataImpl";
import type { SrcTgtPointsData } from "../../../api/interaction/SrcTgtPointsData";
import type { TouchData } from "../../../api/interaction/TouchData";
export declare class PanFSM extends FSMImpl {
    protected readonly horizontal: boolean;
    protected readonly minLength: number;
    protected readonly pxTolerance: number;
    protected touchID?: number;
    protected stableAxe?: number;
    protected moveAxe?: number;
    constructor(horizontal: boolean, minLength: number, pxTolerance: number);
    getPanDistance(x: number, y: number): number;
    isStable(x: number, y: number): boolean;
    buildFSM(dataHandler?: PanFSMDataHandler): void;
    private configMove;
    private configRelease;
    protected setInitialValueOnTouch(evt: TouchEvent): void;
    protected checkFinalPanConditions(evt: TouchEvent): boolean;
    reinit(): void;
}
interface PanFSMDataHandler extends FSMDataHandler {
    touch(evt: TouchEvent): void;
    panning(evt: TouchEvent): void;
    panned(evt: TouchEvent): void;
}
export declare class Pan extends InteractionBase<SrcTgtPointsData<TouchData>, SrcTgtTouchDataImpl, PanFSM> {
    private readonly handler;
    constructor(horizontal: boolean, minLength: number, pxTolerance: number, fsm?: PanFSM);
}
export {};
