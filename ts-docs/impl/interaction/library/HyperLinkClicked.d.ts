import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import type { WidgetData } from "../../../api/interaction/WidgetData";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { WidgetDataImpl } from "../WidgetDataImpl";
declare class HyperLinkClickedFSM extends FSMImpl {
    constructor();
    buildFSM(dataHandler: HyperLinkClickedFSMHandler): void;
}
interface HyperLinkClickedFSMHandler extends FSMDataHandler {
    initToClickedHandler(event: Event): void;
}
export declare class HyperLinkClicked extends InteractionBase<WidgetData<HTMLAnchorElement>, WidgetDataImpl<HTMLAnchorElement>, HyperLinkClickedFSM> {
    private readonly handler;
    constructor();
    onNewNodeRegistered(node: EventTarget): void;
    onNodeUnregistered(node: EventTarget): void;
}
export {};
