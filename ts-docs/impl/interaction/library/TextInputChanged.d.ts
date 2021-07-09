import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import type { WidgetData } from "../../../api/interaction/WidgetData";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { WidgetDataImpl } from "../WidgetDataImpl";
declare class TextInputChangedFSM extends FSMImpl {
    private readonly _timeGap;
    private readonly timeGapSupplier;
    getTimeGap(): number;
    constructor(timeSet?: number);
    buildFSM(dataHandler: TextInputChangedHandler): void;
}
interface TextInputChangedHandler extends FSMDataHandler {
    initToChangedHandler(event: Event): void;
}
export declare class TextInputChanged extends InteractionBase<WidgetData<HTMLInputElement | HTMLTextAreaElement>, WidgetDataImpl<HTMLInputElement | HTMLTextAreaElement>, TextInputChangedFSM> {
    private readonly handler;
    constructor(timeGap?: number);
    onNewNodeRegistered(node: EventTarget): void;
    onNodeUnregistered(node: EventTarget): void;
}
export {};
