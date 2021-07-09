import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import type { PointData } from "../../../api/interaction/PointData";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { PointDataImpl } from "../PointDataImpl";
export declare class ClickFSM extends FSMImpl {
    private checkButton?;
    constructor();
    buildFSM(dataHandler?: ClickFSMHandler): void;
    getCheckButton(): number;
    setCheckButton(buttonToCheck: number): void;
    reinit(): void;
}
interface ClickFSMHandler extends FSMDataHandler {
    initToClicked(event: MouseEvent): void;
}
export declare class Click extends InteractionBase<PointData, PointDataImpl, ClickFSM> {
    private readonly handler;
    constructor(fsm?: ClickFSM, data?: PointDataImpl);
}
export {};
