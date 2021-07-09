import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import type { WidgetData } from "../../../api/interaction/WidgetData";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { WidgetDataImpl } from "../WidgetDataImpl";
declare class ComboBoxSelectedFSM extends FSMImpl {
    constructor();
    buildFSM(dataHandler: ComboBoxSelectedHandler): void;
}
interface ComboBoxSelectedHandler extends FSMDataHandler {
    initToSelectedHandler(event: Event): void;
}
export declare class ComboBoxSelected extends InteractionBase<WidgetData<HTMLSelectElement>, WidgetDataImpl<HTMLSelectElement>, ComboBoxSelectedFSM> {
    private readonly handler;
    constructor();
    onNewNodeRegistered(node: EventTarget): void;
    onNodeUnregistered(node: EventTarget): void;
}
export {};
