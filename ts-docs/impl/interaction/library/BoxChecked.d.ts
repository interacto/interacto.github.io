import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import type { WidgetData } from "../../../api/interaction/WidgetData";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { WidgetDataImpl } from "../WidgetDataImpl";
declare class BoxCheckedFSM extends FSMImpl {
    constructor();
    buildFSM(dataHandler: BoxCheckedHandler): void;
}
interface BoxCheckedHandler extends FSMDataHandler {
    initToCheckHandler(event: Event): void;
}
export declare class BoxChecked extends InteractionBase<WidgetData<HTMLInputElement>, WidgetDataImpl<HTMLInputElement>, BoxCheckedFSM> {
    private readonly handler;
    constructor();
    onNewNodeRegistered(node: EventTarget): void;
    onNodeUnregistered(node: EventTarget): void;
}
export {};
