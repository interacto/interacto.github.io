import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import { ClickFSM } from "./Click";
import { FSMImpl } from "../../fsm/FSMImpl";
import type { PointData } from "../../../api/interaction/PointData";
import { InteractionBase } from "../InteractionBase";
import { PointDataImpl } from "../PointDataImpl";
export declare class DoubleClickFSM extends FSMImpl {
    private static timeGap;
    private static readonly timeGapSupplier;
    static getTimeGap(): number;
    static setTimeGap(timeGapBetweenClicks: number): void;
    readonly firstClickFSM: ClickFSM;
    private readonly sndClickFSM;
    private checkButton?;
    constructor();
    set log(log: boolean);
    buildFSM(dataHandler?: FSMDataHandler): void;
    setCheckButton(buttonToCheck: number): void;
    getCheckButton(): number;
    fullReinit(): void;
    reinit(): void;
}
export declare class DoubleClick extends InteractionBase<PointData, PointDataImpl, DoubleClickFSM> {
    constructor(fsm?: DoubleClickFSM, data?: PointDataImpl);
}
