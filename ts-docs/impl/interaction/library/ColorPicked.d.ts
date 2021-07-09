import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import type { WidgetData } from "../../../api/interaction/WidgetData";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { WidgetDataImpl } from "../WidgetDataImpl";
declare class ColorPickedFSM extends FSMImpl {
    constructor();
    buildFSM(dataHandler: ColorPickedHandler): void;
}
interface ColorPickedHandler extends FSMDataHandler {
    initToPickedHandler(event: Event): void;
}
export declare class ColorPicked extends InteractionBase<WidgetData<HTMLInputElement>, WidgetDataImpl<HTMLInputElement>, ColorPickedFSM> {
    private readonly handler;
    constructor();
    onNewNodeRegistered(node: EventTarget): void;
    onNodeUnregistered(node: EventTarget): void;
}
export {};
