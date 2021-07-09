import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import type { WidgetData } from "../../../api/interaction/WidgetData";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { WidgetDataImpl } from "../WidgetDataImpl";
export declare class SpinnerChangedFSM extends FSMImpl {
    private static timeGap;
    private static readonly timeGapSupplier;
    static getTimeGap(): number;
    static setTimeGap(timeGapBetweenClicks: number): void;
    buildFSM(dataHandler: SpinnerChangedHandler): void;
}
interface SpinnerChangedHandler extends FSMDataHandler {
    initToChangedHandler(event: Event): void;
}
export declare class SpinnerChanged extends InteractionBase<WidgetData<HTMLInputElement>, WidgetDataImpl<HTMLInputElement>, SpinnerChangedFSM> {
    private readonly handler;
    constructor();
    onNewNodeRegistered(node: EventTarget): void;
    onNodeUnregistered(node: EventTarget): void;
}
export {};
