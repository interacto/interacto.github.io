import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import type { WidgetData } from "../../../api/interaction/WidgetData";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { WidgetDataImpl } from "../WidgetDataImpl";
declare class DatePickedFSM extends FSMImpl {
    constructor();
    buildFSM(dataHandler: DatePickedHandler): void;
}
interface DatePickedHandler extends FSMDataHandler {
    initToPickedHandler(event: Event): void;
}
export declare class DatePicked extends InteractionBase<WidgetData<HTMLInputElement>, WidgetDataImpl<HTMLInputElement>, DatePickedFSM> {
    private readonly handler;
    constructor();
    onNewNodeRegistered(node: EventTarget): void;
    onNodeUnregistered(node: EventTarget): void;
}
export {};
