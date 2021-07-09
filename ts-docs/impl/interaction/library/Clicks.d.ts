import { FSMImpl } from "../../fsm/FSMImpl";
import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import { InteractionBase } from "../InteractionBase";
import type { PointsData } from "../../../api/interaction/PointsData";
import { PointsDataImpl } from "../PointsDataImpl";
export declare class ClicksFSM extends FSMImpl {
    private countClicks;
    private readonly nbClicks;
    constructor(nbClicks: number);
    reinit(): void;
    buildFSM(dataHandler?: ClicksFSMHandler): void;
}
interface ClicksFSMHandler extends FSMDataHandler {
    click(evt: MouseEvent): void;
}
export declare class Clicks extends InteractionBase<PointsData, PointsDataImpl, ClicksFSM> {
    private readonly handler;
    constructor(numberClicks: number);
}
export {};
